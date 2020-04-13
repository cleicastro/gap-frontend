import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthencticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthencticated() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
    }
  />
);

export default PrivateRoute;
