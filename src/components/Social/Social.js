import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useRouteMatch, NavLink } from 'react-router-dom';
import { Col, Nav } from 'react-bootstrap';

import AddLivingWages from '../../components/LivingwagesDetails/AddLivingWages';
// import SocialGroupsList from '../SocialGroupsList';
import LivingwagesDetails from '../../components/LivingwagesDetails';
import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';

import './Social.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialGroups } from '../../redux/SocialGroups/actions';

const Social = () => {

  const NAV_LINK = {
    'Трудоспособные': 'employable',
    'Дети': 'children',
    'Пенсионеры': 'pensioner',
  };

  const [values, setValues] = useState("");
  const dispatch = useDispatch();
  const { socialGroups, loading, error } = useSelector(({ socialGroups }) => socialGroups);
  const { path, url } = useRouteMatch();

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
    <>
      <div className="social-container">
        <div className="social-nav">
          <Nav className="socialgroup-nav-list" variant="tabs" defaultActiveKey={url} justify>
            {socialGroups.map(({ id, name }) => (
              <Nav.Item key={id} className="socialgroup-nav-item">
                <Nav.Link as={NavLink} activeClassName="active-tabs" to={`${url}/${NAV_LINK[name]}`}>
                  {name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Col className="pt-1 pr-0" style={{ flexGrow: "0" }}>
            <AddLivingWages />
          </Col>

        </div>


        <Switch>
          <Redirect from={`${url}/`} to={`${url}/employable`} exact />
          <Route path={`${path}/employable`} exact>
            <LivingwagesDetails id={1} setNewValues={(val) => setValues(val)} values={values} />
          </Route>
          <Route path={`${path}/children`} exact>
            <LivingwagesDetails id={2} setNewValues={(val) => setValues(val)} values={values} />
          </Route>
          <Route path={`${path}/pensioner`} exact>
            <LivingwagesDetails id={3} setNewValues={(val) => setValues(val)} values={values} />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Social;
