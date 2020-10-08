import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddEmployees from '../../components/Employees/AddEmployees';
import Employees from '../../components/Employees';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const EmployeesPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page employees-wrapper">
      <ReferenceTitle titleText="Реестр сотрудников" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddEmployees />
        </Col>
      </Row>
      <Col className="p-0">
        <Employees value={value} />
      </Col>
    </Row>

  )
}

export default EmployeesPage;