import React from 'react';

import { Row, Col } from 'react-bootstrap';

import Addresses from '../../components/Addresses';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const AddressesPage = () => {

  return (
    <Row className="wrapper-page addresses-wrapper">
      <ReferenceTitle titleText="Адресса" />
      <Col className="p-0">
        <Addresses />
      </Col>
    </Row>

  )
}

export default AddressesPage;