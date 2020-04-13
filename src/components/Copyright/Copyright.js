import React from 'react';
import { Link } from 'react-router-dom';
import Typegraphy from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typegraphy variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Ryatec Sistemas
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typegraphy>
  );
}
