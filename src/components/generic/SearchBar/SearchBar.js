import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './SearchBar.scss';

const SearchBar = ({ onSearchChange, value }) => {

  return (
    <FormGroup className="serchBar-wrapper" >
      <span className={`icon-serchBar ${value ? "acitveClass-icon" : null}`}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <Form.Control
        className={`serch-bar ${value ? "acitveClass-serch" : null}`}
        type="search"
        value={value}
        placeholder="Search ..."
        onChange={(evt) => onSearchChange(evt.target.value)} />
    </FormGroup>
  )
}

SearchBar.defaultProps = {
  value: ''
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;