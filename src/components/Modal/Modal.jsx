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

//////////////////////////////////////
// export class Modal extends Component {
// componentDidMount() {
//   window.addEventListener('keydown', this.onKeyDown);
// }
// componentWillUnmount() {
//   window.removeEventListener('keydown', this.onKeyDown);
// }

// onKeyDown = e => {
//   if (e.code === 'Escape') {
//     this.props.onModalClick();
//   }
// };

// onBackDropClick = e => {
//   if (e.target === e.currentTarget) {
//     this.props.onModalClick();
//   }
// };

//   render() {
//     const { largeImage, alt } = this.props;

//     return (
//       <Overlay onClick={this.onBackDropClick}>
//         <ModalWindow>
//           <img src={largeImage} alt={alt} />
//         </ModalWindow>
//       </Overlay>
//     );
//   }
// }

// Modal.prototypes = {
//   alt: PropTypes.string.isRequired,
//   largeImage: PropTypes.string.isRequired,
//   onModalClick: PropTypes.func.isRequired,
// };
