import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
  player: {},
};

// const UserReducer = (state = defaultState, action) => {
const PlayerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_PLAYERS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.FETCH_PLAYERS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.FETCH_PLAYER:
      return Object.assign({}, state, { player: action.payload });
    // case ActionTypes.KILL_PLAYER:
    //   return Object.assign({}, state, { status: false });
    // case ActionTypes.HEAL_PLAYER:
    //   return Object.assign({}, state, { status: true });
    // case ActionTypes.GUESS_MAFIA:
    //   return Object.assign({}, state, { player: action.payload });
    default:
      return state;
  }
};

export default PlayerReducer;
