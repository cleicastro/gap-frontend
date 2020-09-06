import { useContext } from 'react';
import { DamContext, ACTIONS } from '../../contexts';

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
      type: ACTIONS.DOCUMENT,
      payload: {
        id,
        referencia,
        emissao,
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
      type: ACTIONS.SELECT_RECEITA,
      payload: {
        ...receita
      }
    });
    dispatch({
      type: ACTIONS.SELECT_TAXPAYER,
      payload: {
        ...contribuinte
      }
    });
    dispatch({
      type: ACTIONS.MODAL_DETAILS,
      payload: true
    });
    dispatch({
      type: ACTIONS.SELECT_DAM,
      payload: { ...dam }
    });
  }
  return setSelecetDam;
};
