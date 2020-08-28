import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import ReactDom from 'react-dom';
import { Col, Nav } from 'react-bootstrap';

// import useListData from '../wrappers/use-list-data';
// import { fetchSocialGroups } from '../../redux/SocialGroups/actions';
// import { socialGroupsSelectors as selectors } from '../../redux/selectors';
import { setId } from '../../redux/LivingWages/actions';

// import LoadingIndicator from '../generic/LoadingIndicator';
// import ErrorIndicator from '../generic/ErrorIndicator';

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
    <Col >
      <Nav variant="pills" className="flex-column">
        {socialGroups.map(({ id, name }) => (
          <Nav.Item key={id}>
            <Nav.Link eventKey={`socialgroup-${id}`} onClick={() => dispatch(setId(id))}>{name}</Nav.Link>
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