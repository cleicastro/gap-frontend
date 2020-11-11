import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Typography, Box } from '@material-ui/core';
import Axios from 'axios';
import extenso from 'extenso';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/Print';

import { Nfsa } from '../../../services';

import {
  Container,
  A4,
  ContainerHeader,
  SubTitle,
  Title,
  LineHorizontal,
  ContainerFooter,
  ContainerBody,
  useStyles
} from './styles';

function PdfRecibo() {
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
    <Container>
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
        <ContainerHeader>
          <img
            src="/images/logos/logo.png"
            width="170"
            height="100"
            border="0"
            align="center"
            alt="logo"
          />
          <SubTitle>Prefeitura Municipal de Irituia</SubTitle>
          <SubTitle>Secretaria Municipal de Finanças</SubTitle>
          <SubTitle>Tesouraria da Prefeitura Municipal de Irituia</SubTitle>
          <SubTitle>CNPJ: 05.193.123/0001-00</SubTitle>
          <LineHorizontal />
          <Title>RECIBO</Title>
        </ContainerHeader>
        <h4>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(nfsa.valor_calculo)}
        </h4>
        <p style={{ textAlign: 'justify' }}>
          {`Recebi do(a) ${
            nfsa.tomador.nome
          } a importância de ${Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }
          ).format(nfsa.valor_calculo)} (${extenso(
            Intl.NumberFormat('pt-BR').format(nfsa.valor_calculo),
            {
              mode: 'currency'
            }
          ).toUpperCase()}), Referente a ${nfsa.items_nfsa[0].descricao}
          . Sendo pago conforme demostrativo abaixo.`}
        </p>

        <ContainerBody>
          <table style={{ borderSpacing: 5 }}>
            <tr>
              <td>Valor Total:</td>
              <td style={{ fontWeight: 'bold' }}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(nfsa.valor_calculo)}
              </td>
            </tr>
            <tr>
              <td>ISSQN:</td>
              <td style={{ fontWeight: 'bold' }}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(nfsa.valor_iss)}
              </td>
            </tr>
            <tr>
              <td>INSS:</td>
              <td style={{ fontWeight: 'bold' }}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(nfsa.inss_valor)}
              </td>
            </tr>
            <tr>
              <td>IRRF:</td>
              <td style={{ fontWeight: 'bold' }}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(nfsa.ir_valor)}
              </td>
            </tr>
            <tr>
              <td>Taxa de Expediente:</td>
              <td style={{ fontWeight: 'bold' }}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(nfsa.dam.taxa_expedicao)}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ borderTop: '1px solid #000' }} />
            </tr>
            <tr style={{ borderBottom: '1pt solid black' }}>
              <td>Valor à receber:</td>
              <td style={{ fontWeight: 'bold' }}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(nfsa.valor_nota)}
              </td>
            </tr>
          </table>
        </ContainerBody>

        <p style={{ marginTop: 30 }}>E por ser verdade assino o presente:</p>
        <p>Irituia - PA, _______ de ______________________ de ________.</p>
        <ContainerFooter>
          <span style={{ marginBottom: 5 }}>
            _______________________________________________
          </span>
          <span>{nfsa.prestador.nome}</span>
          <span>{nfsa.prestador.doc}</span>
          <span>
            {`${nfsa.prestador.banco} Ag.: ${nfsa.prestador.agencia} 
            ${nfsa.prestador.tipoConta} Conta: ${nfsa.prestador.conta}`}
          </span>
        </ContainerFooter>
      </A4>
    </Container>
  );
}

export default PdfRecibo;
