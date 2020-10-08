import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddRoles from '../../components/Roles/AddRoles';
import Roles from '../../components/Roles';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const RolesPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page roles-wrapper">
      <ReferenceTitle titleText="Реестр ролей" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddRoles />
        </Col>
      </Row>
      <Col className="p-0">
        <Roles value={value} />
      </Col>
    </Row>

  )
}

export default RolesPage;