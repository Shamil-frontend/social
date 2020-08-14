import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

const LoadingIndicator = () => (
  <div className="text-center">
    <Spinner animation="grow" variant="primary" role="status">
      <span className="sr-only">Загрузка...</span>
    </Spinner>
  </div>
);

export default LoadingIndicator;