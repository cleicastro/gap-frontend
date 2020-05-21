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
    return api.get(
      'v1/api/dam',
      {
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
      },
      {
        cancelToken
      }
    );
  }

  salvarDam(
    {
      id,
      receita,
      docOrigem,
      infoAdicionais,
      referencia,
      emissao,
      vencimento,
      valorPrincipal,
      juros,
      valorMulta,
      taxaExp,
      valorTotal
    },
    cancelToken
  ) {
    return api.post(
      'v1/api/dam',
      {
        docOrigem,
        idContribuinte: id,
        receita,
        infoAdicionais,
        referencia,
        emissao,
        vencimento,
        valorPrincipal,
        taxaExp,
        valorTotal,
        juros,
        valorMulta,
        pago: 0,
        retido: 1
      },
      {
        cancelToken
      }
    );
  }

  updateDam(id, params, cancelToken) {
    return api.put(
      `v1/api/dam/${id}`,
      {
        ...params
      },
      {
        cancelToken
      }
    );
  }
}

export default new Dam();
