/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Grid, Avatar, Typography, TextField, Button } from '@material-ui/core';

import { LockOpenOutlined, ArrowBack } from '@material-ui/icons';

import useStyles from './styles';

const SignIn = ({ handleShowLogin }) => {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOpenOutlined />
      </Avatar>
      <Typography component="h1" variant="h2">
        Esqueceu a senha?
      </Typography>
      <Typography variant="body2">
        Informe seu e-mail ou login e enviaremos instruções para você criar sua
        senha.
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="email-forgot"
          label="Email / Usuário"
          autoFocus
          autoComplete="email"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.btnSubmit}
          color="primary"
        >
          Enviar
        </Button>
        <Grid container>
          <Grid item xs>
            <Button type="button" onClick={handleShowLogin} color="primary">
              <ArrowBack />
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignIn;
