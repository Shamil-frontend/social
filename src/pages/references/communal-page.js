import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
// import AddCommunal from '../../components/Communal/AddCommunal';
// import Communal from '../../components/Communal';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const CommunalPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page communal-wrapper">
      <ReferenceTitle titleText="Реестр коммунальных услуг" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          {/* <AddCommunal /> */}
        </Col>
      </Row>
      <Col className="p-0">
        {/* <Communal value={value} /> */}
      </Col>
    </Row>

  )
}

export default CommunalPage;