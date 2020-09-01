import api from './api';

class Nfsa {
  getNFSAIndex(id, cancelToken) {
    return api.get(`nfsa/${id}`, {}, { cancelToken });
  }

  getNfsa(
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
      'nfsa',
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

  saveNFSA(items, nfsa, dam, cancelToken) {
    const {
      idPrestador,
      idTomador,
      aliquotaIss,
      municipio,
      uf,
      descontoIncodicional,
      pisPercente,
      pisValor,
      confinsPercente,
      confinsValor,
      csllPercente,
      csllValor,
      inssPercente,
      inssValor,
      valorNF,
      valorISS,
      valorDeducao,
      baseCalculo,
      irPercente,
      irValor
    } = nfsa;
    const {
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
    } = dam;
    return api.post(
      'nfsa',
      {
        dam: {
          docOrigem,
          idContribuinte: idPrestador,
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
        nfsa: {
          idPrestador,
          idTomador,
          aliquotaISS: aliquotaIss,
          municipio,
          uf,
          valorNota: valorNF,
          valorDeducao,
          valorISS,
          valorCalculo: baseCalculo,
          descontoIncodicional,
          pisPercente,
          pisValor,
          confinsPercente,
          confinsValor,
          csllPercente,
          csllValor,
          inssPercente,
          inssValor,
          irPercente,
          irValor
        },
        items
      },
      { cancelToken }
    );
  }

  editNFSA(items, nfsa, dam, id, cancelToken) {
    return api.put(
      `nfsa/${id}`,
      {
        dam: {
          ...dam,
          idContribuinte: nfsa.idPrestador
        },
        nfsa: {
          ...nfsa,
          aliquotaISS: nfsa.aliquotaIss,
          valorNota: nfsa.valorNF,
          valorCalculo: nfsa.baseCalculo
        },
        items
      },
      { cancelToken }
    );
  }
}

export default new Nfsa();
