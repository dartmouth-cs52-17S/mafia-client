import { ActionTypes } from '../actions';

const defaultState = {
  authenticated: false,
};

const AuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true });
    default:
      return state;
  }
};

export default AuthReducer;
