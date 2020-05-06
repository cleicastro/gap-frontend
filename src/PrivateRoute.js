import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthencticated } from './auth';

const PrivateRoute = ({ layout: Layout, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthencticated() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
    }
  />
);

export default PrivateRoute;
