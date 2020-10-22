import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import './CustomSelect.scss';

const CustomSelect = ({ defaultValue, name, data, label, placeholder, isClearable, isLoading, isDisabled, onChange, isMulti }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta, helpers] = useField(name);

  let classNames = 'custom-select2';

  if (field.value) {
    classNames += ' has-value';
  }

  if (isFocused) {
    classNames += ' is-focused';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  return (
    <div className={classNames}>
      <Form.Label>{label}</Form.Label>
      <Select
        defaultValue={defaultValue}
        isMulti={isMulti}
        classNamePrefix="react-select"
        name={field.name}
        options={data}
        value={field.value}
        onChange={(val) => {
          if (onChange) {
            onChange(val);
          }
          return helpers.setValue(val);
        }}
        onBlur={(evt) => {
          setIsFocused(false);
          return field.onBlur(evt);
        }}
        placeholder={placeholder}
        isClearable={isClearable}
        isLoading={isLoading}
        isDisabled={isDisabled}
        menuPlacement="auto"
        openMenuOnFocus
      />


      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

CustomSelect.defaultProps = {
  defaultValue: [],
  isMulti: false,
  data: [],
  placeholder: 'Выберите из вариантов',
  isClearable: true,
  isLoading: false,
  isDisabled: false,
  onChange: undefined,
};

CustomSelect.propTypes = {
  defaultValue: PropTypes.array,
  isMulti: PropTypes.bool,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CustomSelect;
