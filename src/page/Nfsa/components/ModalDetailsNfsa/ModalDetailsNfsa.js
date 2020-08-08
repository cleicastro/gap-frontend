import React, { useContext } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core';

import { NfsaContext } from '../../../../contexts';
import useStyles from './styles';
import PreviewNfsa from '../PreviewNfsa';

function ModalDetailsNfsa() {
  const { showReview, setReviewShow } = useContext(NfsaContext);
  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showReview}
      maxWidth="md"
      onClose={() => setReviewShow(false)}
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        Visualizar Nota Fiscal
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}>
            <Grid item>
              <PreviewNfsa isOpenModalMenu />
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setReviewShow(false)} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDetailsNfsa;
