import React, { useState } from 'react';

import { Row, Tab, Col } from 'react-bootstrap';

import SearchBar from '../components/generic/SearchBar/SearchBar';
import AddLivingWages from '../components/AddLivingWages';
import SocialGroupList from '../components/SocialGroupsList/SocialGroupsList';
import LivingwagesDetails from '../components/LivingwagesDetails/LivingwagesDetails';
import LoadingIndicator from '../components/generic/LoadingIndicator';
import ErrorIndicator from '../components/generic/ErrorIndicator';

import useListData from '../components/wrappers/use-list-data';
import { fetchSocialGroups } from '../redux/SocialGroups/actions';
import { socialGroupsSelectors as selectors } from '../redux/selectors';

import './style.css';

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
      <Tab.Container id="left-tabs-example" defaultActiveKey="socialgroup-1">
        <Row className="m-0">
          <Col className="nav-wrapper">
            <SocialGroupList socialGroups={socialGroups} />
          </Col>
          <Col md="12" sm="12" lg="12" xl="12" className="p-0">
            <Row className="search-block">
              <Col>
                <SearchBar onSearchChange={(val) => setValues(val)} values={values} />
              </Col>
              <Col style={{ flexGrow: "0" }}>
                <AddLivingWages />
              </Col>
            </Row>
            <Col >
              <LivingwagesDetails
                setNewValues={(val) => setValues(val)}
                values={values} />
            </Col>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default SocialPage;


// const allLivingWagesTestData = [
//   {
//     "id": "0764b1cd-807a-46fa-9e7a-20ef84ad3a99",
//     "wageValue": 9425,
//     "dateStart": "2016-04-01T00:00:00",
//     "dateStop": "2016-11-30T00:00:00"
//   },
//   {
//     "id": "9f6c20f5-0661-4678-8e45-6b2f1e27bea4",
//     "wageValue": 9121,
//     "dateStart": "2018-01-01T00:00:00",
//     "dateStop": "2018-03-31T00:00:00"
//   },
//   {
//     "id": "1463a8de-f2da-403b-ace7-e97e12bd4713",
//     "wageValue": 9516,
//     "dateStart": "2018-04-01T00:00:00",
//     "dateStop": "2018-06-30T00:00:00"
//   },
//   {
//     "id": "751528bc-762d-472e-b95e-cecd2c99f7be",
//     "wageValue": 5545,
//     "dateStart": "2013-03-01T00:00:00",
//     "dateStop": "2013-08-31T00:00:00"
//   },
//   {
//     "id": "e2e5d910-5a4e-4940-ab8e-02d054ae6d07",
//     "wageValue": 9604,
//     "dateStart": "2019-03-01T00:00:00",
//     "dateStop": "2019-05-31T00:00:00"
//   },
//   {
//     "id": "eb81f8fe-30b8-4875-9cb7-20de2493028a",
//     "wageValue": 7069,
//     "dateStart": "2014-03-01T00:00:00",
//     "dateStop": "2014-07-31T00:00:00"
//   },
//   {
//     "id": "c2566ef0-5b73-4f60-b88c-37bbaa2dbcad",
//     "wageValue": 7262,
//     "dateStart": "2014-08-01T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "f1be01ea-6dfa-40ec-8402-d9f9a433419a",
//     "wageValue": 10199,
//     "dateStart": "2020-06-09T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "7c1d09ba-c3d0-430a-ba27-e6d7fab117fe",
//     "wageValue": 7549,
//     "dateStart": "2014-10-01T00:00:00",
//     "dateStop": "2014-12-31T00:00:00"
//   },
//   {
//     "id": "934c88ed-7f77-40ba-a231-3791aa1838bf",
//     "wageValue": 4659,
//     "dateStart": "2011-01-01T00:00:00",
//     "dateStop": "2011-07-31T00:00:00"
//   },
//   {
//     "id": "302c39ee-cafd-4e26-80fc-df96c0b73659",
//     "wageValue": 5248,
//     "dateStart": "2011-08-01T00:00:00",
//     "dateStop": "2011-10-31T00:00:00"
//   },
//   {
//     "id": "3c79cca4-c321-4ea9-8abc-9512b17bc4b6",
//     "wageValue": 5218,
//     "dateStart": "2011-11-01T00:00:00",
//     "dateStop": "2011-12-31T00:00:00"
//   },
//   {
//     "id": "e5d67daf-fde0-4ff9-aadd-d7782209fd29",
//     "wageValue": 9264,
//     "dateStart": "2016-01-01T00:00:00",
//     "dateStop": "2016-03-31T00:00:00"
//   },
//   {
//     "id": "ffdf73fb-d2ca-471a-96d4-da34ec0364e0",
//     "wageValue": 9368,
//     "dateStart": "2016-12-01T00:00:00",
//     "dateStop": "2017-08-31T00:00:00"
//   },
//   {
//     "id": "2d373ab7-d522-4425-99b2-68cc50ca0a41",
//     "wageValue": 9552,
//     "dateStart": "2018-10-01T00:00:00",
//     "dateStop": "2019-02-28T00:00:00"
//   },
//   {
//     "id": "7f2f8dc2-c655-43fb-9dd8-df181428d820",
//     "wageValue": 10363,
//     "dateStart": "2019-09-01T00:00:00",
//     "dateStop": "2019-12-31T00:00:00"
//   },
//   {
//     "id": "3f5dfb4f-0a18-42ec-91a0-533864794524",
//     "wageValue": 777,
//     "dateStart": "2020-08-13T00:00:00",
//     "dateStop": "2020-07-28T00:00:00"
//   },
//   {
//     "id": "dd6c70c3-92a0-4992-8eda-8dbdba3e0af8",
//     "wageValue": 333333,
//     "dateStart": "2020-07-29T00:00:00",
//     "dateStop": "2020-08-10T00:00:00"
//   }, {
//     "id": "0764b1cd-807a-46fa-9e7a-20ef84ad3a99",
//     "wageValue": 9425,
//     "dateStart": "2016-04-01T00:00:00",
//     "dateStop": "2016-11-30T00:00:00"
//   },
//   {
//     "id": "9f6c20f5-0661-4678-8e45-6b2f1e27bea4",
//     "wageValue": 9121,
//     "dateStart": "2018-01-01T00:00:00",
//     "dateStop": "2018-03-31T00:00:00"
//   },
//   {
//     "id": "1463a8de-f2da-403b-ace7-e97e12bd4713",
//     "wageValue": 9516,
//     "dateStart": "2018-04-01T00:00:00",
//     "dateStop": "2018-06-30T00:00:00"
//   },
//   {
//     "id": "751528bc-762d-472e-b95e-cecd2c99f7be",
//     "wageValue": 5545,
//     "dateStart": "2013-03-01T00:00:00",
//     "dateStop": "2013-08-31T00:00:00"
//   },
//   {
//     "id": "e2e5d910-5a4e-4940-ab8e-02d054ae6d07",
//     "wageValue": 9604,
//     "dateStart": "2019-03-01T00:00:00",
//     "dateStop": "2019-05-31T00:00:00"
//   },
//   {
//     "id": "eb81f8fe-30b8-4875-9cb7-20de2493028a",
//     "wageValue": 7069,
//     "dateStart": "2014-03-01T00:00:00",
//     "dateStop": "2014-07-31T00:00:00"
//   },
//   {
//     "id": "c2566ef0-5b73-4f60-b88c-37bbaa2dbcad",
//     "wageValue": 7262,
//     "dateStart": "2014-08-01T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "f1be01ea-6dfa-40ec-8402-d9f9a433419a",
//     "wageValue": 10199,
//     "dateStart": "2020-06-09T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "7c1d09ba-c3d0-430a-ba27-e6d7fab117fe",
//     "wageValue": 7549,
//     "dateStart": "2014-10-01T00:00:00",
//     "dateStop": "2014-12-31T00:00:00"
//   },
//   {
//     "id": "934c88ed-7f77-40ba-a231-3791aa1838bf",
//     "wageValue": 4659,
//     "dateStart": "2011-01-01T00:00:00",
//     "dateStop": "2011-07-31T00:00:00"
//   },
//   {
//     "id": "302c39ee-cafd-4e26-80fc-df96c0b73659",
//     "wageValue": 5248,
//     "dateStart": "2011-08-01T00:00:00",
//     "dateStop": "2011-10-31T00:00:00"
//   },
//   {
//     "id": "3c79cca4-c321-4ea9-8abc-9512b17bc4b6",
//     "wageValue": 5218,
//     "dateStart": "2011-11-01T00:00:00",
//     "dateStop": "2011-12-31T00:00:00"
//   },
//   {
//     "id": "e5d67daf-fde0-4ff9-aadd-d7782209fd29",
//     "wageValue": 9264,
//     "dateStart": "2016-01-01T00:00:00",
//     "dateStop": "2016-03-31T00:00:00"
//   },
//   {
//     "id": "ffdf73fb-d2ca-471a-96d4-da34ec0364e0",
//     "wageValue": 9368,
//     "dateStart": "2016-12-01T00:00:00",
//     "dateStop": "2017-08-31T00:00:00"
//   },
//   {
//     "id": "2d373ab7-d522-4425-99b2-68cc50ca0a41",
//     "wageValue": 9552,
//     "dateStart": "2018-10-01T00:00:00",
//     "dateStop": "2019-02-28T00:00:00"
//   },
//   {
//     "id": "7f2f8dc2-c655-43fb-9dd8-df181428d820",
//     "wageValue": 10363,
//     "dateStart": "2019-09-01T00:00:00",
//     "dateStop": "2019-12-31T00:00:00"
//   },
//   {
//     "id": "3f5dfb4f-0a18-42ec-91a0-533864794524",
//     "wageValue": 777,
//     "dateStart": "2020-08-13T00:00:00",
//     "dateStop": "2020-07-28T00:00:00"
//   },
//   {
//     "id": "dd6c70c3-92a0-4992-8eda-8dbdba3e0af8",
//     "wageValue": 333333,
//     "dateStart": "2020-07-29T00:00:00",
//     "dateStop": "2020-08-10T00:00:00"
//   }, {
//     "id": "0764b1cd-807a-46fa-9e7a-20ef84ad3a99",
//     "wageValue": 9425,
//     "dateStart": "2016-04-01T00:00:00",
//     "dateStop": "2016-11-30T00:00:00"
//   },
//   {
//     "id": "9f6c20f5-0661-4678-8e45-6b2f1e27bea4",
//     "wageValue": 9121,
//     "dateStart": "2018-01-01T00:00:00",
//     "dateStop": "2018-03-31T00:00:00"
//   },
//   {
//     "id": "1463a8de-f2da-403b-ace7-e97e12bd4713",
//     "wageValue": 9516,
//     "dateStart": "2018-04-01T00:00:00",
//     "dateStop": "2018-06-30T00:00:00"
//   },
//   {
//     "id": "751528bc-762d-472e-b95e-cecd2c99f7be",
//     "wageValue": 5545,
//     "dateStart": "2013-03-01T00:00:00",
//     "dateStop": "2013-08-31T00:00:00"
//   },
//   {
//     "id": "e2e5d910-5a4e-4940-ab8e-02d054ae6d07",
//     "wageValue": 9604,
//     "dateStart": "2019-03-01T00:00:00",
//     "dateStop": "2019-05-31T00:00:00"
//   },
//   {
//     "id": "eb81f8fe-30b8-4875-9cb7-20de2493028a",
//     "wageValue": 7069,
//     "dateStart": "2014-03-01T00:00:00",
//     "dateStop": "2014-07-31T00:00:00"
//   },
//   {
//     "id": "c2566ef0-5b73-4f60-b88c-37bbaa2dbcad",
//     "wageValue": 7262,
//     "dateStart": "2014-08-01T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "f1be01ea-6dfa-40ec-8402-d9f9a433419a",
//     "wageValue": 10199,
//     "dateStart": "2020-06-09T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "7c1d09ba-c3d0-430a-ba27-e6d7fab117fe",
//     "wageValue": 7549,
//     "dateStart": "2014-10-01T00:00:00",
//     "dateStop": "2014-12-31T00:00:00"
//   },
//   {
//     "id": "934c88ed-7f77-40ba-a231-3791aa1838bf",
//     "wageValue": 4659,
//     "dateStart": "2011-01-01T00:00:00",
//     "dateStop": "2011-07-31T00:00:00"
//   },
//   {
//     "id": "302c39ee-cafd-4e26-80fc-df96c0b73659",
//     "wageValue": 5248,
//     "dateStart": "2011-08-01T00:00:00",
//     "dateStop": "2011-10-31T00:00:00"
//   },
//   {
//     "id": "3c79cca4-c321-4ea9-8abc-9512b17bc4b6",
//     "wageValue": 5218,
//     "dateStart": "2011-11-01T00:00:00",
//     "dateStop": "2011-12-31T00:00:00"
//   },
//   {
//     "id": "e5d67daf-fde0-4ff9-aadd-d7782209fd29",
//     "wageValue": 9264,
//     "dateStart": "2016-01-01T00:00:00",
//     "dateStop": "2016-03-31T00:00:00"
//   },
//   {
//     "id": "ffdf73fb-d2ca-471a-96d4-da34ec0364e0",
//     "wageValue": 9368,
//     "dateStart": "2016-12-01T00:00:00",
//     "dateStop": "2017-08-31T00:00:00"
//   },
//   {
//     "id": "2d373ab7-d522-4425-99b2-68cc50ca0a41",
//     "wageValue": 9552,
//     "dateStart": "2018-10-01T00:00:00",
//     "dateStop": "2019-02-28T00:00:00"
//   },
//   {
//     "id": "7f2f8dc2-c655-43fb-9dd8-df181428d820",
//     "wageValue": 10363,
//     "dateStart": "2019-09-01T00:00:00",
//     "dateStop": "2019-12-31T00:00:00"
//   },
//   {
//     "id": "3f5dfb4f-0a18-42ec-91a0-533864794524",
//     "wageValue": 777,
//     "dateStart": "2020-08-13T00:00:00",
//     "dateStop": "2020-07-28T00:00:00"
//   },
//   {
//     "id": "dd6c70c3-92a0-4992-8eda-8dbdba3e0af8",
//     "wageValue": 333333,
//     "dateStart": "2020-07-29T00:00:00",
//     "dateStop": "2020-08-10T00:00:00"
//   }, {
//     "id": "0764b1cd-807a-46fa-9e7a-20ef84ad3a99",
//     "wageValue": 9425,
//     "dateStart": "2016-04-01T00:00:00",
//     "dateStop": "2016-11-30T00:00:00"
//   },
//   {
//     "id": "9f6c20f5-0661-4678-8e45-6b2f1e27bea4",
//     "wageValue": 9121,
//     "dateStart": "2018-01-01T00:00:00",
//     "dateStop": "2018-03-31T00:00:00"
//   },
//   {
//     "id": "1463a8de-f2da-403b-ace7-e97e12bd4713",
//     "wageValue": 9516,
//     "dateStart": "2018-04-01T00:00:00",
//     "dateStop": "2018-06-30T00:00:00"
//   },
//   {
//     "id": "751528bc-762d-472e-b95e-cecd2c99f7be",
//     "wageValue": 5545,
//     "dateStart": "2013-03-01T00:00:00",
//     "dateStop": "2013-08-31T00:00:00"
//   },
//   {
//     "id": "e2e5d910-5a4e-4940-ab8e-02d054ae6d07",
//     "wageValue": 9604,
//     "dateStart": "2019-03-01T00:00:00",
//     "dateStop": "2019-05-31T00:00:00"
//   },
//   {
//     "id": "eb81f8fe-30b8-4875-9cb7-20de2493028a",
//     "wageValue": 7069,
//     "dateStart": "2014-03-01T00:00:00",
//     "dateStop": "2014-07-31T00:00:00"
//   },
//   {
//     "id": "c2566ef0-5b73-4f60-b88c-37bbaa2dbcad",
//     "wageValue": 7262,
//     "dateStart": "2014-08-01T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "f1be01ea-6dfa-40ec-8402-d9f9a433419a",
//     "wageValue": 10199,
//     "dateStart": "2020-06-09T00:00:00",
//     "dateStop": "2014-09-30T00:00:00"
//   },
//   {
//     "id": "7c1d09ba-c3d0-430a-ba27-e6d7fab117fe",
//     "wageValue": 7549,
//     "dateStart": "2014-10-01T00:00:00",
//     "dateStop": "2014-12-31T00:00:00"
//   },
//   {
//     "id": "934c88ed-7f77-40ba-a231-3791aa1838bf",
//     "wageValue": 4659,
//     "dateStart": "2011-01-01T00:00:00",
//     "dateStop": "2011-07-31T00:00:00"
//   },
//   {
//     "id": "302c39ee-cafd-4e26-80fc-df96c0b73659",
//     "wageValue": 5248,
//     "dateStart": "2011-08-01T00:00:00",
//     "dateStop": "2011-10-31T00:00:00"
//   },
//   {
//     "id": "3c79cca4-c321-4ea9-8abc-9512b17bc4b6",
//     "wageValue": 5218,
//     "dateStart": "2011-11-01T00:00:00",
//     "dateStop": "2011-12-31T00:00:00"
//   },
//   {
//     "id": "e5d67daf-fde0-4ff9-aadd-d7782209fd29",
//     "wageValue": 9264,
//     "dateStart": "2016-01-01T00:00:00",
//     "dateStop": "2016-03-31T00:00:00"
//   },
//   {
//     "id": "ffdf73fb-d2ca-471a-96d4-da34ec0364e0",
//     "wageValue": 9368,
//     "dateStart": "2016-12-01T00:00:00",
//     "dateStop": "2017-08-31T00:00:00"
//   },
//   {
//     "id": "2d373ab7-d522-4425-99b2-68cc50ca0a41",
//     "wageValue": 9552,
//     "dateStart": "2018-10-01T00:00:00",
//     "dateStop": "2019-02-28T00:00:00"
//   },
//   {
//     "id": "7f2f8dc2-c655-43fb-9dd8-df181428d820",
//     "wageValue": 10363,
//     "dateStart": "2019-09-01T00:00:00",
//     "dateStop": "2019-12-31T00:00:00"
//   },
//   {
//     "id": "3f5dfb4f-0a18-42ec-91a0-533864794524",
//     "wageValue": 777,
//     "dateStart": "2020-08-13T00:00:00",
//     "dateStop": "2020-07-28T00:00:00"
//   },
//   {
//     "id": "dd6c70c3-92a0-4992-8eda-8dbdba3e0af8",
//     "wageValue": 333333,
//     "dateStart": "2020-07-29T00:00:00",
//     "dateStop": "2020-08-10T00:00:00"
//   }
// ];