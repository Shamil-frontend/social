import React from 'react';

import { Row } from 'react-bootstrap';

import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';
import Social from '../../components/Social';

import '../style.css';

const SocialPage = () => {

  return (
    <>
      <Row className="wrapper-page social-wrapper">
        <ReferenceTitle titleText="Прожиточный минимум" />
        <Social />
      </Row>
    </>
  )
}

export default SocialPage;
