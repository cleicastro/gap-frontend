import { useContext } from 'react';
import { useSelector } from 'react-redux';
import Tributos from '../../util/Tributos';
import { NfsaContext } from '../../contexts';

function auxCalcTributs(data, tableIR) {
  const calcTributo = new Tributos(
    data.baseCalculo,
    data.aliquotaIss,
    data.inssPercente,
    data.pisPercente,
    data.taxaExp,
    data.confinsPercente,
    data.csllPercente,
    tableIR
  );
  return calcTributo.calcTributsNfsa();
}

const useTributos = () => {
  const {
    state: { dataItemNfsa }
  } = useContext(NfsaContext);
  const tableIR = useSelector((state) => state.nfsa.tableIR);

  const baseCalculo = dataItemNfsa.reduce((acc, item) => {
    return acc + Number(item.quantidade) * Number(item.valor);
  }, 0);

  const tributosInitial = {
    aliquotaIss: 5,
    uf: 'PA',
    municipio: 'Irituia',
    converterIRRF: false,
    irRetido: true,
    taxaExp: 5,
    baseCalculo,

    irPercente: 0,
    pisPercente: 0,
    inssPercente: 0,
    confinsPercente: 0,
    csllPercente: 0,
    valorDeducao: 0,
    irValorCalc: 0,

    valorISS: 0,
    irValor: 0,
    pisValor: 0,
    inssValor: 0,
    confinsValor: 0,
    csllValor: 0,
    descontoIncodicional: 0,
    valorNF: 0
  };
  const calcInicialTributos = new Tributos(
    baseCalculo,
    tributosInitial.aliquotaIss,
    tributosInitial.inssPercente,
    tributosInitial.pisPercente,
    tributosInitial.taxaExp,
    tributosInitial.confinsPercente,
    tributosInitial.csllPercente,
    tableIR
  );

  const tributos = calcInicialTributos.calcTributsNfsa();
  const convertedToLiquid = calcInicialTributos.converterValorBrutoLiquid({
    ...tributosInitial,
    ...tributos
  });

  function setTributos(data) {
    const tributsConverted = auxCalcTributs(data, tableIR);

    if (tributos.irPercente !== tributsConverted.irPercente) {
      const { irPercente, valorDeducao } = tributsConverted;
      const irValor = (irPercente * baseCalculo) / 100 - valorDeducao;

      const newValorBase = calcInicialTributos.converterValorBrutoLiquid({
        ...tributosInitial,
        ...tributos,
        irPercente,
        irValor
      });

      const newTributs = auxCalcTributs(
        { ...data, baseCalculo: newValorBase },
        tableIR
      );
      return { ...data, ...newTributs };
    }
    return { ...data, ...tributsConverted };
  }
  return [{ ...tributosInitial, ...tributos, convertedToLiquid }, setTributos];
};

export default useTributos;
