import React from 'react';
import { Grid } from '@material-ui/core';

import {
  Arrecadado,
  TotalContribuintes,
  InadiplentesProgress,
  Ufm,
  GraficPieInadimplencia,
  GraficBarAnual
} from './components';

import useStyles from './styles';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Arrecadado
            title="Arrecadado hoje"
            value={100}
            statistic={12}
            footer="Referente ao dia anterior"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalContribuintes
            title="Contribuintes"
            value={1246}
            statistic={9}
            footer="Inadimplentes"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <InadiplentesProgress title="Inadimplência" value={76.8} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Ufm title="UFM" value={2.8} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <GraficBarAnual />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <GraficPieInadimplencia />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
