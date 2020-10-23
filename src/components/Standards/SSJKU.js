import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useRouteMatch, NavLink } from 'react-router-dom';
import { Col, Nav } from 'react-bootstrap';

import AddStandards from './AddStandards/AddStandards';
import StandardsDetails from './StandardsDetails';
// import SearchBar from '../generic/SearchBar';
// import LoadingIndicator from '../generic/LoadingIndicator';
// import ErrorIndicator from '../generic/ErrorIndicator';

import './Standards.scss';

const SSJKU = ({ addressName, houseTypeStandardValues, housetypesList, defaultCriteria, cities }) => {

  const houseTypes = {
    'Многоквартирный': 'multifamily',
    'Индивидуальный, без газа': 'individual-1',
    'Индивидуальный, оплата газа по норме': 'individual-2',
    'Индивидуальный, оплата газа по счетчику': 'individual-3',
  };

  // const [searchValue, setSearchValue] = useState('');
  const [dataId, setDataId] = useState(0);
  // const [dataStandart, setDataStandart] = useState([]);

  const { path, url } = useRouteMatch();
  // const { addressName, houseTypeStandardValues } = standardsList;

  const data = houseTypeStandardValues && [houseTypeStandardValues[dataId]];



  // useEffect(() => {
  //   setDataStandart(houseTypeStandardValues)
  // }, [addressName, houseTypeStandardValues, housetypesList])
  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  // if (error) {
  //   return <ErrorIndicator />;
  // }

  return (
    <>
      <div className="standard-container">
        <div className="standard-nav">

          <div className="table-top-block" >
            <h2 style={{ textAlign: 'left', fontSize: '18px', marginBottom: '0', lineHeight: "34px" }}>{addressName}</h2>
            <Col>
              <AddStandards defaultCriteria={defaultCriteria} housetypesList={housetypesList} cities={cities.data} />
            </Col>
          </div>
          <Nav className="standard-nav-list" variant="tabs" defaultActiveKey={url} justify>
            {housetypesList.map(({ id, typeName }, idx) => (
              <Nav.Item key={id} className="socialgroup-nav-item">
                <Nav.Link
                  as={NavLink}
                  activeClassName="active-tabs"
                  to={`${url}/${houseTypes[typeName]}`}
                  onClick={() => setDataId(idx)} >
                  {typeName}

                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <Switch>
          <Redirect from={`${url}`} to={`${url}/multifamily`} exact />
          <Route path={`${path}/multifamily`} exact>
            <StandardsDetails
              defaultCriteria={defaultCriteria}
              data={data}
            // searchValue={searchValue}
            />
          </Route>
          <Route path={`${path}/individual-1`} exact>
            <StandardsDetails
              defaultCriteria={defaultCriteria}
              data={data}
            // searchValue={searchValue}
            />
          </Route>
          <Route path={`${path}/individual-2`} exact>
            <StandardsDetails
              defaultCriteria={defaultCriteria}
              data={data}
            // searchValue={searchValue}
            />
          </Route>
          <Route path={`${path}/individual-3`} exact>
            <StandardsDetails
              defaultCriteria={defaultCriteria}
              data={data}
            // searchValue={searchValue}
            />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default SSJKU;
