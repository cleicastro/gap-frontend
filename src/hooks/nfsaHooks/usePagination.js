import { useContext } from 'react';
import { ACTIONS_NFSA, NfsaContext } from '../../contexts';
import { Nfsa } from '../../services';

function addDamsAction(alvara) {
  return {
    type: ACTIONS_NFSA.LIST,
    payload: alvara
  };
}
export const usePaginationNfsa = () => {
  const { dispatch } = useContext(NfsaContext);

  function setPagination(params) {
    return Nfsa.getNfsa(params).then((response) => {
      dispatch(addDamsAction(response.data));
      return response;
    });
  }
  return setPagination;
};

export default usePaginationNfsa;
