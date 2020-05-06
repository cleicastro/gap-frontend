import api from './api';

class Dam {
  getDam(cancelToken, params) {
    // const token = sessionStorage.getItem('JWT_Token');
    return api.get(
      'v1/api/dam',
      { params },
      {
        cancelToken
      }
    );
  }
}

export default new Dam();
