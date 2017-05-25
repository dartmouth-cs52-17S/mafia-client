import { ActionTypes } from '../actions';

const defaultState = {
  authenticated: false,
};

const AuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, { authenticated: false });
    default:
      return state;
  }
};

export default AuthReducer;
