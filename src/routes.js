import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {
  Dashboard as DashboardView,
  Login as LoginView,
  Dam as DamView,
  Contribuinte as ContribuinteView,
  PrinterDAM as PDFDAM,
  User as UserView
} from './page';
import { Main as MainLayout } from './layouts';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/login" component={LoginView} />
      <Route path="/pdf/dam" component={PDFDAM} />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute component={DamView} exact layout={MainLayout} path="/dam" />
      <PrivateRoute
        component={() => <h1>NFSA</h1>}
        exact
        layout={MainLayout}
        path="/nfsa"
      />
      <PrivateRoute
        component={() => <h1>ALVARÁ</h1>}
        exact
        layout={MainLayout}
        path="/alvara"
      />
      <PrivateRoute
        component={ContribuinteView}
        exact
        layout={MainLayout}
        path="/cadastro/contribuinte"
      />
      <PrivateRoute
        component={UserView}
        exact
        layout={MainLayout}
        path="/cadastro/user"
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
