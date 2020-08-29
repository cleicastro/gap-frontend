import api from './api';

// const token = process.env.REACT_APP_TOKEN_API_RECEITAWS;
class ReceitaWS {
  getReceitaWS(cnpj, cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      `https://www.receitaws.com.br/v1/cnpj//${cnpj}`,
      {},
      {
        cancelToken,
        headers: {
          Authorization: `Bearer 921a58269c1e1dba45673b20925df4189b6ca04c41c601b48eeb098df04c75b8`,
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
    return api.get(`https://api.cnpja.com.br/companies/${cnpj}`, {
      cancelToken,
      headers: {
        Authorization: `d6bcf87c-e7aa-4512-bbb4-17c9816d0864-631f6afb-ef35-4205-9f32-fcf9b7df147b`
      }
    });
  }
}

export default new ReceitaWS();
