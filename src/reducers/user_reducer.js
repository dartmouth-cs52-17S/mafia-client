import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PLAYERS:
      return Object.assign({}, state, { all: action.payload });
    // case ActionTypes.FETCH_USER:
    //   return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
};

export default UserReducer;
