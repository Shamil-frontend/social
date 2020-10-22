import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

import inputMasksMap from '../../../utils/inputMasksMap';

import './DatePicker.scss';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = ({ name, label, minDate, isDisabled }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [field, meta, helpers] = useField(name);

  let classNames = 'custom-date-picker';

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
        minDate={minDate}
        disabled={isDisabled}
        autoComplete="off"
        customInput={<MaskedInput className="form-control" mask={inputMasksMap.date} />}
      />

      <Form.Label>{label}</Form.Label>
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

DatePicker.defaultProps = {
  isDisabled: false,
  minDate: null,
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
};

export default DatePicker;
