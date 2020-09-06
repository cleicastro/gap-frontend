import { useContext } from 'react';
import { ACTIONS, DamContext } from '../../contexts';
import { Dam } from '../../services';

function addDamsAction(dam) {
  return {
    type: ACTIONS.LIST,
    payload: dam
  };
}
export const usePaginationDam = () => {
  const { dispatch } = useContext(DamContext);

  function setPagination(params) {
    return Dam.getDam(params).then((response) => {
      dispatch(addDamsAction(response.data));
      return response;
    });
  }
  return setPagination;
};

export default usePaginationDam;
