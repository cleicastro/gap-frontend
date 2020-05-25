import api from './api';

class Contribuinte {
  getContribuinte(
    { id, doc, nome, tipo, contribuinte, enderecoCidade, order, sort, page },
    cancelToken
  ) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      'v1/api/contribuinte',
      {
        params: {
          id,
          doc,
          nome,
          tipo,
          contribuinte,
          enderecoCidade,
          sort: order ? `${order},${sort ? 'asc' : 'desc'}` : null,
          page
        }
      },
      {
        cancelToken
      }
    );
  }

  salveContribuinte(
    {
      tipo,
      doc,
      nome,
      docEstadual,
      inscricaoMunicipal,
      docEmissao,
      docOrgao,
      telefone,
      email,
      cep,
      uf,
      cidade,
      endereco,
      numero,
      complemento,
      bairro,
      banco,
      agencia,
      conta,
      variacao,
      tipoConta
    },
    cancelToken
  ) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.post(
      'v1/api/contribuinte',
      {
        tipo,
        doc,
        nome,
        docEstadual,
        inscricaoMunicipal,
        docEmissao,
        docOrgao,
        telefone,
        email,
        cep,
        uf,
        cidade,
        endereco,
        numero,
        complemento,
        bairro,
        banco,
        agencia,
        conta,
        variacao,
        tipoConta
      },
      {
        cancelToken
      }
    );
  }

  updateContribuinte(id, params, cancelToken) {
    return api.put(
      `v1/api/contribuinte/${id}`,
      {
        ...params
      },
      {
        cancelToken
      }
    );
  }
}

export default new Contribuinte();
