import { Button, Grid } from '@material-ui/core';
import React from 'react';
import CloudDownload from '@material-ui/icons/CloudDownload';
// import Quadrimestre from './components/Quadrimestre';

import useStyles from './styles';

const linkPlanilha =
  'http://pmi.syspalma.com/MOVIMENTO%20FINANCEIRO%202020.xlsx';

const Relatorio = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={12} sm={12} xs={12} alignContent="center">
          <Button
            href={linkPlanilha}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<CloudDownload />}>
            Download
          </Button>
        </Grid>
        {/* <Grid item lg={6} sm={6} xs={12}>
          <Quadrimestre mesInicial={8} mesFinal={12} />
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Quadrimestre mesInicial={4} mesFinal={8} />
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Quadrimestre mesInicial={8} mesFinal={12} />
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Quadrimestre mesInicial={0} mesFinal={11} />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Relatorio;
