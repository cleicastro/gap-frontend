import api from './api';

class Auth {
  login({ email, password }, cancelToken) {
    return api.post(
      'auth/login',
      {
        email,
        password
      },
      {
        cancelToken
      }
    );
  }

  logout() {
    const user = JSON.parse(localStorage.getItem('app-token'));
    return api.post('auth/logout', null, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  create({ name, email, type, password, passwordConfirmation }) {
    const user = JSON.parse(localStorage.getItem('app-token'));
    return api.post(
      'auth/register',
      {
        name,
        email,
        type,
        password,
        password_confirmation: passwordConfirmation
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );
  }
}

export default new Auth();
