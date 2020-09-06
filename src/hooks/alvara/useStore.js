import { useContext } from 'react';
import { AlvaraFuncionamentoContext, ACTIONS_ALVARA } from '../../contexts';

const useStoreAlvara = () => {
  const { dispatch } = useContext(AlvaraFuncionamentoContext);
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

    const {
      inscricao_municipal: inscricaoMunicipal,
      nome_fantasia: nomeFantasia,
      atividade_principal: atividadePrincipal,
      atividade_secundaria_I: atividadeSecundariaI,
      atividade_secundaria_II: atividadeSecundariaII
    } = alvara;

    dispatch({
      type: ACTIONS_ALVARA.DOCUMENT,
      payload: {
        id,
        referencia,
        emissao,
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
      payload: {
        ...alvara,
        inscricaoMunicipal,
        nomeFantasia,
        atividadePrincipal,
        atividadeSecundariaI,
        atividadeSecundariaII
      }
    });
  }
  return setSelecetAlvara;
};

export default useStoreAlvara;
