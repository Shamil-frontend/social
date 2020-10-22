import React, { useState } from 'react';

import { Row, Tab, Col } from 'react-bootstrap';

import AddLivingWages from '../../components/LivingwagesDetails/AddLivingWages';
import SocialGroupsList from '../../components/SocialGroupsList';
import LivingwagesDetails from '../../components/LivingwagesDetails/LivingwagesDetails';
import ReferenceTitle from '../../components/generic/ReferenceTitle/ReferenceTitle';
import LoadingIndicator from '../../components/generic/LoadingIndicator';
import ErrorIndicator from '../../components/generic/ErrorIndicator';

import useListData from '../../components/wrappers/use-list-data';
import { fetchSocialGroups } from '../../redux/SocialGroups/actions';
import { socialGroupsSelectors as selectors } from '../../redux/selectors';

import '../style.css';

const SocialPage = () => {

  const [socialGroups, loading, error] = useListData(fetchSocialGroups, selectors);
  const [values, setValues] = useState("");

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <div className="wrapper-page social-wrapper">
        <Tab.Container id="left-tabs-example" defaultActiveKey="socialgroup-1">
          <Row className="m-0 h-100 flex-column flex-nowrap">
            <ReferenceTitle titleText="Прожиточный минимум" />
            <Row className="nav-wrapper">
              <Col className="p-0 ">
                <SocialGroupsList socialGroups={socialGroups} />
              </Col>
              <Col className="pr-0 pt-1" style={{ flexGrow: "0" }}>
                <AddLivingWages />
              </Col>
            </Row>
            <Col className="p-0 ">
              <LivingwagesDetails
                setNewValues={(val) => setValues(val)}
                values={values} />
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  )
}

export default SocialPage;
