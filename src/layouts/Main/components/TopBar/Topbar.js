import React, { memo, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Badge,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
  NotificationsOutlined as NotificarionIcon,
  Input as InputIcon,
  Menu as MenuIcon
} from '@material-ui/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

import { logout } from '../../../../store/loginRedux';

import useStyles from './styles';

function TopBar({
  logout: actionLogout,
  logoutMsg,
  error,
  className,
  onSidebarOpen,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();

  function logoutUser() {
    actionLogout();
  }

  useEffect(() => {
    if (logoutMsg) {
      localStorage.clear();
      alert(logoutMsg.message);
      history.push('/');
    }
  }, [history, logoutMsg]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Link to="/">
          {/* <img alt="Logo" src="/images/logos/logo--white.svg" /> */}
          <Typography color="secondary">GAP Ryatec</Typography>
        </Link>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificarionIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={logoutUser}>
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

const mapStateToProps = (state) => ({
  logoutMsg: state.auth.logout,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(memo(TopBar));
