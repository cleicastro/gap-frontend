import React from 'react';

import clsx from 'clsx';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery,
  ButtonGroup,
  Menu,
  MenuItem,
  Fade
} from '@material-ui/core';
import useStyles from './styles';
import { Review } from '../../../../components';

function ModalDetailsDam({
  className,
  handleReviewShow,
  showReview,
  handleDamView,
  ...rest
}) {
  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const infoAditional = handleDamView.info_adicionais;
  const valueDocument = handleDamView.valor_principal && [
    { name: 'Valor Principal', price: handleDamView.valor_principal },
    { name: 'Valor do juros', price: handleDamView.valor_juros },
    { name: 'Taxa de expedição', price: handleDamView.taxa_expedicao }
  ];
  const contribuinte = handleDamView.contribuinte && [
    handleDamView.contribuinte.nome,
    handleDamView.contribuinte.endereco,
    handleDamView.contribuinte.numero,
    handleDamView.contribuinte.bairro,
    handleDamView.contribuinte.cidade
  ];
  const document = handleDamView.emissao && [
    {
      name: 'receita',
      detail: handleDamView.receita ? handleDamView.receita.cod : '0000000'
    },
    {
      name: 'descricao',
      detail: handleDamView.receita.descricao
        ? handleDamView.receita.descricao
        : 'Receita inválida'
    },
    { name: 'Referência', detail: handleDamView.referencia },
    {
      name: 'Data de emissão',
      detail: Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).format(new Date(handleDamView.emissao))
    },
    {
      name: 'Data de vencimento',
      detail: Intl.DateTimeFormat('pt-BR').format(
        new Date(handleDamView.vencimento)
      )
    },
    { name: 'Documento de origem', detail: handleDamView.n_ref }
  ];

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showReview}
      maxWidth="sm"
      onClose={handleReviewShow}
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        <ButtonGroup
          size="small"
          variant="contained"
          color="primary"
          aria-label="contained primary button group">
          <Button>Pagar</Button>
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            Imprimir
          </Button>
          <Button>Copiar</Button>
          <Button>Editar</Button>
          <Button>Cancelar</Button>
        </ButtonGroup>
      </DialogTitle>
      <DialogContent dividers>
        <div {...rest} className={clsx(classes.root, className)}>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}>
            <MenuItem onClick={handleClose}>DAM</MenuItem>
            <MenuItem onClick={handleClose}>Alvará</MenuItem>
            <MenuItem onClick={handleClose}>NFSA</MenuItem>
            <MenuItem onClick={handleClose}>Recibo</MenuItem>
          </Menu>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}>
            <Grid item>
              <Review
                valueDocument={valueDocument}
                contribuinte={contribuinte}
                document={document}
                infoAditional={infoAditional}
              />
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReviewShow} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDetailsDam;
