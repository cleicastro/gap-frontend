import React, { useEffect, useState } from 'react';

import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import {
  A4,
  TextTitle,
  useStyles,
  Text,
  TitleContribuinte,
  TextContainer,
  MarcaDAgua
} from './styles';
import { Dam, Nfsa } from '../../../services';

function PdfDam() {
  const classes = useStyles();

  const path = window.location.pathname.split('/');
  const id = Number(path[3]);
  const [dam, setDam] = useState(null);
  const [load, setLoad] = useState(true);
  const operator = JSON.parse(localStorage.getItem('app-token'));
  const [nfsa, setNfsa] = useState(null);

  useEffect(() => {
    const tokenDam = Axios.CancelToken.source();
    async function requestNFSA(idNfsa) {
      try {
        const response = await Nfsa.getNFSAIndex(idNfsa, tokenDam.token);
        setNfsa(response.data);
        setLoad(false);
      } catch (error) {
        console.log(error);
      }
    }
    async function requestDAM() {
      try {
        const response = await Dam.getDamIndex(id, tokenDam.token);
        setDam(response.data);
        if (response.data.receita.cod === '1113050101') {
          requestNFSA(response.data.nfsa[0].id);
        } else {
          setLoad(false);
        }
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

  const ContainerDAM = () => {
    return (
      <table border="1" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td>
              <img
                src="/images/logos/logo.png"
                width="160"
                height="90"
                border="0"
                align="left"
                alt="logo"
              />
              <TextTitle>Prefeitura Municipal de Irituia</TextTitle>
              <TextTitle>Secretaria Municipal de Finanças</TextTitle>
              <TextTitle>Departamento de Tributos</TextTitle>
              <TextTitle>CNPJ: 05.193.123./0001-00</TextTitle>
            </td>
            <td className={classes.columnCenter} colSpan="3">
              <TextTitle>DAM</TextTitle>
              <Text style={{ fontSize: 9 }}>
                DOCUMENTO DE ARRECADAÇÃO MUNICIPAL
              </Text>
              <Text style={{ fontSize: 9 }}>
                Operador: <span>{operator.nome}</span>
              </Text>
            </td>
            <td className={classes.columnCenter}>
              <TextTitle>DAM N°</TextTitle>
              <Text>{dam.id}</Text>
            </td>
          </tr>
          <tr className={classes.damHead}>
            <td rowSpan="4" style={{ padding: 5 }}>
              <TitleContribuinte>
                IDENTIFICAÇÃO DO CONTRIBUINTE
              </TitleContribuinte>
              <Text>
                CPF/CNPJ: <TextContainer>{dam.contribuinte.doc}</TextContainer>
              </Text>
              <Text>
                NOME: <TextContainer>{dam.contribuinte.nome}</TextContainer>
              </Text>
              <Text>
                ENDEREÇO:
                <TextContainer> {dam.contribuinte.endereco}, </TextContainer>
                N°:
                <TextContainer> {dam.contribuinte.numero}</TextContainer>
                BAIRRO:{' '}
                <TextContainer> {dam.contribuinte.bairro}</TextContainer>
              </Text>
              <Text>
                MUNICÍPIO:{' '}
                <TextContainer>{dam.contribuinte.cidade} </TextContainer>
              </Text>
              <Text>
                E-MAIL: <TextContainer>{dam.contribuinte.email} </TextContainer>
              </Text>
            </td>
            <td colSpan="2" className={classes.columnCenter}>
              <Text>INSC: </Text>
              <TextContainer>-</TextContainer>
            </td>
            <td colSpan="2" className={classes.columnCenter}>
              <Text> INSC: DOC. ORIGEM: </Text>
              <TextContainer>{nfsa && `NFSA: ${nfsa.id}`}</TextContainer>
            </td>
          </tr>
          <tr className={classes.damHead}>
            <td width="80" className={classes.columnCenter}>
              <Text>EMISSÃO</Text>
            </td>
            <td width="74" className={classes.columnCenter}>
              <Text>VENCIMENTO</Text>
            </td>
            <td width="60" className={classes.columnCenter}>
              <Text>PARCELA</Text>
            </td>
            <td className={classes.columnCenter}>
              <Text>REFERÊNCIA</Text>
            </td>
          </tr>
          <tr className={classes.damHead}>
            <td className={classes.columnCenter}>
              <TextTitle>
                {Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false
                }).format(new Date(dam.emissao))}
              </TextTitle>
            </td>
            <td className={classes.columnCenter}>
              <TextTitle>
                {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                  new Date(dam.vencimento)
                )}
              </TextTitle>
            </td>
            <td className={classes.columnCenter}>
              <TextTitle>Única</TextTitle>
            </td>
            <td className={classes.columnCenter}>
              <TextTitle>{dam.referencia}</TextTitle>
            </td>
          </tr>
          <tr className={classes.damHead}>
            <td className={classes.columnCenter}>
              <Text>CÓDIGO</Text>
            </td>
            <td className={classes.columnCenter} colSpan="2">
              <Text>DESCRIÇÃO</Text>
            </td>
            <td className={classes.columnCenter}>
              <Text>VALOR (R$)</Text>
            </td>
          </tr>
          <tr className={classes.damHead}>
            <td valign="top" style={{ padding: 5 }}>
              <TitleContribuinte>OBSERVAÇÃO</TitleContribuinte>
              <Text>
                Pagável na SEFIN ou{' '}
                <span style={{ color: '#ff0000' }}>
                  Banco do Brasil AG: 2144-X C/C: 27015-6
                </span>{' '}
                Sr. contribuinte, trazer comprovante de pagamento na SEFIN.
              </Text>
            </td>
            <td className={classes.columnCenter} valign="top">
              {dam.receita.cod}
            </td>
            <td className={classes.columnCenter} colSpan="2" valign="top">
              <Text>{dam.receita.sigla}</Text>
            </td>
            <td className={classes.columnCenter} valign="top">
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(nfsa ? nfsa.valor_iss : dam.valor_principal))}
              </Text>
            </td>
          </tr>
          <tr className={classes.damHead} style={{ minHeight: 120 }}>
            <td rowSpan="2" valign="top">
              <Text style={{ padding: 5 }}>
                {nfsa ? nfsa.items_nfsa[0].descricao : dam.info_adicionais}
              </Text>
            </td>
            <td style={{ borderTop: 0 }}>&nbsp;</td>
            <td colSpan="2" valign="botton" style={{ padding: 5 }}>
              <Text>IRRF</Text>
              <Text>JUROS</Text>
              <Text>MULTA</Text>
              <Text>TAXA DE EXPEDIENTE</Text>
            </td>
            <td valign="botton" style={{ padding: 5 }}>
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(nfsa ? nfsa.ir_valor : 0))}
              </Text>
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(dam.valor_juros))}
              </Text>
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(dam.valor_multa))}
              </Text>
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(dam.taxa_expedicao))}
              </Text>
            </td>
          </tr>
          <tr className={classes.damHead}>
            <td colSpan="3" style={{ padding: 5 }}>
              <Text>TOTAL A PAGAR</Text>
            </td>
            <td style={{ padding: 2 }}>
              <TextContainer>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(dam.valor_total))}
              </TextContainer>
            </td>
          </tr>
          <tr>
            <td colSpan="5" styles={{ border: 'none', padding: 5 }}>
              <Text
                style={{
                  margin: '5px 0 5px 10px',
                  fontSize: '15pt'
                }}>
                {`00000000000 0 00000000000 0 00000000000 0 000000000${dam.id} 0`}
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className={classes.root}>
      <A4>
        {dam.status === 'Pago' && (
          <MarcaDAgua>
            <TitleContribuinte style={{ fontSize: 42 }}>Pago</TitleContribuinte>
            <Text>em: {dam.data_pagamento}</Text>
          </MarcaDAgua>
        )}
        {dam.status === 'Cancelado' && (
          <MarcaDAgua>
            <TitleContribuinte style={{ fontSize: 42 }}>
              Cancelado
            </TitleContribuinte>
          </MarcaDAgua>
        )}
        <ContainerDAM />
        <hr
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: '100%',
            borderStyle: 'dashed'
          }}
        />
        {dam.status !== 'Pago' && dam.status !== 'Cancelado' && (
          <ContainerDAM />
        )}
      </A4>
    </div>
  );
}

export default PdfDam;
