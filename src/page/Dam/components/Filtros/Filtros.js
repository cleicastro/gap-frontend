import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import {
  Grid,
  Button,
  Paper,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useForm, FormProvider } from 'react-hook-form';

import useStyles from './styles';
import FormFilter from './FormFilter';
import { useStoreReceita, useFilterDam } from '../../../../hooks';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const customList = (items, checked, classes, handleToggle) => (
  <Paper className={classes.paper}>
    <List dense component="div" role="list">
      {items.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;
        return (
          <ListItem
            key={value}
            role="listitem"
            button
            onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  </Paper>
);

function Filtros({ className, handleSair, showFiltro, ...rest }) {
  const classes = useStyles();

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  // eslint-disable-next-line no-unused-vars
  const [statusServer, setFilter] = useFilterDam();
  const [receitas] = useStoreReceita();

  const methods = useForm();

  useEffect(() => {
    const listReceitaMap = [];
    receitas.map((d) => listReceitaMap.push(d.descricao));
    setLeft(listReceitaMap);
  }, [receitas]);

  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleClearFilter = () => {
    setLeft(left.concat(right));
    setRight([]);
    setFilter({});
    methods.reset();
  };
  const setParams = (data) => {
    const filter = { ...data, receitaFilter: right.join(',') };
    setFilter(filter);
    handleSair();
    console.log(data);
  };

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showFiltro}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(setParams)}
          noValidate
          autoComplete="off"
          id="formFiltro">
          <DialogContent dividers>
            <div {...rest} className={clsx(classes.root, className)}>
              <Grid
                container
                spacing={2}
                justify="flex-start"
                alignItems="flex-start"
                className={classes.root}>
                <Grid item>
                  {customList(left, checked, classes, handleToggle)}
                </Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleAllRight}
                      disabled={left.length === 0}
                      aria-label="move all right">
                      ≫
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right">
                      &gt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left">
                      &lt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleAllLeft}
                      disabled={right.length === 0}
                      aria-label="move all left">
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  {customList(right, checked, classes, handleToggle)}
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignItems="flex-start"
              className={classes.root}>
              <Grid item>
                <FormFilter />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Filtrar
            </Button>
            <Button onClick={handleClearFilter} color="primary">
              Limpar
            </Button>
            <Button onClick={handleSair} color="primary">
              Sair
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

export default Filtros;
