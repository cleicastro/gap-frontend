import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {
  Dashboard as DashboardView,
  Login as LoginView,
  Dam as DamView,
  Nfsa as NfsaView,
  Contribuinte as ContribuinteView,
  PdfDam as PDFDAM,
  PdfNfsa as PDFNFSA,
  User as UserView,
  AlvaraFuncionamento as AlvaraFuncionamentoView
} from './page';
import { Main as MainLayout } from './layouts';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/login" component={LoginView} />
      <Route path="/pdf/dam" component={PDFDAM} />
      <Route path="/pdf/nfsa" component={PDFNFSA} />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute component={DamView} exact layout={MainLayout} path="/dam" />
      <PrivateRoute
        component={NfsaView}
        exact
        layout={MainLayout}
        path="/nfsa"
      />
      <PrivateRoute
        component={AlvaraFuncionamentoView}
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
