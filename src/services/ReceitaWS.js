import api from './api';

class ReceitaWS {
  getReceitaWS(cnpj, cancelToken) {
    const token = process.env.REACT_APP_TOKEN_API_RECEITAWS;
    return api.get(
      `https://www.receitaws.com.br/v1/cnpj//${cnpj}`,
      {},
      {
        cancelToken,
        headers: {
          Authorization: token,
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  getConsultaGuru(cnpj, cancelToken) {
    return api.get(
      `https://api.nfse.io/LegalEntities/Basicinfo/taxNumber/${cnpj}`,
      {},
      {
        cancelToken
      }
    );
  }

  getConsultaCNPJA(cnpj, cancelToken) {
    const token = process.env.REACT_APP_TOKEN_API_CNPJA;
    return api.get(`https://api.cnpja.com.br/companies/${cnpj}`, {
      cancelToken,
      headers: {
        Authorization: token
      }
    });
  }
}

export default new ReceitaWS();
