import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Snackbar,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { UserContext } from '../../../contexts';

import usetyles from './styles';

const SnakebarMensage = ({ open, children, type }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}>
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {children}
      </MuiAlert>
    </Snackbar>
  );
};

const FormNewUser = () => {
  const { handleCreateUser, load, messageBackend } = useContext(UserContext);
  const { handleSubmit, register, control, reset } = useForm();

  const classes = usetyles();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (load && !!messageBackend.errors) {
      reset();
    }
  }, [load, messageBackend.errors, reset]);

  const handleClickShowPassword = () => {
    setShowPassword((values) => !values);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={handleSubmit(handleCreateUser)}>
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        name="name"
        label="Nome"
        autoFocus
        autoComplete="email"
        type="text"
      />
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        name="email"
        label="E-mail"
        autoFocus
        autoComplete="email"
        type="email"
      />

      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel id="type-user-select-label">Perfil</InputLabel>
        <Controller
          labelId="type-user-select-label"
          label="Perfil"
          id="type-user-select"
          inputRef={register}
          control={control}
          defaultValue="admin"
          name="type"
          as={
            <Select>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="root">Root</MenuItem>
            </Select>
          }
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          inputRef={register}
          name="password"
          label="Senha"
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        name="passwordConfirmation"
        label="Confirmar senha"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.btnSubmit}
        color="primary">
        {load ? <CircularProgress color="secondary" size={32} /> : 'Salvar'}
      </Button>

      <SnakebarMensage
        type={messageBackend.errors ? 'warning' : 'success'}
        open={messageBackend !== ''}>
        {messageBackend.message}
        {messageBackend.errors && (
          <List component="nav" aria-label="Errors">
            {messageBackend.errors.password && (
              <ListItem>
                {messageBackend.errors.password.map((error) => (
                  <ListItemText primary={error} key={error} />
                ))}
              </ListItem>
            )}
            {messageBackend.errors.email && (
              <ListItem>
                {messageBackend.errors.email.map((error) => (
                  <ListItemText primary={error} key={error} />
                ))}
              </ListItem>
            )}
          </List>
        )}
      </SnakebarMensage>
    </form>
  );
};

export default FormNewUser;
