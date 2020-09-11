import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import IndexPage from '../../pages/indexPage';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  pauseOnHover: true,
});

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

