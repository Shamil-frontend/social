import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddRelDependence from '../../components/Relations/AddRelDependence';
import Relations from '../../components/Relations';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const RelationsPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page relations-wrapper">
      <ReferenceTitle titleText="Реестр отношения Физ.лиц" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddRelDependence />
        </Col>
      </Row>
      <Col className="p-0">
        <Relations value={value} />
      </Col>
    </Row>

  )
}

export default RelationsPage;