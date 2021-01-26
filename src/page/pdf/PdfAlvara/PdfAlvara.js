import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/Print';

import { Grid, CircularProgress, Typography, Box } from '@material-ui/core';
import { AlvaraFuncionamento } from '../../../services';

import {
  Container,
  A4,
  ContainerAlvara,
  ContainerHeader,
  ContainerBody,
  ContainerFooter,
  Assignature,
  Title,
  SubTitle,
  TextValidate,
  TextObs,
  TextContainer,
  TextALvaraItem,
  TextFooter,
  useStyles
} from './styles';

function PdfAlvara() {
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
            FALHA AO CARREGAR OS DADOS, ATUALIZE A PÁGINA!
          </Typography>
        </Grid>
      </Grid>
    );
  }

  const cadastroEconomico = alvara.inscricao_municipal.split('.');

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
        <ContainerAlvara>
          <ContainerHeader>
            <img
              src="/images/logos/logo.png"
              width="190"
              height="120"
              border="0"
              align="center"
              alt="logo"
            />
            <Title>ALVARÁ</Title>
            <SubTitle>Funcionamento</SubTitle>
          </ContainerHeader>
          <ContainerBody>
            <div>
              <TextContainer>Nome ou Razão Social:</TextContainer>
              <TextALvaraItem>{alvara.dam.contribuinte.nome}</TextALvaraItem>
            </div>
            <div>
              <TextContainer>Nome Fantasia:</TextContainer>
              <TextALvaraItem>{alvara.nome_fantasia}</TextALvaraItem>
            </div>
            <div>
              <TextContainer>CPF/CNPJ:</TextContainer>
              <TextALvaraItem>{alvara.dam.contribuinte.doc}</TextALvaraItem>
            </div>
            <div>
              <TextContainer>Atividade Principal:</TextContainer>
              <TextALvaraItem>{alvara.atividade_principal}</TextALvaraItem>
            </div>
            {alvara.atividade_secundaria_I && (
              <div>
                <TextContainer>Atividade Secundária I:</TextContainer>
                <TextALvaraItem>{alvara.atividade_secundaria_I}</TextALvaraItem>
              </div>
            )}
            {alvara.atividade_secundaria_I && (
              <div>
                <TextContainer>Atividade Secundária II:</TextContainer>
                <TextALvaraItem>
                  {alvara.atividade_secundaria_II}
                </TextALvaraItem>
              </div>
            )}
            <div>
              <TextContainer>Inscrição Municipal:</TextContainer>
              <TextALvaraItem>{alvara.inscricao_municipal}</TextALvaraItem>
            </div>
            <div>
              <TextContainer>Cadastro Econômico:</TextContainer>
              <TextALvaraItem>
                {cadastroEconomico.length === 4
                  ? cadastroEconomico[2]
                  : alvara.dam.contribuinte.id}
              </TextALvaraItem>
            </div>
            <div>
              <TextContainer>Endereço:</TextContainer>
              <TextALvaraItem>{alvara.endereco}</TextALvaraItem>
            </div>
            <div>
              <TextContainer>Bairro:</TextContainer>
              <TextALvaraItem>{alvara.bairro}</TextALvaraItem>
            </div>

            <TextValidate>
              {`Validade: 01/01/${new Date().getFullYear()} a 
              31/12/${new Date().getFullYear()}`}
            </TextValidate>

            <TextObs>
              <p>
                OBS: Funcionar dentro das normas estabelecidas por Lei Municipal
                Nº 240/00.
              </p>
              <b>Recomenda-se</b> aos senhores proprietários de sons
              automotivos, bares e outras fontes sonoras, atendam aos limites da
              emissão sonora, de acordo com a lei nº 351/2011, sob pena de
              incorrer em ato de infração à legislação ambiental.
            </TextObs>
          </ContainerBody>
          <ContainerFooter>
            <Assignature>
              <span>____________________________</span>
              <TextFooter>Marcos de Lima Pinto</TextFooter>
              <TextFooter>Prefeito Municipal de Irituia</TextFooter>
            </Assignature>
            <Assignature>
              <span>____________________________</span>
              <TextFooter>Simonely Leite Pinto</TextFooter>
              <TextFooter>Secretária Municipal de Finanças</TextFooter>
            </Assignature>
          </ContainerFooter>
        </ContainerAlvara>
      </A4>
    </Container>
  );
}

export default PdfAlvara;
