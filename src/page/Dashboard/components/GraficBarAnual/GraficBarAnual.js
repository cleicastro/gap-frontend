import React from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
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

// import { data, options } from './chart';
import palette from '../../../../theme/palette';
import useStyles from './styles';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
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
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
const arrayMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const GraficBarAnual = (props) => {
  const { emitido, pago, className, ...rest } = props;

  const classes = useStyles();

  const data = {
    labels: [
      'JANEIRO',
      'FEVEREIRO',
      'MARÇO',
      'ABRIL',
      'MAIO',
      'JUNHO',
      'JULHO',
      'AGOSTO',
      'SETEMBRO',
      'OUTUBRO',
      'NOVEMBRO',
      'DEZEMBRO'
    ],
    datasets: [
      {
        label: 'Emitido',
        backgroundColor: palette.primary.main,
        data: arrayMonth.map((month) => {
          if (emitido.length > 0) {
            const result = emitido.find((value) => value.mes === month);
            if (result) {
              return result.value;
            }
            return 0;
          }
          return 0;
        })
      },
      {
        label: 'Pago',
        backgroundColor: palette.success.main,
        data: arrayMonth.map((month) => {
          if (pago.length > 0) {
            const result = pago.find((value) => value.mes === month);
            if (result) {
              return result.value;
            }
            return 0;
          }
          return 0;
        })
      }
    ]
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={`Arrecadação ${new Date().getFullYear() - 1}`} />
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
