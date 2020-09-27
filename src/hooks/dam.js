import { useContext } from 'react';

import Axios from 'axios';
import { Dam } from '../services';
import { DamContext, ACTIONS as ACTIONS_DAM_CONTEXT } from '../contexts';

const tokenDam = Axios.CancelToken.source();

async function requestDam(params) {
  const response = await Dam.getDam({ ...params }, tokenDam.token);
  return response;
}
function initialDamsAction(dam) {
  return {
    type: ACTIONS_DAM_CONTEXT.LIST_INITIAL,
    payload: dam
  };
}

export const useFilterDam = () => {
  const { dispatch } = useContext(DamContext);

  function setParams(params) {
    dispatch({
      type: ACTIONS_DAM_CONTEXT.LIST_INITIAL,
      payload: { data: [], meta: {} }
    });
    requestDam(params).then((response) => {
      dispatch(initialDamsAction(response.data));
    });
    dispatch({
      type: ACTIONS_DAM_CONTEXT.PARAMS_QUERY,
      payload: params
    });

    return () => {
      tokenDam.cancel('Request cancell');
    };
  }
  return setParams;
};

export const usePreviewDam = () => {
  const {
    state: { document, taxpayerSeleted, receitaSeleted }
  } = useContext(DamContext);

  const { juros, valorMulta, valorPrincipal, taxaExp, valorTotal } = document;
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
    dam: { ...document, idContribuinte: taxpayerSeleted.id }
  };
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
