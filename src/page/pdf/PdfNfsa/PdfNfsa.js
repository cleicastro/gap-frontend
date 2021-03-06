import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/Print';
import { Grid, Typography, CircularProgress, Box } from '@material-ui/core';
import Axios from 'axios';
import { Nfsa } from '../../../services';
import { A4, useStyles, Text, TitleContribuinte, MarcaDAgua } from './styles';
import ContainerNFSA from './Section';

function PdfNfsa() {
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
    <div className={classes.root}>
      <Box displayPrint="none">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => window.print()}>
          <PhotoCamera />
        </IconButton>
      </Box>
      <A4>
        {nfsa.dam.status === 'Pago' && (
          <MarcaDAgua>
            <TitleContribuinte style={{ fontSize: 42 }}>Pago</TitleContribuinte>
            <Text>em: {nfsa.dam.data_pagamento}</Text>
          </MarcaDAgua>
        )}
        {nfsa.dam.status === 'Cancelado' && (
          <MarcaDAgua>
            <TitleContribuinte style={{ fontSize: 42 }}>
              Cancelado
            </TitleContribuinte>
          </MarcaDAgua>
        )}
        <ContainerNFSA nfsa={nfsa} />
      </A4>
    </div>
  );
}

export default PdfNfsa;
