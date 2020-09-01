/* eslint-disable react/no-unused-prop-types */
import React, { useContext, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider
} from '@material-ui/core';

import { NfsaContext } from '../../../../contexts';
import useStyles from './styles';
import {
  ButtonStep,
  MenuDocumentEvents,
  ModalSave
} from '../../../../components';

import {
  useOpenNewNfsa,
  usePreviewNfsa,
  useStepNfsa,
  useSaveNfsa
} from '../../../../hooks';

function PreviewNfsa() {
  const classes = useStyles();
  const {
    state: { showModalDetails, dataNfsa, editNfsa, document }
  } = useContext(NfsaContext);

  const { id, dam } = dataNfsa;
  const { emissao, vencimento } = document;
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const setWindowNewNfsa = useOpenNewNfsa();

  const {
    participantes,
    items,
    tributes,
    valorNF,
    valorDam
  } = usePreviewNfsa();

  const [stepActivity, setStepActivity] = useStepNfsa();

  const [
    statusServer,
    successRequest,
    setSave,
    setEditStatus,
    setEdit
  ] = useSaveNfsa();
  const handlePrevStep = () => setStepActivity(stepActivity - 1);
  const handleSaveDAM = () => {
    setOpenModalMenu(true);
    if (!editNfsa) {
      setSave();
    } else {
      setEdit(id);
    }
  };

  const handleAlterStatusDAM = (type, param) =>
    setEditStatus(dam && dam.id, type, param);
  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container direction="row">
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Prestador
            </Typography>
            <Typography gutterBottom>{participantes.nomePrestador}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{participantes.docPrestador}</Typography>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Tomador
            </Typography>
            <Typography gutterBottom>{participantes.nomeTomador}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{participantes.docTomador}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" gutterBottom>
                Emissão
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" align="center" gutterBottom>
                Vencimento
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" gutterBottom>
                Valor do DAM
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={5}>
              <Typography>
                {Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false
                }).format(new Date(dam ? dam.emissao : emissao))}
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography>
                {Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }).format(new Date(dam ? dam.vencimento : vencimento))}
              </Typography>
            </Grid>
            <Grid item xs={3} align="right">
              <Typography>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(valorDam))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <List disablePadding>
        {items.map((item, key) => (
          <div key={key}>
            <Divider variant="middle" />
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.descricao} />
              <Typography variant="body2">
                {`(+) `}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(item.quantidade) * Number(item.valor))}
              </Typography>
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}
        {tributes.map((item, key) => (
          <div key={key}>
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.descricao} />
              <Typography variant="body2">
                {`(-) `}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(item.valor))}
              </Typography>
              <Divider />
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(Number(valorNF))}
          </Typography>
        </ListItem>
      </List>
      {!showModalDetails && (
        <ButtonStep
          handlePrevStep={handlePrevStep}
          disableSave={false}
          handleSave={handleSaveDAM}
        />
      )}

      <ModalSave
        openModalMenu={openModalMenu}
        statusServer={statusServer}
        successRequest={successRequest}>
        <>
          {!editNfsa && (
            <Typography variant="subtitle1">
              {`O Número da sua nota fiscal é #${id}.\n
                  Selecione um envento para este documento.`}
            </Typography>
          )}
          <MenuDocumentEvents
            values={{ id_dam: dam && dam.id, id }}
            handleAlterStatusDAM={handleAlterStatusDAM}
            handleClose={setWindowNewNfsa}
            visibleOptions={{
              imprimir: true,
              pagar: dam && !dam.pago && dam.status !== 'Cancelado',
              copiar: showModalDetails,
              editar: showModalDetails,
              cancelar: dam && dam.status !== 'Cancelado',
              nfsa: true,
              recibo: true,
              alvara: false,
              sair: true
            }}
          />
        </>
      </ModalSave>
    </>
  );
}

export default PreviewNfsa;
