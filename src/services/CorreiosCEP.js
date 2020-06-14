import api from './api';

class CorreiosCEP {
  RequestCEP(cep, cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      `https://viacep.com.br/ws/${cep}/json/`,
      {},
      {
        cancelToken
      }
    );
  }
}

export default new CorreiosCEP();
