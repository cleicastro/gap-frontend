/* eslint-disable no-case-declarations */
import { TabelaIR } from '../services';

const ACTIONS = {
  RECEITA: 'RECEITA_FORM',
  TRIBUTOS: 'TRIBUTOS_FORM',
  DOCUMENTO: 'DOCUMENTO_FORM',
  ERROR: 'ERROR_FORM'
};

function initialDocumento() {
  const toDay = new Date();
  const weekDay = toDay.getDay();
  let diasVencer = 5;

  if (weekDay === 1) {
    diasVencer = 7;
  } else if (weekDay === 2) {
    diasVencer = 6;
  }

  const referencia = Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit'
  }).format(toDay);

  const emissao = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(toDay);

  const vencimento = Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(toDay.setDate(toDay.getDate() + diasVencer));

  return {
    referencia,
    emissao,
    vencimento,
    receita: '',
    docOrigem: '',
    infoAdicionais: '',
    valorPrincipal: 0,
    juros: 0,
    taxaExp: 5,
    valorTotal: 5,
    valorMulta: 0
  };
}

const INITIAL_STATE = {
  error: [],
  documento: initialDocumento(),
  tributos: {
    aliquotaIss: 5,
    municipio: 'Irituia',
    uf: 'PA',
    descontoIncodicional: 0,
    pisPercente: 0,
    pisValor: 0,
    confinsPercente: 0,
    confinsValor: 0,
    csllPercente: 0,
    csllValor: 0,
    inssPercente: 0,
    inssValor: 0,
    convertLiquid: false,
    irRetido: true
  }
};

export const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.DOCUMENTO:
      return {
        ...state,
        documento: action.value
      };
    case ACTIONS.TRIBUTOS:
      const { valorISS, irValor, taxaExp } = action.tributos;
      const valorPrincipal = Number(valorISS) + Number(irValor);
      const valorTotal = valorPrincipal + Number(taxaExp);
      return {
        ...state,
        tributos: {
          ...state.tributos,
          ...action.tributos
        },
        documento: {
          ...state.documento,
          receita: '1113050101',
          valorPrincipal,
          valorTotal
        }
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export function handleDocument(data) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.DOCUMENTO,
      value: {
        ...data
      }
    });
  };
}

export function liquidToGrossNFSA(data) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.TRIBUTOS,
      tributos: data
    });
  };
}

const calculationBasisForLiquid = (data, isFirstCalc) => {
  const {
    irValor,
    valorISS,
    aliquotaIss,
    irPercente,
    baseCalculo,
    taxaExp
  } = data;

  let newbaseCalculo = baseCalculo;
  // the variable 'irValorReCalc' with the value zero indicates the first execution of the function
  if (!isFirstCalc) {
    const percenteTaxas = 100 - (aliquotaIss + irPercente);
    const tribut = irValor + valorISS + taxaExp;
    const result = (tribut / percenteTaxas) * 100;
    newbaseCalculo = baseCalculo + result;
  }

  const valorISSRecalc = (aliquotaIss * newbaseCalculo) / 100;
  const valorNF = newbaseCalculo - valorISSRecalc - taxaExp;
  return {
    newbaseCalculo,
    valorNF,
    valorISSRecalc,
    irPercente
  };
};
export function calcTributsNFSA(data, isFirstCalc) {
  let irValorReCalc = data.irValor;
  let valuesNFSA = calculationBasisForLiquid(data, isFirstCalc);

  const { newbaseCalculo, irPercente } = valuesNFSA;
  return async (dispatch) => {
    try {
      const response = await TabelaIR.getTabelaIRCalcImposto(
        newbaseCalculo,
        null
      );
      const { aliquota, deducao } = response.data[0];

      if (Number(aliquota) > 0) {
        // the variable 'irValorReCalc' with the value zero indicates the first execution of the function
        if (Number(aliquota) !== irPercente && !isFirstCalc) {
          valuesNFSA = calculationBasisForLiquid(
            {
              ...data,
              irPercente: Number(aliquota),
              irValor: (Number(aliquota) * data.baseCalculo) / 100 - deducao
            },
            false
          );
        }

        irValorReCalc = (Number(aliquota) * valuesNFSA.newbaseCalculo) / 100;
        irValorReCalc -= deducao;
      }
      const { valorISSRecalc, valorNF } = valuesNFSA;

      dispatch({
        type: ACTIONS.TRIBUTOS,
        tributos: {
          taxaExp: data.taxaExp,
          irRetido: true,
          convertLiquid: !isFirstCalc,
          baseCalculo: valuesNFSA.newbaseCalculo.toFixed(2),
          valorDeducao: deducao,
          valorISS: valorISSRecalc.toFixed(2),
          valorNF: (valorNF - irValorReCalc).toFixed(2),
          irPercente: Number(aliquota),
          irValor: irValorReCalc.toFixed(2)
        }
      });
    } catch (error) {

      dispatch({
        type: ACTIONS.ERROR,
        error: {
          erro: 'Falha'
        }
      });
    }
  };
}
