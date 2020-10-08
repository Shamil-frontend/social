import React from 'react';

import { Col } from 'react-bootstrap';

import './ReferenceTitle.scss';

const ReferenceTitle = ({ titleText }) => (
  <Col className="reference-title">
    <h3>{titleText}</h3>
  </Col>
)


export default ReferenceTitle;