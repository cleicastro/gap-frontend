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
}

export default new Contribuinte();
