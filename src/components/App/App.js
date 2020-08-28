import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import IndexPage from '../../pages/indexPage';
import SocialPage from '../../pages/socialPage';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  pauseOnHover: true,
});

const App = () => {
  return (
    <Container className="pt-5">
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path='/socialPage' component={SocialPage} exact />
        {/* <Route path='/socialGroups/:id?' exact
                    render={({ match, history }) => {
                        return <
                    }} /> */}
        <Route path='/404' exact
          render={() => {
            return (
              <Alert variant="alert alert-secondary" >
                <div sm={12} className='row justify-content-center' >
                  <h1>Такой страницы не существует</h1>
                </div>
              </Alert>
            )
          }} />
        <Redirect to={'/404'} />
      </Switch>
    </Container>
  )
}

export default App;

