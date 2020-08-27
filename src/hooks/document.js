import { useContext } from 'react';
import { DamContext, ACTIONS } from '../contexts';

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
      type: ACTIONS.DOCUMENT,
      payload: { ...values, ...data, vencimento }
    });
  }
  return [values, setDocument];
};
