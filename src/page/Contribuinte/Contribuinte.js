import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import useStyles from './styles';
import { Contribuintes } from '../../components';
import { ContribuinteProvier } from '../../contexts';

function Contribuinte() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ContribuinteProvier>
              <Contribuintes />
            </ContribuinteProvier>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Contribuinte;
