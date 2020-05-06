import React from 'react';

import { Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useStyles from './styles';

export default function Profile({ className, ...rest }) {
  const classes = useStyles();
  const getUsuer = JSON.parse(localStorage.getItem('app-token'));
  const user = {
    name: getUsuer.nome,
    avatar: '/images/avatars/avatar_1.png',
    bio: getUsuer.tipoUsuario
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
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
