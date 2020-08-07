import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';

import IndexPage from '../pages/indexPage';
import SocialPage from '../pages/socialPage';

const App = () => {


    return (
        <Container>
            <Switch>
                <Route path="/" component={IndexPage} exact />
                <Route path='/socialPage/' component={SocialPage} exact />
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

