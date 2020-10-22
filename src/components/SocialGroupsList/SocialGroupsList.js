import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Col, Nav, Row } from 'react-bootstrap';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';

import './style.css';
import { fetchSocialGroups } from '../../redux/SocialGroups/actions';

const SocialGroupsList = () => {

  const NAV_LINK = {
    'Трудоспособные': 'employable',
    'Дети': 'children',
    'Пенсионеры': 'pensioner',
  };

  const dispatch = useDispatch();
  const { socialGroups, loading, error } = useSelector(({ socialGroups }) => socialGroups);
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(fetchSocialGroups());
  }, [dispatch])

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <Row className="nav-block">
      <Col className="p-0">
        <Nav className="socialgroup-nav-list" variant="tabs" defaultActiveKey={url} justify>
          {socialGroups.map(({ id, name }) => (
            <Nav.Item key={id} className="socialgroup-nav-item">
              <Nav.Link as={NavLink} to={`${url}/${NAV_LINK[name]}`}>
                {name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>
    </Row>
  )
}

export default SocialGroupsList;