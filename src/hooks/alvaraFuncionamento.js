import Axios from 'axios';
import { useEffect, useContext, useState, useRef } from 'react';
import { AlvaraFuncionamento } from '../services';
import { dateFormatPTBR } from '../util';

import { AlvaraFuncionamentoContext, ACTIONS_ALVARA } from '../contexts';

const tokenAlvara = Axios.CancelToken.source();

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

async function requestAlvara(params) {
  const response = await AlvaraFuncionamento.getAlvara(
    { ...params },
    tokenAlvara.token
  );
  return response;
}
async function saveAlvara(alvara) {
  const response = await AlvaraFuncionamento.salvarAlvara({ ...alvara });
  return response;
}
async function editAlvara(id, params) {
  const response = await AlvaraFuncionamento.updateAlvara(id, params);
  return response;
}

function initialAlvaraAction(alvara) {
  return {
    type: ACTIONS_ALVARA.LIST_INITIAL,
    payload: alvara
  };
}
function addAlvaraAction(alvara) {
  return {
    type: ACTIONS_ALVARA.LIST,
    payload: alvara
  };
}
function addNewAlvaraAction(alvara) {
  return {
    type: ACTIONS_ALVARA.ADD,
    payload: alvara
  };
}
function editAlvaraAction(alvara) {
  return {
    type: ACTIONS_ALVARA.UPDATE_ALVARA,
    payload: alvara
  };
}

export const useStoreAlvara = () => {
  const {
    state: { listAlvara },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const valueTotal = listAlvara.reduce(
    (acc, alvara) => (acc + alvara.dam ? Number(alvara.dam.valor_total) : 0),
    0
  );

  function setSelecetAlvara(alvara) {
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
    } = alvara.dam;

    dispatch({
      type: ACTIONS_ALVARA.DOCUMENT,
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
      type: ACTIONS_ALVARA.SELECT_TAXPAYER,
      payload: {
        ...contribuinte
      }
    });
    dispatch({
      type: ACTIONS_ALVARA.MODAL_DETAILS,
      payload: true
    });
    dispatch({
      type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
      payload: { ...alvara }
    });
  }
  return [listAlvara, valueTotal, setSelecetAlvara];
};

export const usePaginationAlvara = () => {
  const {
    state: { paramsQuery, pagination },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  let statusServer = null;
  function setPagination(params) {
    if (pagination.current_page < pagination.last_page) {
      requestAlvara({ ...paramsQuery, ...params }).then((response) => {
        dispatch(addAlvaraAction(response.data));
        if (response.status !== 201) {
          statusServer = response.status;
        }
        return () => {
          tokenAlvara.cancel('Request cancell');
        };
      });
    }
  }
  return [pagination, setPagination, statusServer];
};

export const useFilterAlvara = () => {
  const { dispatch } = useContext(AlvaraFuncionamentoContext);

  function setParams(params) {
    dispatch({
      type: ACTIONS_ALVARA.LIST_INITIAL,
      payload: { data: [], meta: {} }
    });
    requestAlvara(params).then((response) => {
      dispatch(initialAlvaraAction(response.data));
    });
    dispatch({
      type: ACTIONS_ALVARA.PARAMS_QUERY,
      payload: params
    });

    return () => {
      tokenAlvara.cancel('Request cancell');
    };
  }
  return setParams;
};

export const useSaveAlvara = () => {
  const {
    state: {
      receitaSeleted,
      taxpayerSeleted,
      document,
      dataDam,
      dataAlvaraFunvionamento
    },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const idContribuinte = taxpayerSeleted.id;
  const [statusServer, setStatusServer] = useState(null);
  const [successRequest, setSuccessRequest] = useState(false);
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (statusServer > 0) setSuccessRequest(true);
    }, 1000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [statusServer]);

  function setSave() {
    saveAlvara({
      ...document,
      ...dataAlvaraFunvionamento,
      idContribuinte
    }).then((response) => {
      dispatch(addNewAlvaraAction(response));
      setStatusServer(response.status);
      dispatch({
        type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
        payload: response.data
      });
      dispatch({
        type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
        payload: response.data
      });
    });
  }
  function setEditStatus(id, type, param) {
    setSuccessRequest(false);
    setStatusServer(null);

    editAlvara(id, param).then((response) => {
      let alvara = dataAlvaraFunvionamento;
      const { dam } = alvara;
      if (type === 'pay') {
        alvara = { ...alvara, dam: { ...dam, pago: true, status: 'Pago' } };
      } else if (type === 'cancel') {
        alvara = { ...alvara, dam: { ...dam, status: 'Cancelado' } };
      }
      dispatch({
        type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
        payload: alvara
      });
      dispatch(editAlvaraAction(alvara));
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
    editAlvara(param.id, { ...document, idContribuinte }).then((response) => {
      dispatch(editAlvaraAction(param));
      setStatusServer(response.status);
      dispatch({
        type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
        payload: param
      });
    });
  }
  return [statusServer, successRequest, setSave, setEditStatus, setEdit];
};

export const useOpenNewAlvara = () => {
  const { dispatch } = useContext(AlvaraFuncionamentoContext);

  function setWindow() {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_NEW_ALVARA
    });
  }
  return setWindow;
};

export const usePreviewAlvara = () => {
  const {
    state: { document, taxpayerSeleted, dataAlvaraFunvionamento }
  } = useContext(AlvaraFuncionamentoContext);

  const { juros, valorMulta, valorPrincipal, taxaExp, valorTotal } = document;
  const { nome, doc } = taxpayerSeleted;
  const descricao =
    dataAlvaraFunvionamento && dataAlvaraFunvionamento.atividade_principal;

  return {
    items: [
      { descricao, valor: valorPrincipal },
      { descricao: 'Multa', valor: valorMulta },
      { descricao: 'Juros', valor: juros },
      { descricao: 'Taxa de Expediente', valor: taxaExp }
    ],
    valorTotal,
    contribuinte: { nome, doc },
    dam: { ...document, idContribuinte: taxpayerSeleted.id }
  };
};

export const useStepAlvara = () => {
  const {
    state: { activeStep },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  const navigate = (valor) => {
    dispatch({ type: ACTIONS_ALVARA.ACTIVE_STEP, payload: valor });
  };
  return [activeStep, navigate];
};

export const useInitialDocumentAlvara = () => {
  const {
    state: { receitaSeleted, document },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  const values = document.valorPrincipal
    ? document
    : initialValues(receitaSeleted);

  function setDocument(data) {
    dispatch({
      type: ACTIONS_ALVARA.DOCUMENT,
      payload: { ...values, ...data }
    });
  }
  return [values, setDocument];
};
