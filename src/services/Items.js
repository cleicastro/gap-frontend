import api from './api';

class Items {
  deleteItem(id, cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.delete(
      `item/${id}`,
      {},
      {
        cancelToken
      }
    );
  }
}

export default new Items();
