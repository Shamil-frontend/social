import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const CustomSelect = ({ defaultValue, name, data, label, placeholder, isLoading, isDisabled, onChange, isMulti }) => {
  const [field, meta, helpers] = useField(name);

  let classNames = 'custom-select2';

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
        placeholder={placeholder}
        isClearable="true"
        isLoading={isLoading}
        isDisabled={isDisabled}
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
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CustomSelect;
