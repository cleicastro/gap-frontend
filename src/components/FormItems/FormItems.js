import React, { useState, useContext, useEffect } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Save';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteItemNFSA } from '../../store/nfsaReducer';
import { NfsaContext } from '../../contexts';
import ButtonStep from '../ButtonStep';

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

function FormItems(props) {
  const {
    steps,
    activeStep,
    setActiveStep,
    deleteItemNFSA: handleRemoveItemNFSA,
    removeItem,
    error
  } = props;
  const { valueFormItems, handleAddItem } = useContext(NfsaContext);
  const classes = useStyles();

  const { control, register, handleSubmit, reset } = useForm();
  const [items, setItems] = useState(valueFormItems);
  const [totalItems, setTotalItems] = useState(0);
  const [load, setLoad] = useState(false);
  const [keySelect, setKeySelect] = useState(null);

  useEffect(() => {
    setTotalItems(
      items.reduce((acc, act) => acc + act.quantidade * act.valor, 0)
    );
  }, [items]);

  useEffect(() => {
    if (removeItem) {
      setItems((values) => values.filter((item) => item.id !== removeItem.id));
    }
    if (error) {
      console.log(error);
    }
    setLoad(false);
    setKeySelect(null);
  }, [removeItem, error]);

  const onSubmit = (data) => {
    setItems((values) => [...values, data]);
    reset();
  };

  const handleRemoverItem = (keyItem) => {
    setKeySelect(keyItem);
    setLoad(true);
    const { id } = items[keyItem];
    if (id) {
      handleRemoveItemNFSA(id);
    } else {
      const newItens = items.slice();
      newItens.splice(keyItem, 1);
      setItems(newItens);
      setLoad(false);
      setKeySelect(null);
    }
  };

  const handleNext = () => {
    handleAddItem(items);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    handleAddItem(items);
    setActiveStep(activeStep - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} justify="flex-end" alignItems="flex-end">
        <Grid item xs={12} sm={7}>
          <TextField
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
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            inputRef={register}
            control={control}
            InputLabelProps={{
              shrink: true
            }}
            name="quantidade"
            label="Quantidade"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
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
                  <Button type="submit">
                    <AddIcon size={16} />
                  </Button>
                </InputAdornment>
              )
            }}
            name="valor"
            label="Valor"
            fullWidth
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
                      <Button onClick={() => handleRemoverItem(key)}>
                        {load && keySelect === key ? (
                          <CircularProgress size={24} />
                        ) : (
                            <DeleteIcon size={24} />
                          )}
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
        <Grid item xs={6} md={6} styles={classes.gridTotal}>
          <Typography styles={classes.totalValueItems}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalItems)}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <ButtonStep
            steps={steps}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            disabledNext={totalItems < 1}
          />
        </Grid>
      </Grid>
    </form>
  );
}
const mapStateToProps = (state) => ({
  removeItem: state.nfsa.removeItem,
  error: state.nfsa.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteItemNFSA
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormItems);
