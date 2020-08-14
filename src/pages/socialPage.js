import React from 'react';
import { Row, Tab } from 'react-bootstrap';
import SocialGroupList from '../components/SocialGroupsList';
import LivingwagesDetails from '../components/LivingwagesDetails';
import useListData from '../components/wrappers/use-list-data';
import { fetchSocialGroups } from '../redux/SocialGroups/actions';
import { socialGroupsSelectors as selectors } from '../redux/selectors';
import LoadingIndicator from '../components/generic/Loadingindicator';
import ErrorIndicator from '../components/generic/Errorindicator';

const SocialPage = () => {

  const [socialGroups, loading, error] = useListData(fetchSocialGroups, selectors);
  const item = socialGroups[0];

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorIndicator />
  }

  return (
    <Row >
      <Tab.Container id="left-tabs-example" defaultActiveKey="socialgroup-1">
        <Row className="d-flex justify-content-center ">
          <SocialGroupList socialGroups={socialGroups} firstGroup={item} />
          <LivingwagesDetails />
        </Row>
      </Tab.Container>
    </Row>
  )
}

export default SocialPage;