import React, { useState } from 'react';

import { Row, Tab, Col } from 'react-bootstrap';

import LoadingIndicator from '../components/generic/LoadingIndicator';
import ErrorIndicator from '../components/generic/ErrorIndicator';


import './style.css';
import Adresses from '../components/Adresses/Adresses';

const AdressesPage = () => {



  // if (loading) {
  //   return <LoadingIndicator />
  // }

  // if (error) {
  //   return <ErrorIndicator />;
  // }

  return (
    <>
      <Row className="m-0">
        <Col>
          <Adresses />
        </Col>
      </Row>
    </>
  )
}

export default AdressesPage;