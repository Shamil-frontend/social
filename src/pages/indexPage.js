import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/App/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const SocialPage = lazy(() => import('./references/social-page'));
const AddressesPage = lazy(() => import('./references/addresses-page'));
const StandardsPage = lazy(() => import('./references/standards-page'));
const OrgstructuresPage = lazy(() => import('./references/orgstructures-page'));
const JobpositionsPage = lazy(() => import('./references/jobpositions-page'));
const RolesPage = lazy(() => import('./references/roles-page'));
const EmployeesPage = lazy(() => import('./references/employees-page'));
const RelationsPage = lazy(() => import('./references/relations-page'));
const BanksPage = lazy(() => import('./references/banks-page'));
const MaxcostsPage = lazy(() => import('./references/maxcosts-page'));
const CommunalPage = lazy(() => import('./references/communal-page'));

const NotFoundPage = lazy(() => import('./not-found-page'));

const IndexPage = () => (
  <AppLayout>
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home" exact>
          Главная страница
        </Route>
        <Route path="/newAppeal" exact>
          Новое обращение
        </Route>
        <Route path="/appeal" exact>
          Обращение
        </Route>
        <Route path="/individuals" exact>
          Физические лица
        </Route>

        <Route path="/references/social">
          <SocialPage />
        </Route>
        <Route path="/references/addresses" exact>
          <AddressesPage />
        </Route>
        <Route path="/references/standards" exact>
          <StandardsPage />
        </Route>
        <Route path="/references/orgstructures" exact>
          <OrgstructuresPage />
        </Route>
        <Route path="/references/jobpositions" exact>
          <JobpositionsPage />
        </Route>
        <Route path="/references/roles" exact>
          <RolesPage />
        </Route>
        <Route path="/references/employees" exact>
          <EmployeesPage />
        </Route>
        <Route path="/references/relations" exact>
          <RelationsPage />
        </Route>
        <Route path="/references/banks" exact>
          <BanksPage />
        </Route>
        <Route path="/references/maxcosts" exact>
          <MaxcostsPage />
        </Route>
        <Route path="/references/servicescommunal" exact>
          <CommunalPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  </AppLayout>
);



export default IndexPage;