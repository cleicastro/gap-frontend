import React, { useState, useEffect } from 'react';
import { Grid, Paper, CssBaseline, Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Lottie from 'react-lottie';
// import * as animationData from './lottie-job.json';

import Copyright from '../../components/Copyright';
import { logar, cleanMessgeUser } from '../../store/loginRedux';

import useStyles from './styles';
import SignIn from './SignIn';
import Forgot from './Forgot';

const SnakebarMensage = ({ open, children, type }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={4000}>
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {children}
      </MuiAlert>
    </Snackbar>
  );
};

const Login = ({
  logar: actionLogar,
  cleanMessgeUser: actionCleanDataUser,
  user,
  error
}) => {
  const classes = useStyles();

  const [showLogin, setShowLogin] = useState(true);
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [messageBackend, setMessageBackend] = useState('');

  const authentication = (e) => {
    setLoad(true);
    actionLogar(e);
  };

  useEffect(() => {
    if (error || user) actionCleanDataUser();
  }, [actionCleanDataUser, error, user]);

  useEffect(() => {
    if (error) {
      setMessageBackend(error);
    }
    if (user) {
      const dataUser = {
        id: user.id,
        nome: user.name,
        email: user.email,
        token: user.token,
        tipoUsuario: user.type
      };
      localStorage.setItem('app-token', JSON.stringify(dataUser));
      history.push('/');
    }
    setLoad(false);
  }, [history, user, error]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {showLogin && (
            <SignIn
              handleShowForgot={() => setShowLogin((show) => !show)}
              handleLogar={authentication}
              load={load}
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
      {/* <Grid item xs={false} sm={4} md={7} className="lottie">
        <Lottie options={defaultOptions} height={400} width={400} />
      </Grid> */}

      <SnakebarMensage type="error" open={messageBackend !== ''}>
        {messageBackend.message}
      </SnakebarMensage>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logar,
      cleanMessgeUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
