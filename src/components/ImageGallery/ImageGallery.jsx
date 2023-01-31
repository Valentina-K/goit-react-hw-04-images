import { PropTypes } from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import React, { Component } from 'react';

export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
      })
    ),
  };
  state = {
    isShow: false,
    largeImageURL: '',
    tags: '',
  };

  onClickImage = (largeImageURL, tags) => {
    this.setState({ isShow: true, largeImageURL, tags });
  };
  onClickOverlay = () => {
    this.setState({ isShow: false, largeImageURL: '' });
  };
  render() {
    const { isShow, largeImageURL, tags } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {this.props.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              onClick={() => this.onClickImage(image.largeImageURL, image.tags)}
            />
          ))}
        </ul>
        {isShow && (
          <Modal onClose={this.onClickOverlay}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
