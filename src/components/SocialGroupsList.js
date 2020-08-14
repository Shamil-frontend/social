import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import ReactDom from 'react-dom';
import { Col, Nav } from 'react-bootstrap';

import { fetchLivingWages } from '../redux/LivingWages/actions';


const SocialGroupList = ({ socialGroups, firstGroup }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLivingWages(firstGroup.id));
  }, [dispatch, firstGroup.id])

  return (
    <Col className='p-0'>
      <Nav variant="pills" className="flex-column">
        {socialGroups.map(({ id, name }) => (
          <Nav.Item key={id}>
            <Nav.Link eventKey={`socialgroup-${id}`} onClick={() => dispatch(fetchLivingWages(id))}>{name}</Nav.Link>
          </Nav.Item>
        ))}
        <Nav.Item>
          <Link style={{ padding: "8px 16px", display: 'block' }} to='/'>На главную</Link>
        </Nav.Item>
      </Nav>
    </Col>
  )
}

export default SocialGroupList;