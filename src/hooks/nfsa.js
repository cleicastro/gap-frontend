import { useSelector, useDispatch } from 'react-redux';

import Axios from 'axios';
import { useEffect, useContext, useState, useRef } from 'react';
import { Nfsa, TabelaIR, Dam } from '../services';
import { ACTIONS as ACTIONS_NFSA } from '../store/nfsaReducer';
import { dateFormatPTBR } from '../util';

import { NfsaContext, ACTIONS_NFSA as ACTIONS_NFSA_CONTEXT } from '../contexts';

const receitaSeleted = {
  cod: '1113050101',
  descricao: 'NOTA FISCAL AVULSA',
  icon: 'description',
  sigla: 'ISSQN-PF',
  valor_fixo: 0
};

const tokenNfsa = Axios.CancelToken.source();

function dateSetting(dateVencimento) {
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

  const emissaoConvertPT = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(toDay);

  const newdate = new Date(Date(dateVencimento));
  const dateVencimentoAux = newdate.setDate(newdate.getDate() + diasVencer);

  const vencimento = Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(dateVencimentoAux));

  const emissao = new Date(`${new Date().toString().split('GMT')[0]} UTC`)
    .toISOString()
    .split('.')[0];
  // .replace('T', ' ');

  return {
    referencia,
    emissaoConvertPT,
    emissao,
    vencimento
  };
}

function convertDateTimerFR(dateING) {
  const dateValue = new Date(
    `${new Date(dateING).toString().split('GMT')[0]} UTC`
  )
    .toISOString()
    .split('.')[0]
    .replace('T', ' ');
  return dateValue;
}

function initialTributosNfsa() {
  const { referencia, emissao, emissaoConvertPT, vencimento } = dateSetting(
    new Date()
  );
  return {
    referencia,
    emissao,
    emissaoConvertPT,
    vencimento,
    receita: receitaSeleted.cod,
    docOrigem: '',
    infoAdicionais: '',
    juros: 0.0,
    valorMulta: 0,
    valorPrincipal:
      receitaSeleted.valor_fixo > 0 ? receitaSeleted.valor_fixo : 0,
    taxaExp: 5,
    valorTotal: receitaSeleted.valor_fixo > 0 ? receitaSeleted.valor_fixo : 5
  };
}

function calcTributsNfsa(baseCalc, data, tableIR) {
  const {
    irRetido,
    aliquotaIss,
    inssPercente,
    pisPercente,
    taxaExp,
    confinsPercente,
    csllPercente
  } = data;

  const valorISS = ((baseCalc * Number(aliquotaIss)) / 100).toFixed(2);
  const pisValor = ((baseCalc * Number(pisPercente)) / 100).toFixed(2);
  const inssValor = ((baseCalc * Number(inssPercente)) / 100).toFixed(2);
  const csllValor = ((baseCalc * Number(csllPercente)) / 100).toFixed(2);
  const confinsValor = (baseCalc * Number(confinsPercente)) / 100;

  let irValorCalc;
  let irValor;
  let valorDeducao;
  let irPercente;
  if (irRetido) {
    const tableIRSelected = tableIR.find((faixa) => baseCalc <= faixa.ate);
    const auxTableIR = tableIRSelected || tableIR[tableIR.length - 1];
    irValorCalc = (baseCalc * (auxTableIR.aliquota / 100)).toFixed(2);
    irValor = (
      baseCalc * (auxTableIR.aliquota / 100) -
      auxTableIR.deducao
    ).toFixed(2);
    valorDeducao = auxTableIR.deducao;
    irPercente = auxTableIR.aliquota;
  } else {
    irValorCalc = 0;
    irValor = 0;
    valorDeducao = 0;
    irPercente = 0;
  }

  const valorNF = (
    baseCalc -
    irValor -
    valorISS -
    pisValor -
    inssValor -
    confinsValor -
    csllValor -
    taxaExp
  ).toFixed(2);

  return {
    ...data,
    baseCalculo: baseCalc,
    irValorCalc,
    irValor,
    irValorView: irValor,
    valorDeducao,
    irPercente,
    valorISS,
    pisValor,
    inssValor,
    confinsValor,
    csllValor,
    valorNF
  };
}

function convertNfsaToLiquid(tributs) {
  const {
    aliquotaIss,
    irPercente,
    pisPercente,
    inssPercente,
    confinsPercente,
    csllPercente,

    irValor,
    valorISS,
    taxaExp,
    baseCalculo,
    pisValor,
    inssValor,
    confinsValor,
    csllValor
  } = tributs;

  const allPercentsTaxs =
    Number(aliquotaIss) +
    Number(pisPercente) +
    Number(inssPercente) +
    Number(confinsPercente) +
    Number(csllPercente);
  const percentLiquid =
    (100 - (Number(irPercente) + Number(allPercentsTaxs))) / 100;

  const totalTaxs =
    Number(taxaExp) +
    Number(valorISS) +
    Number(irValor) +
    Number(pisValor) +
    Number(inssValor) +
    Number(confinsValor) +
    Number(csllValor);

  const difTax = (totalTaxs / percentLiquid).toFixed(2);
  const result = Number(baseCalculo) + Number(difTax);

  return result;
}

async function requestNfsa(params) {
  const response = await Nfsa.getNfsa(params, tokenNfsa.token);
  return response;
}
async function saveNfsa(items, nfsa, dam) {
  const response = await Nfsa.saveNFSA(items, nfsa, dam);
  return response;
}
async function editNfsa(items, nfsa, dam, id) {
  const response = await Nfsa.editNFSA(items, nfsa, dam, id);
  return response;
}
async function editStatusDAM(id, params) {
  const response = await Dam.updateDam(id, params);
  return response;
}
async function requestTableDeducao() {
  const response = await TabelaIR.getTabelaDeducoes();
  return response;
}

function tableDeducaoAction(table) {
  return {
    type: ACTIONS_NFSA.TABLE_DEDUCOES,
    payload: {
      tableIR: table.tableIR,
      tableINSS: table.tableINSS
    }
  };
}
function addNfsaAction(nfsa) {
  return {
    type: ACTIONS_NFSA.LIST,
    payload: nfsa
  };
}
function addNewNfsaAction(nfsa) {
  return {
    type: ACTIONS_NFSA.ADD,
    payload: nfsa
  };
}
function editNfsaAction(nfsa) {
  return {
    type: ACTIONS_NFSA.UPDATE_NFSA,
    payload: nfsa
  };
}

export const useNfsa = () => {
  const [statusServer, setStatusServer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    requestTableDeducao().then((response) => {
      dispatch(tableDeducaoAction(response.data));
      if (response.status !== 201) {
        setStatusServer(response.status);
      }
    });
  }, [dispatch]);

  return statusServer;
};

export const useStoreNfsa = () => {
  const { dispatch } = useContext(NfsaContext);
  const listNfsa = useSelector((state) => state.nfsa.listNfsa);
  const valueTotal = listNfsa.reduce((acc, nfsa) => {
    return acc + Number(nfsa.valor_calculo);
  }, 0);

  function setSelecetNfsa(nfsa) {
    const {
      dam: {
        id,
        receita,
        emissao,
        info_adicionais: infoAdicionais,
        n_ref: docOrigem,
        referencia,
        taxa_expedicao: taxaExp,
        valor_juros: juros,
        valor_multa: valorMulta,
        valor_principal: valorPrincipal,
        valor_total: valorTotal,
        vencimento
      },
      items_nfsa: itemsNfsa,
      prestador,
      tomador,
      uf,
      municipio,
      aliquota_iss: aliquotaIss,
      valor_calculo: baseCalculo,
      valor_deducao: valorDeducao,
      valor_iss: valorISS,
      ir_valor: irValor,
      pis_valor: pisValor,
      inss_valor: inssValor,
      confins_valor: confinsValor,
      csll_valor: csllValor,
      valor_nota: valorNF,

      ir_percente: irPercente,
      pis_percente: pisPercente,
      inss_percente: inssPercente,
      confins_percente: confinsPercente,
      csll_percente: csllPercente
    } = nfsa;

    dispatch({
      type: ACTIONS_NFSA_CONTEXT.DOCUMENT,
      payload: {
        id,
        referencia,
        emissao,
        emissaoConvertPT: dateFormatPTBR(emissao),
        vencimento,
        receita,
        docOrigem,
        infoAdicionais,
        juros,
        valorMulta,
        valorPrincipal,
        taxaExp,
        valorTotal
      }
    });
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.SELECT_TAXPAYER,
      payload: { prestador, tomador }
    });
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.SET_ITEMS_NFSA,
      payload: itemsNfsa
    });
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.MODAL_DETAILS,
      payload: true
    });
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
      payload: {
        id: nfsa.id,
        dam: nfsa.dam,
        aliquotaIss,
        uf,
        municipio,
        converterIRRF: false,
        irRetido: true,
        baseCalculo,
        valorDeducao,
        irPercente,
        pisPercente,
        inssPercente,
        confinsPercente,
        csllPercente,

        taxaExp,
        valorISS,
        irValorCalc: 0,
        irValor,
        pisValor,
        inssValor,
        confinsValor,
        csllValor,
        valorNF
      }
    });
  }
  return [listNfsa, valueTotal, setSelecetNfsa];
};

export const usePaginationNfsa = () => {
  const { pagination } = useSelector((state) => state.nfsa);
  const dispatch = useDispatch();
  const {
    state: { paramsQuery }
  } = useContext(NfsaContext);

  let statusServer = null;
  function setPagination(params) {
    if (pagination.current_page < pagination.last_page) {
      requestNfsa({ ...paramsQuery, ...params }).then((response) => {
        dispatch(addNfsaAction(response.data));
        if (response.status !== 201) {
          statusServer = response.status;
        }
        return () => {
          tokenNfsa.cancel('Request cancell');
        };
      });
    }
  }
  return [pagination, setPagination, statusServer];
};

export const useFilterNfsa = () => {
  const { dispatch: dispatchNfsa } = useContext(NfsaContext);

  function setFilter(params) {
    dispatchNfsa({
      type: ACTIONS_NFSA_CONTEXT.LIST_INITIAL,
      payload: { data: [], meta: {} }
    });
    requestNfsa(params).then((response) => {
      dispatchNfsa({ type: ACTIONS_NFSA_CONTEXT.LIST_INITIAL, payload: response.data });
      dispatchNfsa({
        type: ACTIONS_NFSA_CONTEXT.PARAMS_QUERY,
        payload: params
      });
    });

    return () => {
      tokenNfsa.cancel('Request cancell');
    };
  }
  return setFilter;
};

export const useSaveNfsa = () => {
  const {
    state: { taxpayerSeleted, document, dataDam, dataNfsa, dataItemNfsa },
    dispatch: dispatchNfsa
  } = useContext(NfsaContext);

  const idPrestador = taxpayerSeleted.prestador && taxpayerSeleted.prestador.id;
  const idTomador = taxpayerSeleted.tomador && taxpayerSeleted.tomador.id;
  const [statusServer, setStatusServer] = useState(null);
  const [successRequest, setSuccessRequest] = useState(false);
  const timer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (statusServer > 0) setSuccessRequest(true);
    }, 1000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [statusServer]);
  const nfsa = { ...dataNfsa, idPrestador, idTomador };

  function setSave() {
    const { emissao } = document;
    const dateProcess = convertDateTimerFR(emissao);
    saveNfsa(dataItemNfsa, nfsa, { ...document, emissao: dateProcess }).then(
      (response) => {
        dispatch(addNewNfsaAction(response));
        setStatusServer(response.status);
        dispatch({
          type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
          payload: response.data
        });
        dispatchNfsa({
          type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
          payload: response.data
        });
      }
    );
  }

  function setEditStatus(id, type, param) {
    setSuccessRequest(false);
    setStatusServer(null);

    editStatusDAM(id, param).then((response) => {
      // eslint-disable-next-line no-shadow
      let nfsa = dataNfsa;
      const { dam } = dataNfsa;
      if (type === 'pay') {
        nfsa = {
          ...nfsa,
          ...taxpayerSeleted,
          dam: { ...dam, pago: true, status: 'Pago' }
        };
      } else if (type === 'cancel') {
        nfsa = {
          ...nfsa,
          ...taxpayerSeleted,
          dam: { ...dam, status: 'Cancelado' }
        };
      }
      dispatchNfsa({
        type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
        payload: nfsa
      });
      dispatch(editNfsaAction(nfsa));
      setStatusServer(response.status);
    });
  }
  function setEdit(id) {
    const { emissao } = document;
    const dateProcess = convertDateTimerFR(emissao);

    editNfsa(dataItemNfsa, nfsa, { ...dataDam, emissao: dateProcess }, id).then(
      (response) => {
        dispatch(editNfsaAction({ ...nfsa, ...taxpayerSeleted }));
        setStatusServer(response.status);
        dispatchNfsa({
          type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
          payload: { ...nfsa, ...taxpayerSeleted }
        });
      }
    );
  }
  return [statusServer, successRequest, setSave, setEditStatus, setEdit];
};

export const useOpenNewNfsa = () => {
  const { dispatch } = useContext(NfsaContext);

  function setWindow() {
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.MODAL_NEW_NFSA
    });
  }
  return setWindow;
};

export const usePreviewNfsa = () => {
  const {
    state: { document, taxpayerSeleted, dataNfsa, dataItemNfsa }
  } = useContext(NfsaContext);

  const { juros, valorMulta, taxaExp, valorPrincipal } = document;
  const { prestador, tomador } = taxpayerSeleted;
  const valorDam =
    Number(juros) +
    Number(valorMulta) +
    Number(taxaExp) +
    Number(valorPrincipal);

  const {
    valorNF,
    irValor,
    valorISS,
    pisValor,
    inssValor,
    confinsValor,
    csllValor
  } = dataNfsa;
  return {
    participantes: {
      nomePrestador: prestador && prestador.nome,
      docPrestador: prestador && prestador.doc,
      nomeTomador: tomador && tomador.nome,
      docTomador: tomador && tomador.doc
    },
    items: dataItemNfsa,
    tributes: [
      { descricao: 'ISS', valor: valorISS },
      { descricao: 'IR', valor: irValor },
      { descricao: 'INSS', valor: inssValor },
      { descricao: 'PIS', valor: pisValor },
      { descricao: 'CONFINS', valor: confinsValor },
      { descricao: 'CSLL', valor: csllValor },
      { descricao: 'Multa', valor: valorMulta },
      { descricao: 'Juros', valor: juros },
      { descricao: 'Taxa de Expediente', valor: taxaExp }
    ],
    valorNF,
    valorDam,
    dam: {
      ...document,
      idPrestador: prestador?.id,
      idTomador: tomador?.id
    }
  };
};

export const useStepNfsa = () => {
  const {
    state: { activeStep },
    dispatch
  } = useContext(NfsaContext);

  const navigate = (valor) => {
    dispatch({ type: ACTIONS_NFSA_CONTEXT.ACTIVE_STEP, payload: valor });
  };
  return [activeStep, navigate];
};

export const useItemsNfsa = () => {
  const {
    state: { dataItemNfsa }
  } = useContext(NfsaContext);

  const [items, setItem] = useState(dataItemNfsa);
  const totalItems = items.reduce((acc, item) => {
    return acc + Number(item.quantidade) * Number(item.valor);
  }, 0);
  function setAddItem(data) {
    setItem((item) => [...item, data]);
  }

  function setRemoveItem(index) {
    const listItem = items.slice();
    listItem.splice(index, 1);
    setItem(listItem);
  }
  return [items, totalItems, setAddItem, setRemoveItem];
};

export const useInitialTributosNfsa = () => {
  const {
    state: { dataNfsa, dataItemNfsa }
  } = useContext(NfsaContext);
  const data = dataNfsa;
  const tableIR = useSelector((state) => state.nfsa.tableIR);

  const baseCalc = dataItemNfsa.reduce((acc, item) => {
    return acc + Number(item.quantidade) * Number(item.valor);
  }, 0);

  const tributs = calcTributsNfsa(baseCalc, data, tableIR);

  function setAusentIR(value) {
    return calcTributsNfsa(baseCalc, value, tableIR);
  }

  function setConvertToLiquid() {
    let newBaseCalc = convertNfsaToLiquid(tributs);
    let result = calcTributsNfsa(newBaseCalc, tributs, tableIR);

    if (result.irPercente !== tributs.irPercente) {
      const irValor =
        (Number(result.irPercente) * baseCalc) / 100 - result.valorDeducao;

      newBaseCalc = convertNfsaToLiquid({
        ...tributs,
        irPercente: result.irPercente,
        irValor
      });

      result = calcTributsNfsa(newBaseCalc, tributs, tableIR);
    }
    return result;
  }

  return [tributs, setAusentIR, setConvertToLiquid];
};

export const useInitialDocumentNfsa = () => {
  const {
    state: { document },
    dispatch
  } = useContext(NfsaContext);

  function setDocument(data) {
    const { vencimento } = dateSetting(data.vencimento);
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.DOCUMENT,
      payload: { ...document, ...data, vencimento }
    });
  }
  return [document, setDocument];
};

export const useSetNfsa = () => {
  const {
    state: { dataItemNfsa, dataNfsa },
    dispatch
  } = useContext(NfsaContext);
  function setDataNfsa(data) {
    const {
      baseCalculo,
      taxaExp,
      valorISS,
      irValor,
      pisValor,
      inssValor,
      confinsValor,
      csllValor
    } = data;

    dispatch({
      type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
      payload: { ...dataNfsa, ...data }
    });

    // verifica se houve alteração no valor na baseCalculo
    const actualValueItems = dataItemNfsa.reduce((acc, item) => {
      return acc + Number(item.valor) * Number(item.quantidade);
    }, 0);

    if (baseCalculo !== actualValueItems) {
      dispatch({
        type: ACTIONS_NFSA_CONTEXT.SET_ITEMS_NFSA,
        payload: dataItemNfsa.map((item) => {
          return {
            ...item,
            valor: (Number(baseCalculo) / Number(item.quantidade)).toFixed(2)
          };
        })
      });
    }

    const valorPrincipal = (
      Number(valorISS) +
      Number(irValor) +
      Number(pisValor) +
      Number(inssValor) +
      Number(confinsValor) +
      Number(csllValor)
    ).toFixed(2);

    const document = initialTributosNfsa();
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.DOCUMENT,
      payload: {
        ...document,
        valorPrincipal,
        valorTotal: (Number(valorPrincipal) + Number(taxaExp)).toFixed(2)
      }
    });
  }
  return setDataNfsa;
};
