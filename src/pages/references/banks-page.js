import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import SearchBar from '../../components/generic/SearchBar';
import AddBanks from '../../components/Banks/AddBanks';
import Banks from '../../components/Banks';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';

import '../style.css';

const BanksPage = () => {

  const [value, setValue] = useState('');

  return (
    <Row className="wrapper-page banks-wrapper">
      <ReferenceTitle titleText="Реестр банков" />
      <Row className="nav-wrapper">
        <Col className="p-0 ">
          <SearchBar onSearchChange={(value) => setValue(value)} value={value} />
        </Col>
        <Col className="pr-0" style={{ flexGrow: "0" }}>
          <AddBanks />
        </Col>
      </Row>
      <Col className="p-0">
        <Banks value={value} />
      </Col>
    </Row>

  )
}

export default BanksPage;