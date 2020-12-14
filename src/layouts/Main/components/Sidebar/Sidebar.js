import React from 'react';
import clsx from 'clsx';

import {
  Dashboard as DashboardIcon,
  Apartment as ApartmentIcon,
  // Settings as SettingsIcon,
  InsertDriveFile as InsertDriveFileIcon,
  BarChartRounded as RelatorioIcon,
  PostAddOutlined as RegisterIcon,
  CardMembership as Alvara
} from '@material-ui/icons';

import { Drawer, Divider } from '@material-ui/core';
import useStyles from './styles';

import { SidebarNav, Profile } from './components';

export default function Sidebar({
  open,
  variant,
  onClose,
  className,
  ...rest
}) {
  const classes = useStyles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'NFSA',
      href: '/nfsa',
      icon: <InsertDriveFileIcon />
    },
    {
      title: 'Alvará de funcionamento',
      href: '/alvara',
      icon: <Alvara />
    },
    {
      title: 'DAM',
      href: '/dam',
      icon: <ApartmentIcon />
    },
    {
      title: 'Cadastros',
      href: '/cadastro',
      icon: <RegisterIcon />,
      subMenu: [
        {
          title: 'Contribuinte',
          href: '/cadastro/contribuinte',
          icon: <RegisterIcon />
        },
        {
          title: 'Usuários',
          href: '/cadastro/user',
          icon: <RegisterIcon />
        }
      ]
    },
    {
      title: 'Relatórios',
      href: '/relatorio',
      icon: <RelatorioIcon />
    }
    // {
    //   title: 'Configurações',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
}
