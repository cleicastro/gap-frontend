const { default: api } = require('./api');

class AlvaraFuncionamento {
  getAlvaraAlvaraIndex(id, cancelToken) {
    return api.get(`alvara-funcionamento/${id}`, {}, { cancelToken });
  }

  getAlvara(
    {
      id,
      emissao,
      vencimento,
      contribuinte,
      valorTotal,
      dataFinalFilter,
      dataInicialFilter,
      docContribuinteFilter,
      nameContribuinteFilter,
      situacaoFilter,
      valorTotalFilter,
      order,
      sort,
      page
    },
    cancelToken
  ) {
    return api.get(
      'alvara-funcionamento',
      {
        params: {
          id,
          emissao,
          vencimento,
          contribuinte,
          valorTotal,
          dataFinalFilter,
          dataInicialFilter,
          docContribuinteFilter,
          nameContribuinteFilter,
          situacaoFilter,
          valorTotalFilter,
          sort: order ? `${order},${sort ? 'asc' : 'desc'}` : null,
          page
        }
      },
      {
        cancelToken
      }
    );
  }

  salvarAlvara(params, cancelToken) {
    return api.post(
      'alvara-funcionamento',
      { ...params },
      {
        cancelToken
      }
    );
  }

  updateAlvara(id, params, cancelToken) {
    return api.put(
      `alvara-funcionamento/${id}`,
      {
        ...params
      },
      {
        cancelToken
      }
    );
  }
}

export default new AlvaraFuncionamento();
