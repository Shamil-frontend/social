import React from 'react';

import { Row } from 'react-bootstrap';

import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';
import Standards from '../../components/Standards';

import '../style.css';

const StandardsPage = () => {

  return (
    <Row className="wrapper-page ssjku-wrapper">
      <ReferenceTitle titleText="Стандарты стоимости жилья" />
      <Standards />
    </Row>

  )
}

export default StandardsPage;