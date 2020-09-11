import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import './style.css';

const SearchBar = ({ onSearchChange, values }) => (
  <Form.Control
    className="serch-bar"
    type="search"
    value={values}
    placeholder="Search ..."
    onChange={(evt) => onSearchChange(evt.target.value)} />
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;