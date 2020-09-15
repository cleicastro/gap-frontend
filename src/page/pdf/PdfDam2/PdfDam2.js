import React, { useEffect, useState } from 'react';
import { PDFViewer, Page, Document, View, Text } from '@react-pdf/renderer';

import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';
import { styles, useStyles, Pago, DataPagamento } from './styles';

import SectionLeft from './SectionLeft';
import SectionRight from './SectionRight';
import { Dam } from '../../../services';

const PdfDam = () => {
  const classes = useStyles();

  const path = window.location.pathname.split('/');
  const id = Number(path[3]);
  const [dam, setDam] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const tokenDam = Axios.CancelToken.source();
    async function requestDAM() {
      try {
        const response = await Dam.getDamIndex(id, tokenDam.token);
        setDam(response.data);
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
    requestDAM();
    return () => {
      tokenDam.cancel('Request cancell');
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

  if (!dam) {
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

  const CodeBar = () => {
    return (
      <View style={styles.codeBar}>
        <Text>{`00000000000 0 00000000000 0 00000000000 0 000000000${dam.id} 0`}</Text>
      </View>
    );
  };

  return (
    <PDFViewer style={styles.container}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.campoDam}>
            {dam.status === 'Pago' && (
              <View style={styles.campoPago}>
                <Pago>PAGO</Pago>
                <DataPagamento>
                  {Intl.DateTimeFormat('pt-BR').format(
                    new Date(
                      dam.data_pagamento ? dam.data_pagamento : dam.emissao
                    )
                  )}
                </DataPagamento>
              </View>
            )}

            <SectionLeft
              contribuinte={dam.contribuinte}
              infoAdicionais={dam.info_adicionais}
            />
            <SectionRight damValue={dam} />
          </View>
          <CodeBar />

          <Text
            style={{
              borderBottom: 1,
              marginTop: 25,
              marginBottom: 25,
              borderStyle: 'dashed'
            }}
          />

          <View style={styles.campoDam}>
            <SectionLeft
              contribuinte={dam.contribuinte}
              infoAdicionais={dam.info_adicionais}
            />
            <SectionRight damValue={dam} />
          </View>

          <CodeBar />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfDam;
