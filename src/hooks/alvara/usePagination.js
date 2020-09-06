import { useContext } from 'react';
import { ACTIONS_ALVARA, AlvaraFuncionamentoContext } from '../../contexts';
import { AlvaraFuncionamento } from '../../services';

function addDamsAction(alvara) {
  return {
    type: ACTIONS_ALVARA.LIST,
    payload: alvara
  };
}
export const usePaginationAlvara = () => {
  const { dispatch } = useContext(AlvaraFuncionamentoContext);

  function setPagination(params) {
    return AlvaraFuncionamento.getAlvara(params).then((response) => {
      dispatch(addDamsAction(response.data));
      return response;
    });
  }
  return setPagination;
};

export default usePaginationAlvara;
