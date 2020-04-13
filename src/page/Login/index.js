import React, { useState } from 'react';
import { Grid, Paper, CssBaseline, Box } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Copyright from '../../components/Copyright';

import useStyles from './styles';
import SignIn from './SignIn';
import Forgot from './Forgot';

const Login = () => {
  const classes = useStyles();

  const [showLogin, setShowLogin] = useState(true);
  const history = useHistory();

  const logar = (e) => {
    e.preventDefault();
    const token = {
      nome: 'Clei Castro',
      email: 'cleicastro.ti@hotmail.com',
      token: 'fjakjffdslkjfakdfajskjrjewrew0rreiw90328328432328423wje',
      tipoUsuario: 'ADMIN',
    };
    localStorage.setItem('app-token', JSON.stringify(token));
    history.push('/');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {showLogin && (
            <SignIn
              handleShowForgot={() => setShowLogin((show) => !show)}
              handleLogar={logar}
            />
          )}

          {!showLogin && (
            <Forgot handleShowLogin={() => setShowLogin((show) => !show)} />
          )}
        </div>
        <Box className={classes.copyright}>
          <Copyright />
        </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
};

export default Login;
