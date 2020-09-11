import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const SocialPage = lazy(() => import('./social-page'));
const AdressesPage = lazy(() => import('./adresses-page'));
const NotFoundPage = lazy(() => import('./not-found-page'));

const IndexPage = () => (
  <AppLayout>
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home" exact>
          Главная страница
        </Route>
        <Route path="/references/socialPage" exact>
          <SocialPage />
        </Route>
        <Route path="/references/adressesPage" exact>
          <AdressesPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  </AppLayout>
);



export default IndexPage;