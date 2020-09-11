import React from 'react';
import { useDispatch } from 'react-redux';
// import ReactDom from 'react-dom';
import { Col, Nav, Row } from 'react-bootstrap';

// import useListData from '../wrappers/use-list-data';
// import { fetchSocialGroups } from '../../redux/SocialGroups/actions';
// import { socialGroupsSelectors as selectors } from '../../redux/selectors';
import { setId } from '../../redux/LivingWages/actions';

// import LoadingIndicator from '../generic/LoadingIndicator';
// import ErrorIndicator from '../generic/ErrorIndicator';

import './style.css';

const SocialGroupList = ({ socialGroups }) => {

  const dispatch = useDispatch();
  // const [socialGroups, loading, error] = useListData(fetchSocialGroups, selectors);

  // if (loading) {
  //   return <LoadingIndicator />
  // }

  // if (error) {
  //   return <ErrorIndicator />
  // }

  return (
    <Row className="nav-block p-0">
      <Col>
        <Nav variant="pills">
          {socialGroups.map(({ id, name }) => (
            <Nav.Item key={id}>
              <Nav.Link eventKey={`socialgroup-${id}`}
                onClick={() => dispatch(setId(id))}
                to={`socialPage/${id}`} >{name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>
    </Row>
  )
}

export default SocialGroupList;