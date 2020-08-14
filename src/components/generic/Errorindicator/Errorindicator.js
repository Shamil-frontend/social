/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

const ErrorIndicator = ({ error }) => {
  if (error.response) {
    const { data, status, statusText } = error.response;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('error.message', error.response);

    const errorText = data && typeof data === 'string' ? data : `Ошибка ${status}. ${statusText}`;

    return <Alert variant="danger">{errorText}</Alert>;
  }

  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('error.request', error.request);
  }
  // Something happened in setting up the request that triggered an Error
  console.error('error.config', error.config);

  return <Alert variant="danger">{error.message}</Alert>;
};

ErrorIndicator.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorIndicator;
