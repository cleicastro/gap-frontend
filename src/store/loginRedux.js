const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  USER: 'USER',
  ERROR: 'USER_ERROR'
};

const INITIAL_STATE = {
  error: null,
  user: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.user.data
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null
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

export function logar() {
  return false;
}
