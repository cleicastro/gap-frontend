import React from 'react';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './styles';

function CardSkeletron({ quantSkeletron }) {
  const classes = useStyles();

  return (
    <>
      {quantSkeletron.map((skeletron) => (
        <Grid item xl={4} lg={6} sm={6} xs={12} key={skeletron}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circle"
                  width={40}
                  height={40}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.media}
            />

            <CardContent>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default CardSkeletron;
