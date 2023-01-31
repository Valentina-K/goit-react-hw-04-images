import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalShow, setIsModalShow] = useState(false);
  return (
    <li className="ImageGalleryItem">
      <div onClick={() => setIsModalShow(true)}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </div>
      {isModalShow && (
        <Modal onClose={() => setIsModalShow(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
