import api from './api';

class Dashboard {
  getDashboardIndex(cancelToken) {
    return api.get('home', {}, { cancelToken });
  }
}

export default new Dashboard();
