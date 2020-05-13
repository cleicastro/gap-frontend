import api from './api';

class Receita {
  getReceita(cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get('v1/api/receita', {
      cancelToken
    });
  }
}

export default new Receita();
