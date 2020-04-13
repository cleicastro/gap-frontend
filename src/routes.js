import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './page/Login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={() => <h1>Hello World</h1>} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
