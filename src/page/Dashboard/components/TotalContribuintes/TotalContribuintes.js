import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import useStyles from './styles';

const TotalContribuintes = ({
  className,
  title,
  value,
  statistic,
  footer,
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
              {new Intl.NumberFormat('pt-BR').format(value)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.differenceValue} variant="body2">
            {new Intl.NumberFormat('pt-BR', {
              style: 'percent',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(statistic / value)}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            {footer}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalContribuintes.propTypes = {
  className: PropTypes.string
};

export default TotalContribuintes;
