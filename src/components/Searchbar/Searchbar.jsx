import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

import PropTypes from 'prop-types';
import {
  // Searchbar,
  SerchForm,
  Input,
  SearchBtn,
  SerchFormBtnLabel,
} from './Serchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Searchbar>
      <SerchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images ..."
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
        />
        <SearchBtn type="submit">
          <SerchFormBtnLabel>
            <Search />
          </SerchFormBtnLabel>
        </SearchBtn>
      </SerchForm>
    </Searchbar>
  );
};

// propTypes
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
