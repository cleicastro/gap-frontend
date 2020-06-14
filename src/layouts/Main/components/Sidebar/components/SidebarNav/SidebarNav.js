import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Button,
  ListItemText,
  Collapse,
  ListItemIcon
} from '@material-ui/core';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <NavLink {...props} />
  </div>
));

function SidebarNav({ pages, className, ...rest }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page, key) => (
        <React.Fragment key={key}>
          <ListItem
            className={classes.item}
            disableGutters
            button
            onClick={page.subMenu && handleClick}>
            {!page.subMenu ? (
              <Button
                onClick={() => setOpen(false)}
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}>
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            ) : (
                <>
                  <Button className={classes.button}>
                    <div className={classes.icon}>{page.icon}</div>
                    {page.title}
                  </Button>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
          </ListItem>
          {page.subMenu &&
            page.subMenu.map((submenu, keySubMenu) => (
              <Collapse in={open} timeout="auto" unmountOnExit key={keySubMenu}>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    activeClassName={classes.active}
                    component={CustomRouterLink}
                    to={submenu.href}>
                    <ListItemIcon>
                      <div className={classes.icon}>{submenu.icon}</div>
                    </ListItemIcon>
                    <ListItemText primary={submenu.title} />
                  </ListItem>
                </List>
              </Collapse>
            ))}
        </React.Fragment>
      ))}
    </List>
  );
}

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
