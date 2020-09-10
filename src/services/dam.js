import api from './api';

class Dam {
  getDamIndex(id, cancelToken) {
    return api.get(`dam/${id}`, {}, { cancelToken });
  }

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
      valorTotalFilter,
      all,
      cancelado,
      inadimplente,
      pago,
      vencer,
      order,
      sort,
      page
    },
    cancelToken
  ) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      'dam',
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
          situacaoFilter: all
            ? `${all},${pago},${vencer},${inadimplente},${cancelado}`
            : null,
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
      idContribuinte,
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
      'dam',
      {
        docOrigem,
        idContribuinte,
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
        status: 1,
        retido: 1
      },
      {
        cancelToken
      }
    );
  }

  updateDam(id, params, cancelToken) {
    return api.put(
      `dam/${id}`,
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
