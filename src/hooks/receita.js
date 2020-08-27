import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DamContext } from '../contexts';

import { ACTIONS as ACTIONS_RECEITA } from '../store/receitaReducer';
import { Receita } from '../services';

async function requestReceita() {
  const response = await Receita.getReceita();
  return response;
}

function addReceitaAction(receita) {
  return {
    type: ACTIONS_RECEITA.LIST_RECEITA,
    listReceita: receita
  };
}

export const useRequestReceita = () => {
  let statusServer = null;
  const dispatch = useDispatch();

  statusServer = useEffect(() => {
    requestReceita().then((response) => {
      dispatch(addReceitaAction(response.data));
      if (response.status !== 201) {
        return response.status;
      }
      return null;
    });
  }, [dispatch]);

  return statusServer;
};

export const useStoreReceita = () => {
  const listReceita = useSelector((state) => state.receita.listReceita);
  const {
    state: { receitaSeleted }
  } = useContext(DamContext);

  return [listReceita, receitaSeleted];
};
