import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

import useStyles from './styles';
import palette from '../../../../theme/palette';

const options = {
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  cutoutPercentage: 80,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  }
};

const GraficPieInadimplencia = (props) => {
  const { values, className, ...rest } = props;
  const classes = useStyles();
  const { incomes } = values;
  // const dataTotal = incomes.reduce((acc, item) => acc + Number(item.value), 0);
  const data = {
    datasets: [
      {
        data: incomes.map((income) => income.value),
        backgroundColor: incomes.map(
          () => `#${Math.floor(Math.random() * 256)}`
        ),
        borderWidth: 8,
        borderColor: palette.white,
        hoverBorderColor: palette.white
      }
    ],
    labels: incomes.map((value) => value.title)
  };
  // incomes.map((value) => data.push(value.value));
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={<IconButton size="small"> <RefreshIcon /> </IconButton>}
        title="Arrecadações Inadimplentes/Receita"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {incomes.map((income) => (
            <div className={classes.device} key={income.title}>
              <Typography variant="caption">{income.title}</Typography>
              <Typography style={{ color: 'green' }} variant="h6">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(income.value)}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

GraficPieInadimplencia.propTypes = {
  className: PropTypes.string
};

export default GraficPieInadimplencia;
