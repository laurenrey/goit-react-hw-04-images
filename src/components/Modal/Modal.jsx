import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export function Modal({ onModalClick, alt, largeImage }) {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClick();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onModalClick]);

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return (
    <Overlay onClick={onBackDropClick}>
      <ModalWindow>
        <img src={largeImage} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.prototypes = {
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};
