/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { PDFViewer, Page, Document } from '@react-pdf/renderer';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';

import { Nfsa } from '../../services';
import { styles, useStyles } from './styles';
import { Section } from './components';

const PrinterNFSA = () => {
  const classes = useStyles();
  const path = window.location.pathname.split('/');
  const id = Number(path[3]);
  const [nfsa, setNfsa] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const tokenNFSA = Axios.CancelToken.source();
    async function requestNFSA() {
      try {
        const response = await Nfsa.getNFSAIndex(id, tokenNFSA.token);
        setNfsa(response.data);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        console.log(error);
      }
    }
    requestNFSA();
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

  if (!nfsa && !load) {
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
          <Section nfsa={nfsa} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PrinterNFSA;
