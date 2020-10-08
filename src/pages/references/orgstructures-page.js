import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddOrgstructure from '../../components/Orgstructures/AddOrgstructure';
import Orgstructures from '../../components/Orgstructures';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const OrgstructuresPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page orgstructures-wrapper">
      <ReferenceTitle titleText="Реестр организационные структуры" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddOrgstructure />
        </Col>
      </Row>
      <Col className="p-0">
        <Orgstructures />
      </Col>
    </Row>

  )
}

export default OrgstructuresPage;