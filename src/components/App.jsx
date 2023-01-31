import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import api from '../api/api';

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    countHits: 12,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, countHits } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        const { hits, totalHits } = await api.fetchImagesWithQuery(
          searchQuery,
          page
        );
        if (hits.length === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (countHits >= totalHits) {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({
            images: [...prevState.images, ...hits],
            status: 'resolvedAll',
          });
        } else {
          const newHits = hits.map(hit => {
            let { id, tags, largeImageURL, webformatURL } = hit;
            return { id, tags, largeImageURL, webformatURL };
          });
          this.setState(prevState => ({
            images: [...prevState.images, ...newHits],
            status: 'resolved',
          }));
        }
      } catch (error) {
        Notiflix.Notify.warning(error.message);
        this.setState({
          status: 'idle',
        });
      }
    }
  }

  onLoad = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      countHits: prevState.countHits + 12,
      status: 'pendingLoading',
    }));
  };
  onSearch = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      countHits: 12,
      status: 'pending',
      images: [],
    });
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return <Searchbar onSearch={this.onSearch} />;
    }
    if (status === 'pending') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <Loader />
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <ImageGallery images={images} />
          <Button onClick={this.onLoad} />
        </>
      );
    }
    if (status === 'pendingLoading') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <ImageGallery images={images} />
          <Loader />
        </>
      );
    }
    if (status === 'resolvedAll') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <ImageGallery images={images} />
        </>
      );
    }
  }
}
