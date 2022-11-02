import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load more
      </ButtonLoadMore>
    </>
  );
};

Button.prototypes = {
  onClick: PropTypes.func.isRequired,
};
