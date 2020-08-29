import React from 'react';
import NumberFormat from 'react-number-format';

function NumberFormatCNPJ(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      getInputRef={inputRef}
      format="##.###.###/####-##"
      mask="_"
    />
  );
}
export default NumberFormatCNPJ;
