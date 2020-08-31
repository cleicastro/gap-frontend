import { useSelector, useDispatch } from 'react-redux';

import Axios from 'axios';
import { useEffect, useContext, useState, useRef } from 'react';
import { Nfsa, TabelaIR } from '../services';
import { ACTIONS as ACTIONS_NFSA } from '../store/nfsaReducer';
import { dateFormatPTBR } from '../util';

import { NfsaContext, ACTIONS_NFSA as ACTIONS_NFSA_CONTEXT } from '../contexts';

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

  const vencimento = Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateVencimento.setDate(dateVencimento.getDate() + diasVencer));

  const emissao = new Date(`${new Date().toString().split('GMT')[0]} UTC`)
    .toISOString()
    .split('.')[0]
    .replace('T', ' ');

  return {
    referencia,
    emissaoConvertPT,
    emissao,
    vencimento
  };
}

function initialValues(receitaSeleted) {
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
      Number(receitaSeleted.valor_fixo) > 0 ? receitaSeleted.valor_fixo : 0,
    taxaExp: 5,
    valorTotal:
      Number(receitaSeleted.valor_fixo) > 0 ? receitaSeleted.valor_fixo : 5
  };
}

function initialValuesTributos() {
  return {
    aliquotaIss: 5,
    uf: 'PA',
    municipio: 'Irituia',
    converterIRRF: false,
    irRetido: true,
    baseCalculo: 0,
    irAliquota: 0,
    irValor: 0,
    valorDeducao: 0,
    irPercente: 0,
    valorISS: 0,
    taxaExp: 5,
    valorNF: 0,
    pisPercente: 0,
    pisValor: 0,
    inssPercente: 0,
    inssValor: 0,
    confinsPercente: 0,
    confisValor: 0,
    csllPercente: 0,
    csllValor: 0
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
  const confisValor = (baseCalc * Number(confinsPercente)) / 100;

  let irAliquota;
  let irValor;
  let valorDeducao;
  let irPercente;
  if (irRetido) {
    const tableIRSelected = tableIR.find((faixa) => baseCalc <= faixa.ate);
    const auxTableIR = tableIRSelected || tableIR[tableIR.length - 1];
    irAliquota = (baseCalc * (auxTableIR.aliquota / 100)).toFixed(2);
    irValor = (
      baseCalc * (auxTableIR.aliquota / 100) -
      auxTableIR.deducao
    ).toFixed(2);
    valorDeducao = auxTableIR.deducao;
    irPercente = auxTableIR.aliquota;
  } else {
    irAliquota = 0;
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
    confisValor -
    csllValor -
    taxaExp
  ).toFixed(2);

  return {
    ...data,
    baseCalculo: baseCalc,
    irAliquota,
    irValor,
    irValorView: irValor,
    valorDeducao,
    irPercente,
    valorISS,
    pisValor,
    inssValor,
    confisValor,
    csllValor,
    valorNF
  };
}

function convertNfsaToLiquid(tributs) {
  console.log(tributs);
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
    confisValor,
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
    Number(confisValor) +
    Number(csllValor);

  const difTax = (totalTaxs / percentLiquid).toFixed(2);
  const result = Number(baseCalculo) + Number(difTax);

  return result;
}

async function requestNfsa(params) {
  const response = await Nfsa.getNfsa({ ...params }, tokenNfsa.token);
  return response;
}
async function saveNfsa(nfsa) {
  const response = await Nfsa.saveNFSA({ ...nfsa });
  return response;
}
async function editNfsa(id, params) {
  const response = await Nfsa.editNFSA(id, params);
  return response;
}
async function requestTableIR() {
  const response = await TabelaIR.getTabelaIR();
  return response;
}

function tableIrAction(table) {
  return {
    type: ACTIONS_NFSA.TABLE_IR,
    payload: table
  };
}
function initialNfsaAction(nfsa) {
  return {
    type: ACTIONS_NFSA.LIST_INITIAL,
    payload: nfsa
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
    const params = { page: 1 };
    requestNfsa(params).then((response) => {
      dispatch(initialNfsaAction(response.data));
      setStatusServer(response.status);
    });

    requestTableIR().then((response) => {
      dispatch(tableIrAction(response.data));
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
  const valueTotal = listNfsa.reduce(
    (acc, nfsa) => (acc + nfsa.dam ? Number(nfsa.dam.valor_total) : 0),
    0
  );

  function setSelecetNfsa(nfsa) {
    const {
      id,
      receita,
      contribuinte,
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
    } = nfsa.dam;

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
      payload: {
        ...contribuinte
      }
    });
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.MODAL_DETAILS,
      payload: true
    });
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
      payload: { ...nfsa }
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
  const [statusServer, setStatusServer] = useState(null);
  const dispatch = useDispatch();
  const { dispatch: dispatchNfsa } = useContext(NfsaContext);

  function setParams(params) {
    setStatusServer(null);
    requestNfsa(params).then((response) => {
      dispatch(initialNfsaAction(response.data));
      setStatusServer(response.status);
    });
    dispatchNfsa({
      type: ACTIONS_NFSA_CONTEXT.PARAMS_QUERY,
      payload: params
    });

    return () => {
      tokenNfsa.cancel('Request cancell');
    };
  }
  return [statusServer, setParams];
};

export const useSaveNfsa = () => {
  const {
    state: {
      receitaSeleted,
      taxpayerSeleted,
      document,
      dataDam,
      dataNfsaFunvionamento
    },
    dispatch: dispatchNfsa
  } = useContext(NfsaContext);
  const idContribuinte = taxpayerSeleted.id;
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

  function setSave() {
    saveNfsa({
      ...document,
      ...dataNfsaFunvionamento,
      idContribuinte
    }).then((response) => {
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
    });
  }
  function setEditStatus(id, type, param) {
    setSuccessRequest(false);
    setStatusServer(null);

    editNfsa(id, param).then((response) => {
      let nfsa = dataNfsaFunvionamento;
      const { dam } = nfsa;
      if (type === 'pay') {
        nfsa = { ...nfsa, dam: { ...dam, pago: true, status: 'Pago' } };
      } else if (type === 'cancel') {
        nfsa = { ...nfsa, dam: { ...dam, status: 'Cancelado' } };
      }
      dispatchNfsa({
        type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
        payload: nfsa
      });
      dispatch(editNfsaAction(nfsa));
      setStatusServer(response.status);
    });
  }
  function setEdit() {
    const param = {
      ...dataDam,
      id: document.id,
      receita: receitaSeleted,
      contribuinte: taxpayerSeleted,
      data_pagamento: document.dataPagamento,
      info_adicionais: document.infoAdicionais,
      n_ref: document.docOrigem,
      referencia: document.referencia,
      taxa_expedicao: document.taxaExp,
      valor_juros: document.juros,
      valor_multa: document.valorMulta,
      valor_principal: document.valorPrincipal,
      valor_total: document.valorTotal,
      vencimento: document.vencimento
    };
    editNfsa(param.id, { ...document, idContribuinte }).then((response) => {
      dispatch(editNfsaAction(param));
      setStatusServer(response.status);
      dispatchNfsa({
        type: ACTIONS_NFSA_CONTEXT.SELECT_NFSA,
        payload: param
      });
    });
  }
  return [statusServer, successRequest, setSave, setEditStatus, setEdit];
};

export const useOpenNewNfsa = () => {
  const { dispatch } = useContext(NfsaContext);

  function setWindow() {
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.MODAL_NEW
    });
  }
  return setWindow;
};

export const usePreviewNfsa = () => {
  const {
    state: { document, taxpayerSeleted, dataNfsa }
  } = useContext(NfsaContext);

  const { juros, valorMulta, taxaExp, valorPrincipal: valorDam } = document;
  const { prestador, tomador } = taxpayerSeleted;
  const { valor_nota: valorNF, items_nfsa: items } = dataNfsa;
  return {
    participantes: {
      nomePrestador: prestador && prestador.nome,
      docPrestador: prestador && prestador.nome,
      nomeTomador: tomador && tomador.nome,
      docTomador: tomador && tomador.nome
    },
    items,
    tributes: [
      { descricao: 'Multa', valor: valorMulta },
      { descricao: 'Juros', valor: juros },
      { descricao: 'Taxa de Expediente', valor: taxaExp }
    ],
    valorNF,
    valorDam
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
  const data = dataNfsa.length > 0 ? dataNfsa : initialValuesTributos();
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
      newBaseCalc = convertNfsaToLiquid({
        ...result,
        baseCalculo: tributs.baseCalculo
      });

      result = calcTributsNfsa(newBaseCalc, result, tableIR);
    }
    return result;
  }

  return [tributs, setAusentIR, setConvertToLiquid];
};

export const useInitialDocumentNfsa = () => {
  const {
    state: { receitaSeleted, document },
    dispatch
  } = useContext(NfsaContext);

  const values = document.valorPrincipal
    ? document
    : initialValues(receitaSeleted);

  function setDocument(data) {
    const { vencimento } = dateSetting(data.vencimento);
    dispatch({
      type: ACTIONS_NFSA_CONTEXT.DOCUMENT,
      payload: { ...values, ...data, vencimento }
    });
  }
  return [values, setDocument];
};
