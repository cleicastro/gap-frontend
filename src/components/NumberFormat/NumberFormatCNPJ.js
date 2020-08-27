import React from 'react';
import NumberFormat from 'react-number-format';

function NumberFormatCNPJ(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format="##.###.###/####-##"
      mask="_"
    />
  );
}
export default NumberFormatCNPJ;
