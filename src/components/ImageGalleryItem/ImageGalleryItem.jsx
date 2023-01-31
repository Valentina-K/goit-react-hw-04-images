import { PropTypes } from 'prop-types';
const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <div onClick={onClick}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
