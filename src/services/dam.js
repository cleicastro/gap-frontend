import api from './api';

class Dam {
  getDam(
    {
      id,
      emissao,
      vencimento,
      contribuinte,
      receita,
      valorTotal,
      dataFinalFilter,
      dataInicialFilter,
      docContribuinteFilter,
      nameContribuinteFilter,
      receitaFilter,
      situacaoFilter,
      valorTotalFilter,
      order,
      sort,
      page
    },
    cancelToken
  ) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get('v1/api/dam', {
      cancelToken,
      params: {
        id,
        emissao,
        vencimento,
        contribuinte,
        receita,
        valorTotal,
        dataFinalFilter,
        dataInicialFilter,
        docContribuinteFilter,
        nameContribuinteFilter,
        receitaFilter,
        situacaoFilter,
        valorTotalFilter,
        sort: order ? `${order},${sort ? 'asc' : 'desc'}` : null,
        page
      }
    });
  }
}

export default new Dam();
