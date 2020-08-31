import React, { useState, useCallback, useContext } from 'react';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from '@material-ui/core';

import {
  ButtonStep,
  MenuDocumentEvents,
  ModalSave
} from '../../../../components';
import useStyles from './styles';
import {
  useSaveAlvara,
  usePreviewAlvara,
  useOpenNewAlvara,
  useStepAlvara
} from '../../../../hooks';
import { AlvaraFuncionamentoContext } from '../../../../contexts';

export default function Preview() {
  const {
    state: {
      showModalDetails,
      dataAlvaraFunvionamento: { id_dam: idDam, dam },
      editAlvaraFuncionamento
    }
  } = useContext(AlvaraFuncionamentoContext);

  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const setWindowNewReceita = useOpenNewAlvara();

  const { items, valorTotal, contribuinte } = usePreviewAlvara();
  const [stepActivity, setStepActivity] = useStepAlvara();

  const [
    statusServer,
    successRequest,
    setSave,
    setEditStatus,
    setEdit
  ] = useSaveAlvara();

  const handlePrevStep = () => setStepActivity(stepActivity - 1);
  const handleSaveDAM = () => {
    setOpenModalMenu(true);
    if (!editAlvaraFuncionamento) {
      setSave();
    } else {
      setEdit();
    }
  };

  const handleAlterStatusDAM = useCallback(
    (type, param) => {
      setEditStatus(idDam, type, param);
    },
    [idDam, setEditStatus]
  );

  return (
    <>
      <List disablePadding>
        {items.map((document, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={document.descricao} />
            <Typography variant="body2">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(document.valor)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(valorTotal)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2} direction="column">
        <Grid item container direction="row">
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Contribuinte
            </Typography>
            <Typography gutterBottom>{contribuinte.nome}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{contribuinte.doc}</Typography>
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
                Situação
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
                }).format(new Date())}
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography>
                {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                  new Date(dam ? dam.vencimento : new Date())
                )}
              </Typography>
            </Grid>
            <Grid item xs={3} align="right">
              <Typography>{dam && dam.status}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Informações adicionais
          </Typography>
          <Typography gutterBottom>{dam && dam.infoAdicionais}</Typography>
        </Grid>
      </Grid>
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
          {!editAlvaraFuncionamento && (
            <Typography variant="subtitle1">
              {`O Número do seu DAM é #${idDam}.\n
                  Selecione um envento para este documento.`}
            </Typography>
          )}
          <MenuDocumentEvents
            values={{ idDam }}
            handleAlterStatusDAM={handleAlterStatusDAM}
            handleClose={setWindowNewReceita}
            visibleOptions={{
              imprimir: true,
              pagar: dam && !dam.pago && dam.status !== 'Cancelado',
              copiar: showModalDetails,
              editar: showModalDetails,
              cancelar: dam && dam.status !== 'Cancelado',
              nfsa: false,
              alvara: true,
              recibo: false,
              sair: true
            }}
          />
        </>
      </ModalSave>
    </>
  );
}
