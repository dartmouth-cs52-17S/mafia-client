import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
  player: {},
  status: true,
  voteCount: 0,
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
    case ActionTypes.KILL_PLAYER:
      return Object.assign({}, state, { status: false });
    case ActionTypes.HEAL_PLAYER:
      return Object.assign({}, state, { status: true });
    case ActionTypes.GUESS_MAFIA:
      return Object.assign({}, state, { player: action.payload });
    case ActionTypes.VOTE_KILL:
      return Object.assign({}, state, { $inc: { voteCount: 1 } });
    default:
      return state;
  }
};

export default PlayerReducer;
