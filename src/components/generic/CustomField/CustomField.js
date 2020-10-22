import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import MaskedInput from 'react-text-mask';

import inputMasksMap from '../../../utils/inputMasksMap';

import './CustomField.scss';

const CustomField = ({ name, label, type, as, mask, isDisabled, onFocusOut }) => {
  const [field, meta] = useField(name);

  let classNames = 'custom-field';

  if (field.value || field.value === 0) {
    classNames += ' has-value';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  return (
    <div className={classNames}>
      {mask ? (
        <MaskedInput
          type={type}
          className="form-control"
          id={name}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={(evt) => {
            if (onFocusOut) {
              onFocusOut();
            }
            return field.onBlur(evt);
          }}
          mask={inputMasksMap[mask]}
          disabled={isDisabled}
          autoComplete="off"
          guide={false}
        />
      ) : (
          <Form.Control
            type={type}
            as={as}
            id={field.id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={(evt) => {
              if (onFocusOut) {
                onFocusOut();
              }
              return field.onBlur(evt);
            }}
            isInvalid={meta.touched && meta.error}
            disabled={isDisabled}
            autoComplete="off"
          />
        )}
      <Form.Label>{label}</Form.Label>
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

CustomField.defaultProps = {
  type: 'text',
  as: undefined,
  isDisabled: false,
  mask: undefined,
  onFocusOut: undefined,
};

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  as: PropTypes.string,
  isDisabled: PropTypes.bool,
  mask: PropTypes.string,
  onFocusOut: PropTypes.func,
};

export default CustomField;
