import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import api from '../api/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [countHits, setCountHits] = useState(0);
  const [totalHits, setTotalHits] = useState(500);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    api
      .fetchImagesWithQuery(searchQuery, page)
      .then(data => {
        if (data.total === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        const newHits = data.hits.map(hit => {
          let { id, tags, largeImageURL, webformatURL } = hit;
          return { id, tags, largeImageURL, webformatURL };
        });
        setImages(prev => [...prev, ...newHits]);
        setStatus('resolved');
        setTotalHits(data.totalHits);
        setCountHits(prev => prev + 12);
      })
      .catch(error => {
        Notiflix.Notify.warning(error.message);
        setStatus('idle');
      });
  }, [searchQuery, page]);

  useEffect(() => {
    if (totalHits === 0) {
      return;
    }
    if (countHits >= totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      setStatus('resolvedAll');
    }
  }, [countHits, totalHits]);

  const onSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setCountHits(0);
    setStatus('pending');
    setImages([]);
  };

  const onLoad = () => {
    setPage(prev => prev + 1);
    setStatus('pendingLoading');
  };

  if (status === 'idle') {
    return <Searchbar onSearch={onSearch} />;
  }
  if (status === 'pending') {
    return (
      <>
        <Searchbar onSearch={onSearch} />
        <Loader />
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSearch={onSearch} />
        <ImageGallery images={images} />
        <Button onClick={onLoad} />
      </>
    );
  }
  if (status === 'pendingLoading') {
    return (
      <>
        <Searchbar onSearch={onSearch} />
        <ImageGallery images={images} />
        <Loader />
      </>
    );
  }
  if (status === 'resolvedAll') {
    return (
      <>
        <Searchbar onSearch={onSearch} />
        <ImageGallery images={images} />
      </>
    );
  }
}
