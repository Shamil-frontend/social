import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css'

import inputMasksMap from '../../../utils/inputMasksMap';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = ({ name, label, isDisabled }) => {
  const [isFocused, setIsFocused] = useState(false);

  const [field, meta, helpers] = useField(name);

  let classNames = 'custom-field';

  if (field.value) {
    classNames += ' has-value';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  if (isFocused) {
    classNames += ' is-focused';
  }

  return (
    <div className={classNames}>
      <Form.Label className="mr-2">{label}</Form.Label>
      <ReactDatePicker
        id={field.name}
        name={meta.name}
        selected={field.value}
        onChange={(val) => helpers.setValue(val)}
        onFocus={() => setIsFocused(true)}
        onBlur={(evt) => {
          setIsFocused(false);
          return field.onBlur(evt);
        }}
        dateFormat="dd.MM.yyyy"
        disabled={isDisabled}
        autoComplete="off"
        customInput={<MaskedInput className="form-control" mask={inputMasksMap.date} />}
      />


      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  isDisabled: false,
};

export default DatePicker;
