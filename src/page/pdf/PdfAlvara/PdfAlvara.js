/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { PDFViewer, Page, Document } from '@react-pdf/renderer';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';

import { AlvaraFuncionamento } from '../../../services';
import { styles, useStyles } from './styles';
import { Section } from './components';

const PdfAlvara = () => {
  const classes = useStyles();
  const path = window.location.pathname.split('/');
  const id = Number(path[3]);
  const [alvara, setAlvara] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const tokenNFSA = Axios.CancelToken.source();
    async function requestAlvara() {
      try {
        const response = await AlvaraFuncionamento.getAlvaraAlvaraIndex(
          id,
          tokenNFSA.token
        );
        setAlvara(response.data.data);
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
    requestAlvara();
    return () => {
      tokenNFSA.cancel('Request cancell');
    };
  }, [id]);

  if (load) {
    return (
      <Grid container className={classes.root}>
        <Grid item>
          <CircularProgress color="primary" />
        </Grid>
      </Grid>
    );
  }

  if (!alvara && !load) {
    return (
      <Grid
        container
        spacing={2}
        justify="flex-start"
        alignItems="flex-start"
        className={classes.root}>
        <Grid item>
          <Typography>
            FALHA AO CARREGAR OS DADOS, TENTE NOVAMENTE MAIS TARDE!
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <PDFViewer style={styles.container}>
      <Document>
        <Page size="A4" style={classes.page}>
          <Section alvara={alvara} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfAlvara;
