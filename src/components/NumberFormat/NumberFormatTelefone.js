import React from 'react';
import NumberFormat from 'react-number-format';

function NumberFormatTelefone(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format="(##)# ########"
      mask="_"
    />
  );
}
export default NumberFormatTelefone;
