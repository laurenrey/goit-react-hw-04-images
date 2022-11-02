import PropTypes from 'prop-types';
import {
  ImageGalleryItemCard,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, tag, openModal, largeImageURL }) => {
  return (
    <ImageGalleryItemCard>
      <ImageGalleryItemImage
        src={url}
        alt={tag}
        onClick={() => openModal(largeImageURL, tag)}
      />
    </ImageGalleryItemCard>
  );
};

ImageGalleryItem.prototypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
