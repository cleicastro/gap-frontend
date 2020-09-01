import React, { useContext } from 'react';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  Button,
  InputAdornment,
  makeStyles,
  Typography
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Save';
import { useForm } from 'react-hook-form';
import { ButtonStep } from '../../../../components';
import { useStepNfsa, useItemsNfsa } from '../../../../hooks';
import { mascaraReal } from '../../../../util';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';

const useStyles = makeStyles((theme) => ({
  totalValueItems: {
    fontSize: 28,
    fontWeight: 'bold',
    border: '1px solid'
  },
  gridTotal: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    border: 1
  }
}));

function FormItems() {
  const classes = useStyles();

  const { dispatch } = useContext(NfsaContext);

  const {
    control,
    errors,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue
  } = useForm();
  const [items, totalItems, setAddItem, setRemoveItem] = useItemsNfsa();
  const [stepActivity, setStepActivity] = useStepNfsa();

  const handleMaskValue = (event) => {
    const { name, value } = event.target;
    const values = mascaraReal(value);
    setValue(name, values);
  };

  const handlePrevStep = () => setStepActivity(stepActivity - 1);
  const handleNextStep = () => {
    dispatch({
      type: ACTIONS_NFSA.SET_ITEMS_NFSA,
      payload: items
    });
    setStepActivity(stepActivity + 1);
  };

  const handleAdditem = () => {
    const { valor, quantidade } = getValues();
    if (Number(valor) > 0 && Number(quantidade) > 0) {
      setAddItem(getValues());
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAdditem)} noValidate autoComplete="off">
      <Grid container spacing={3} justify="flex-end" alignItems="flex-end">
        <Grid item xs={12} sm={7}>
          <TextField
            disabled={items.length === 1}
            multiline
            rowsMax={4}
            inputRef={register}
            autoFocus
            control={control}
            InputLabelProps={{
              shrink: true
            }}
            name="descricao"
            label="Descrição"
            fullWidth
            error={!!errors.descricao}
            helperText={errors.descricao && errors.descricao.message}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            disabled={items.length === 1}
            inputRef={register}
            control={control}
            InputLabelProps={{
              shrink: true
            }}
            type="number"
            name="quantidade"
            label="Quantidade"
            fullWidth
            error={!!errors.quantidade}
            helperText={errors.quantidade && errors.quantidade.message}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            disabled={items.length === 1}
            inputRef={register}
            control={control}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button disabled={items.length === 1} type="submit">
                    <AddIcon size={16} />
                  </Button>
                </InputAdornment>
              )
            }}
            name="valor"
            label="Valor"
            fullWidth
            type="number"
            onChange={handleMaskValue}
            error={!!errors.valor}
            helperText={errors.valor && errors.valor.message}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: 32 }}>
        <Grid item xs={12} md={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{Number(item.quantidade)}</TableCell>
                    <TableCell>
                      {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(Number(item.valor))}
                    </TableCell>
                    <TableCell>
                      {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(Number(item.valor * item.quantidade))}
                    </TableCell>
                    <TableCell>
                      <Button type="button" onClick={() => setRemoveItem(key)}>
                        <DeleteIcon size={24} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justify="space-around" direction="row">
        <Grid item xs={6} styles={classes.gridTotal}>
          <Typography>Total:</Typography>
          <Typography styles={classes.totalValueItems}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalItems)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonStep
            type="button"
            disabledNext={items.length === 0}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        </Grid>
      </Grid>
    </form>
  );
}
export default FormItems;
