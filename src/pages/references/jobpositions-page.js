import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddJobpositions from '../../components/Jobpositions/AddJobpositions';
import Jobpositions from '../../components/Jobpositions';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const JobpositionsPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page Jobpositions-wrapper">
      <ReferenceTitle titleText="Реестр должностей" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddJobpositions />
        </Col>
      </Row>
      <Col className="p-0">
        <Jobpositions value={value} />
      </Col>
    </Row>

  )
}

export default JobpositionsPage;