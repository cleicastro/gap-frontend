import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import {
  Arrecadado,
  TotalContribuintes,
  InadiplentesProgress,
  Ufm,
  GraficPieInadimplencia,
  GraficBarAnual
} from './components';

import { Dashboard as DashboardService } from '../../services';

import useStyles from './styles';

const Dashboard = () => {
  const classes = useStyles();
  const [dataDashboard, setDataDasboard] = useState({
    collectToday: 100,
    contributors: 1246,
    debtors: 233,
    ufm: 2.8,
    collectThisYear: [],
    collectDebtorsToIncome: {
      incomes: [],
      data: {},
      label: []
    }
  });

  useEffect(() => {
    async function requestDataDashboard() {
      const response = await DashboardService.getDashboardIndex();
      setDataDasboard(response.data);
    }
    requestDataDashboard();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Arrecadado
            title="Arrecadado hoje"
            value={dataDashboard.collectToday}
            statistic={12}
            footer="Referente ao dia anterior"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalContribuintes
            title="Contribuintes"
            value={dataDashboard.contributors}
            statistic={9}
            footer="Inadimplentes"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <InadiplentesProgress
            title="Inadimplência"
            value={dataDashboard.debtors}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Ufm title="UFM" value={dataDashboard.ufm} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <GraficBarAnual />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <GraficPieInadimplencia
            values={dataDashboard.collectDebtorsToIncome}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
