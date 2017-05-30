import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
  status: true,
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.CREATE_USER:
      return Object.assign({}, state, state.all.push(action.payload));
    default:
      return state;
  }
};

export default UserReducer;
