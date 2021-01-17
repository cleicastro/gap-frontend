import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoneyIcon from '@material-ui/icons/Money';
import useStyles from './styles';

const Arrecadado = ({
  className,
  title,
  valueToday,
  valueYestarday,
  footer,
  ...rest
}) => {
  const classes = useStyles();
  const differeceValue = valueToday - valueYestarday;
  const calcPercentDifference = differeceValue / valueYestarday;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              {title}
            </Typography>
            <Typography variant="h3">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(valueToday)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {calcPercentDifference > 0 && (
            <ArrowUpwardIcon className={classes.differencePositiveIcon} />
          )}
          {calcPercentDifference < 0 && (
            <ArrowDownwardIcon className={classes.differenceIcon} />
          )}
          <Typography
            className={
              calcPercentDifference >= 0
                ? classes.differencePositive
                : classes.differenceValue
            }
            variant="body2">
            {new Intl.NumberFormat('pt-BR', {
              style: 'percent',
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            }).format(calcPercentDifference || 0)}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            {footer}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Arrecadado.propTypes = {
  className: PropTypes.string
};

export default Arrecadado;
