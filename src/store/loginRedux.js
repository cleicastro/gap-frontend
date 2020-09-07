import { Auth } from '../services';

const ACTIONS = {
  CREATE: 'USER_CREATE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  USER: 'USER',
  ERROR: 'USER_ERROR',
  CLEAN_USER: 'CLEAN_USER'
};

const INITIAL_STATE = {
  error: null,
  user: null,
  logout: null,
  createUser: null
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return {
        ...state,
        createUser: action.message.data
      };
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.user.data
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        logout: action.message.data
      };
    case ACTIONS.CLEAN_USER:
      return {
        ...state,
        error: null,
        user: null,
        logout: null,
        createUser: null
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export function register(data) {
  return async (dispath) => {
    try {
      const response = await Auth.create({ ...data });
      dispath({
        type: ACTIONS.CREATE,
        message: response
      });
    } catch (error) {
      dispath({
        type: ACTIONS.ERROR,
        error: {
          ...error.response.data,
          status: error.response.status
        }
      });
    }
  };
}

export function logar(data) {
  return async (dispath) => {
    try {
      const response = await Auth.login({ ...data });
      dispath({
        type: ACTIONS.LOGIN,
        user: response
      });
    } catch (error) {
      dispath({
        type: ACTIONS.ERROR,
        error: {
          ...error.response.data,
          status: error.response.status
        }
      });
    }
  };
}

export function logout() {
  return async (dispath) => {
    try {
      const response = await Auth.logout();
      dispath({
        type: ACTIONS.LOGOUT,
        message: response
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanMessgeUser() {
  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.CLEAN_USER
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
}
