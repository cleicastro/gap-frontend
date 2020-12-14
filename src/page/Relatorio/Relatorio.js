import { Button, Grid } from '@material-ui/core';
import React from 'react';
import CloudDownload from '@material-ui/icons/CloudDownload';
// import Quadrimestre from './components/Quadrimestre';

import useStyles from './styles';

const linkPlanilha =
  'https://doc-10-4o-docs.googleusercontent.com/docs/securesc/6oaddgob2nrl1rrmvpjnugr4ms7sftsr/4unu9vsddvop7evtsaaqi8sq0ssge5q4/1607918925000/14149179735440945414/14149179735440945414/1CluGxE_htqmuaO_B6sjFv3KTZ1pR-rYL?e=download&authuser=0&nonce=970uh8doks98m&user=14149179735440945414&hash=v9uklls8hs9vb65se6idrdup8v9hu244';

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
