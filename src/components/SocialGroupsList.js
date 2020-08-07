import React from 'react';
import { Col, Nav } from 'react-bootstrap';

import SocialGroupDetails from './SocialGroupDetails';
import useSocialGroupsData from './wrappers/use-list-data';
import { fetchSocialGroups } from '../redux/actions';
import { socialGroupsSelectors as selectors } from '../redux/selectors';

const SocialGroupList = () => {

  const eventKey = [
    "employable",
    "children",
    "pensioner"
  ];

  const [socialGroups, loading, error] = useSocialGroupsData(fetchSocialGroups, selectors);

  const loading = loading ? <Spinner /> : null;
  const error = (error && !loading) ? <ErrorIndicator /> : null;

  return (
    <Col sm={3} className='p-0'>
      <Nav variant="pills" className="flex-column">
        {loading}
        {error}
        <SocialGroupDetails eventKey={eventKey} socialGroups={socialGroups} />
      </Nav>
    </Col>
  )
}

export default SocialGroupList;