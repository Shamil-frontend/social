import React from 'react';
import { Row, Col, Nav, Table, Tab } from 'react-bootstrap';
import SocialGroupList from '../components/socialGroupsList';
import LivingwagesList from '../components/LivingwagesList';

const SocialPage = () => {

  return (
    <Row >
      <Tab.Container id="left-tabs-example" defaultActiveKey="employable">
        <Row className="d-flex justify-content-center ">
          <SocialGroupList />
          <LivingwagesList />
        </Row>
      </Tab.Container>
    </Row>
  )
}

export default SocialPage;