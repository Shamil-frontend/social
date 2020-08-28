import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const SubmitBtn = ({ isSubmitting, form, text, variant }) => (
  <Button type="submit" form={form} variant={variant} disabled={isSubmitting}>
    {isSubmitting ? (
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
    ) : (
        text
      )}
  </Button>
);

SubmitBtn.defaultProps = {
  form: null,
  text: 'Добавить',
  variant: 'primary',
};

SubmitBtn.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  form: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
};

export default SubmitBtn;
