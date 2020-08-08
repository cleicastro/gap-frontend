import api from './api';

class TabelaIR {
  getTabelaIR(cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      'tabela-ir',
      {},
      {
        cancelToken
      }
    );
  }

  getTabelaIRCalcImposto(baseCalculo, cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      'tabela-ir',
      {
        params: {
          baseCalculo
        }
      },
      {
        cancelToken
      }
    );
  }
}

export default new TabelaIR();
