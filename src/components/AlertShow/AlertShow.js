import React from 'react';
import { Zoom } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlertShow = ({ messageProps }) => {
  const { message, type } = messageProps;
  return (
    <Zoom
      in
      style={{
        transitionDelay: message ? '200ms' : '0ms',
        display: !message ? 'none' : 'flex'
      }}>
      <Alert severity={type}>{message}</Alert>
    </Zoom>
  );
};

export default AlertShow;
