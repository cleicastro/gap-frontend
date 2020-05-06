import React, { memo } from 'react';
import { AppBar, Toolbar, Hidden, IconButton, Badge } from '@material-ui/core';
import clsx from 'clsx';
import {
  NotificationsOutlined as NotificarionIcon,
  Input as InputIcon,
  Menu as MenuIcon
} from '@material-ui/icons';

import { Link } from 'react-router-dom';
import useStyles from './styles';

function TopBar({ className, onSidebarOpen, ...rest }) {
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Link to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge badgeContent={5} color="secondary">
              <NotificarionIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default memo(TopBar);
