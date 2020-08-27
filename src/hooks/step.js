import { useContext } from 'react';
import { DamContext, ACTIONS } from '../contexts';

export const useStep = () => {
  const {
    state: { activeStep },
    dispatch
  } = useContext(DamContext);

  const navigate = (valor) => {
    dispatch({ type: ACTIONS.ACTIVE_STEP, payload: valor });
  };
  return [activeStep, navigate];
};
