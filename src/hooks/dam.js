import { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Axios from 'axios';
import { ACTIONS as ACTIONS_DAM } from '../store/damReducer';
import { Dam } from '../services';
import { DamContext, ACTIONS as ACTIONS_DAM_CONTEXT } from '../contexts';
import { dateFormatPTBR } from '../util';

const tokenDam = Axios.CancelToken.source();

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

async function requestDam(params) {
  const response = await Dam.getDam({ ...params }, tokenDam.token);
  return response;
}
async function saveDam(dam) {
  const response = await Dam.salvarDam({ ...dam });
  return response;
}
async function editDam(id, params) {
  const response = await Dam.updateDam(id, params);
  return response;
}

function initialDamsAction(dam) {
  return {
    type: ACTIONS_DAM.LIST_INITIAL,
    payload: dam
  };
}
function addDamsAction(dam) {
  return {
    type: ACTIONS_DAM.LIST,
    payload: dam
  };
}
function addNewDamsAction(dam) {
  return {
    type: ACTIONS_DAM.ADD,
    payload: dam
  };
}
function editDamAction(dam) {
  return {
    type: ACTIONS_DAM.UPDATE_DAM,
    payload: dam
  };
}

export const useDam = () => {
  const [statusServer, setStatusServer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = { page: 1 };
    requestDam(params).then((response) => {
      dispatch(initialDamsAction(response.data));
      setStatusServer(response.status);
    });
  }, [dispatch]);

  return statusServer;
};

export const usePaginationDam = () => {
  const { pagination } = useSelector((state) => state.dam);
  const dispatch = useDispatch();
  const {
    state: { paramsQuery }
  } = useContext(DamContext);

  let statusServer = null;
  function setPagination(params) {
    if (pagination.current_page < pagination.last_page) {
      requestDam({ ...paramsQuery, ...params }).then((response) => {
        dispatch(addDamsAction(response.data));
        if (response.status !== 201) {
          statusServer = response.status;
        }
        return () => {
          tokenDam.cancel('Request cancell');
        };
      });
    }
  }
  return [pagination, setPagination, statusServer];
};

export const useFilterDam = () => {
  const [statusServer, setStatusServer] = useState(null);
  const dispatch = useDispatch();
  const { dispatch: dispatchDam } = useContext(DamContext);

  function setParams(params) {
    setStatusServer(null);
    requestDam(params).then((response) => {
      dispatch(initialDamsAction(response.data));
      setStatusServer(response.status);
    });
    dispatchDam({
      type: ACTIONS_DAM_CONTEXT.PARAMS_QUERY,
      payload: params
    });

    return () => {
      tokenDam.cancel('Request cancell');
    };
  }
  return [statusServer, setParams];
};

export const usePreviewDam = () => {
  const {
    state: { document, taxpayerSeleted, receitaSeleted }
  } = useContext(DamContext);

  const {
    juros,
    valorMulta,
    valorPrincipal,
    taxaExp,
    valorTotal,
    vencimento,
    infoAdicionais
  } = document;
  const { nome, doc } = taxpayerSeleted;
  const { descricao } = receitaSeleted;

  return {
    items: [
      { descricao, valor: valorPrincipal },
      { descricao: 'Multa', valor: valorMulta },
      { descricao: 'Juros', valor: juros },
      { descricao: 'Taxa de Expediente', valor: taxaExp }
    ],
    valorTotal,
    contribuinte: { nome, doc },
    dam: { vencimento, infoAdicionais }
  };
};

export const useSaveDam = () => {
  const {
    state: { receitaSeleted, taxpayerSeleted, document, dataDam },
    dispatch: dispatchDam
  } = useContext(DamContext);
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
    saveDam({ ...document, idContribuinte }).then((response) => {
      dispatch(addNewDamsAction(response));
      setStatusServer(response.status);
      dispatch({
        type: ACTIONS_DAM_CONTEXT.SELECT_DAM,
        payload: response.data
      });
      dispatchDam({
        type: ACTIONS_DAM_CONTEXT.SELECT_DAM,
        payload: response.data
      });
    });
  }
  function setEditStatus(id, type, param) {
    setSuccessRequest(false);
    setStatusServer(null);

    editDam(id, param).then((response) => {
      let dam = dataDam;
      if (type === 'pay') {
        dam = { ...dam, pago: true, status: 'Pago' };
      } else if (type === 'cancel') {
        dam = { ...dam, status: 'Cancelado' };
      }
      dispatchDam({
        type: ACTIONS_DAM_CONTEXT.SELECT_DAM,
        payload: dam
      });
      dispatch(editDamAction(dam));
      setStatusServer(response.status);
    });
  }
  function setEditDam() {
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
    editDam(param.id, { ...document, idContribuinte }).then((response) => {
      dispatch(editDamAction(param));
      setStatusServer(response.status);
      dispatchDam({
        type: ACTIONS_DAM_CONTEXT.SELECT_DAM,
        payload: param
      });
    });
  }
  return [statusServer, successRequest, setSave, setEditStatus, setEditDam];
};

export const useOpenNewDam = () => {
  const { dispatch } = useContext(DamContext);

  function setWindow() {
    dispatch({
      type: ACTIONS_DAM_CONTEXT.MODAL_NEW_DAM
    });
  }
  return setWindow;
};

export const useStoreDam = () => {
  const { dispatch } = useContext(DamContext);
  function setSelecetDam(dam) {
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
    } = dam;

    dispatch({
      type: ACTIONS_DAM_CONTEXT.DOCUMENT,
      payload: {
        id,
        referencia,
        emissao,
        emissaoConvertPT: dateFormatPTBR(emissao),
        vencimento,
        receita: receita.cod,
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
      type: ACTIONS_DAM_CONTEXT.SELECT_RECEITA,
      payload: {
        ...receita
      }
    });
    dispatch({
      type: ACTIONS_DAM_CONTEXT.SELECT_TAXPAYER,
      payload: {
        ...contribuinte
      }
    });
    dispatch({
      type: ACTIONS_DAM_CONTEXT.MODAL_DETAILS,
      payload: true
    });
    dispatch({
      type: ACTIONS_DAM_CONTEXT.SELECT_DAM,
      payload: { ...dam }
    });
  }
  return setSelecetDam;
};
export const useInitialDocument = () => {
  const {
    state: { receitaSeleted, document },
    dispatch
  } = useContext(DamContext);

  const values = document.valorPrincipal
    ? document
    : initialValues(receitaSeleted);

  function setDocument(data) {
    const { vencimento } = dateSetting(data.vencimento);
    dispatch({
      type: ACTIONS_DAM_CONTEXT.DOCUMENT,
      payload: { ...values, ...data, vencimento }
    });
  }
  return [values, setDocument];
};

export const useStepDam = () => {
  const {
    state: { activeStep },
    dispatch
  } = useContext(DamContext);

  const navigate = (valor) => {
    dispatch({ type: ACTIONS_DAM_CONTEXT.ACTIVE_STEP, payload: valor });
  };
  return [activeStep, navigate];
};
