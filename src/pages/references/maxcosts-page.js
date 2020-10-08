import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddMaxcosts from '../../components/Maxcosts/AddMaxcosts';
import Maxcosts from '../../components/Maxcosts';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const MaxcostsPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page maxcosts-wrapper">
      <ReferenceTitle titleText="Реестр максимальных долей расходов" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddMaxcosts />
        </Col>
      </Row>
      <Col className="p-0">
        <Maxcosts value={value} />
      </Col>
    </Row>

  )
}

export default MaxcostsPage;