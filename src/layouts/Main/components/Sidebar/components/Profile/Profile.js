import React from 'react';

import { Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useStyles from './styles';
import userPerfil from '../../../../../../assets/logo.png';

export default function Profile({ className, ...rest }) {
  const classes = useStyles();
  const getUsuer = JSON.parse(localStorage.getItem('app-token'));
  // const imagePerfil = '/images/avatars/avatar_1.png';
  const prepareUserName = getUsuer.nome.split(' ');
  const user = {
    name: `${prepareUserName.shift()} ${prepareUserName.pop()}`,
    avatar: userPerfil,
    bio: getUsuer.tipoUsuario
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        variant="rounded"
        alt="PMI"
        className={classes.avatar}
        component={Link}
        src={user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
}
