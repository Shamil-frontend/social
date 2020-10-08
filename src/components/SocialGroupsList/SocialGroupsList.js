import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Nav, Row } from 'react-bootstrap';
import { setId } from '../../redux/LivingWages/actions';

import './style.css';

const SocialGroupsList = ({ socialGroups }) => {

  const dispatch = useDispatch();


  return (
    <Row className="nav-block">
      <Col className="p-0">
        <Nav className="socialgroup-nav-list" variant="pills">
          {socialGroups.map(({ id, name }) => (
            <Nav.Item key={id} className="socialgroup-nav-item">
              <Nav.Link eventKey={`socialgroup-${id}`}
                onClick={() => dispatch(setId(id))}
                to={`socialPage/${name}`} >{name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>
    </Row>
  )
}

export default SocialGroupsList;