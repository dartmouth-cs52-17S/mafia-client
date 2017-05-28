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
      console.log('creating user');
      return Object.assign({}, state, state.all.push(action.payload));
    // case ActionTypes.FETCH_USER:
    //   return Object.assign({}, state, { user: action.payload });
    case ActionTypes.KILL_PLAYER:
      console.log('it reaches here!');
      return Object.assign({}, state, { status: false });
    case ActionTypes.HEAL_PLAYER:
      console.log('it reaches here!');
      return Object.assign({}, state, { status: true });
    default:
      return state;
  }
};

export default UserReducer;
