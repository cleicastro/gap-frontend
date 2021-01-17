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
    collectToday: 0,
    collectYesterday: 0,
    contributors: 0,
    contributorsDebtors: 0,
    valueTotalEmited: 0,
    valueTotalArrecadado: 0,
    debtors: 0,
    ufm: 0,
    emitido: [],
    pago: [],
    collectDebtorsToIncome: {
      incomes: [],
      data: {},
      label: []
    }
  });

  useEffect(() => {
    async function requestDataDashboard() {
      const response = await DashboardService.getDashboardIndex();
      const {
        ufm,
        valorTotalEmitido,
        valorEmitidoHoje,
        valorEmitidoOntem,
        valorInadimplencia,
        countContribuinte,
        countContribuinteInadimplente,
        valueDAMInadimplenteReceita,
        valueDAMMonth,
        valueDAMPagoMonth
      } = response.data;

      setDataDasboard((value) => ({
        ...value,
        ufm,
        collectToday: valorEmitidoHoje,
        collectYesterday: valorEmitidoOntem,
        contributors: countContribuinte,
        valueTotalArrecadado: valorTotalEmitido,
        valueTotalEmited: valorTotalEmitido,
        debtors: valorInadimplencia,
        contributorsDebtors: countContribuinteInadimplente,
        emitido: valueDAMMonth,
        pago: valueDAMPagoMonth,
        collectDebtorsToIncome: {
          incomes: valueDAMInadimplenteReceita
        }
      }));
    }
    requestDataDashboard();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Arrecadado
            title="Arrecadado hoje"
            valueToday={dataDashboard.collectToday}
            valueYestarday={dataDashboard.collectYesterday}
            footer="Referente ao dia anterior"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalContribuintes
            title="Contribuintes"
            value={dataDashboard.contributors}
            statistic={dataDashboard.contributorsDebtors}
            footer="Inadimplentes"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <InadiplentesProgress
            title="Inadimplência"
            value={dataDashboard.debtors}
            statistic={dataDashboard.valueTotalEmited}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Ufm title="UFM" value={dataDashboard.ufm} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <GraficBarAnual
            emitido={dataDashboard.emitido}
            pago={dataDashboard.pago}
          />
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
