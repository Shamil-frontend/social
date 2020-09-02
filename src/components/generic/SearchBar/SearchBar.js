import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';


const SearchBar = ({ onSearchChange, values }) => (
  <Form.Control
    style={{ backgroundColor: "#faf4f4" }}
    type="search"
    value={values}
    placeholder="Search ..."
    onChange={(evt) => onSearchChange(evt.target.value)} />
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;