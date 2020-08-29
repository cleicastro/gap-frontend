import api from './api';

class Contribuinte {
  getContribuinte(
    {
      id,
      doc,
      nome,
      tipo,
      contribuinte,
      enderecoCidade,
      limit,
      order,
      sort,
      page
    },
    cancelToken
  ) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      'contribuinte',
      {
        params: {
          id,
          doc,
          nome,
          tipo,
          contribuinte,
          enderecoCidade,
          limit,
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
      tipoConta,
      inscricaoMunicipal,
      nomeFantasia,
      atividadePrincipal,
      atividadeSecundariaI,
      atividadeSecundariaII
    },
    cancelToken
  ) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.post(
      'contribuinte',
      {
        tipo,
        doc,
        nome,
        docEstadual,
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
        tipoConta,
        inscricaoMunicipal,
        nomeFantasia,
        atividadePrincipal,
        atividadeSecundariaI,
        atividadeSecundariaII
      },
      {
        cancelToken
      }
    );
  }

  updateContribuinte(id, params, cancelToken) {
    return api.put(
      `contribuinte/${id}`,
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
