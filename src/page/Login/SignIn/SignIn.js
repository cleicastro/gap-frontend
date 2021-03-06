/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';

const SignIn = ({ handleShowForgot, handleLogar, load }) => {
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h2">
        Login
      </Typography>
      <Typography variant="body2">
        Por favor entre com seu login/email e senha abaixo.
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(handleLogar)}>
        <TextField
          inputRef={register}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="email"
          label="Email ou Usuário"
          autoFocus
          autoComplete="email"
        />
        <TextField
          inputRef={register}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.btnSubmit}
          color="primary">
          {load ? <CircularProgress color="secondary" /> : 'Entrar'}
        </Button>
        <Grid container>
          <Grid item xs>
            <a href="#" variant="body2" onClick={handleShowForgot}>
              Esqueceu sua senha?
            </a>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignIn;
