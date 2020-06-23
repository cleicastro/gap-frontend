import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import useStyles from './styles';
import FormNewUser from './FormNewUser/FormNewUser';
import { UserProvider } from '../../contexts';

function User() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <UserProvider>
              <FormNewUser />
            </UserProvider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default User;
