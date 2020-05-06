import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data, options } from './chart';
import useStyles from './styles';

const GraficBarAnual = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={`Arrecadação ${new Date().getFullYear()}`} />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Relatórios <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

GraficBarAnual.propTypes = {
  className: PropTypes.string
};

export default GraficBarAnual;
