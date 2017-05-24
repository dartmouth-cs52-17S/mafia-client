import { ActionTypes } from '../actions';

// const UserReducer = (state = defaultState, action) => {
const GameReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, action.payload);
    case ActionTypes.KILL_USER:
      return Object.assign({}, state, action.payload);
    // case ActionTypes.FETCH_USER:
    //   return Object.assign({}, state, { user: action.payload });
    case ActionTypes.CREATE_PLAYERS:
      return Object.assign({}, state, { players: action.payload });
    default:
      return state;
  }
};

export default GameReducer;
