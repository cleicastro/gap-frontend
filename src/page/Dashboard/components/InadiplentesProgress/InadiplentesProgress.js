import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { useStyles, ColorLinearProgress } from './styles';

const InadiplentesProgress = ({
  className,
  title,
  value,
  statistic,
  ...rest
}) => {
  const classes = useStyles();

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
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(value / statistic || 0)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <ColorLinearProgress
          className={classes.progress}
          value={(value / statistic) * 100 || 0}
          variant="determinate"
          color="primary"
        />
      </CardContent>
    </Card>
  );
};

InadiplentesProgress.propTypes = {
  className: PropTypes.string
};

export default InadiplentesProgress;
