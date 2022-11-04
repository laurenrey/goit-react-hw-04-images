import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormBbutton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled.js';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please enter a value to search!');
      return;
    }
    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBbutton type="submit">
          <BiSearchAlt style={{ width: 25, height: 25 }} />
        </SearchFormBbutton>

        <SearchFormButtonLabel>
          <SearchFormInput
            onChange={handleChange}
            value={searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchFormButtonLabel>
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
