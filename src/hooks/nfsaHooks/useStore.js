import { useContext } from 'react';
import { NfsaContext, ACTIONS_NFSA } from '../../contexts';

const useStoreNfsa = () => {
  const { dispatch } = useContext(NfsaContext);
  function setSelecetNfsa(nfsa) {
    const {
      id,
      receita,
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
    } = nfsa.dam;

    const {
      valor_nota: valorNF,
      valor_calculo: irValor,
      valor_iss: valorISS,
      pis_valor: pisValor,
      inss_valor: inssValor,
      confins_valor: confinsValor,
      csll_valor: csllValor
    } = nfsa;

    dispatch({
      type: ACTIONS_NFSA.DOCUMENT,
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
      type: ACTIONS_NFSA.SELECT_TAXPAYER,
      payload: {
        prestador: nfsa.prestador,
        tomador: nfsa.tomador
      }
    });
    dispatch({
      type: ACTIONS_NFSA.MODAL_DETAILS,
      payload: true
    });
    dispatch({
      type: ACTIONS_NFSA.SELECT_NFSA,
      payload: {
        ...nfsa,
        idPrestador: nfsa.prestador.id,
        idTomador: nfsa.tomador.id,
        items: nfsa.items_nfsa,
        descontoIncodicional: nfsa.desconto_incodicional,
        valorNF,
        irValor,
        valorISS,
        pisValor,
        inssValor,
        confinsValor,
        csllValor
      }
    });
  }
  return setSelecetNfsa;
};

export default useStoreNfsa;
