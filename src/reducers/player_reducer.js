import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
  player: {},
<<<<<<< HEAD
=======
  deadMan: 'Nobody! (what nice villagers)',
>>>>>>> b0b3070919831db5a854d96a4a8f1830346b367d
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
<<<<<<< HEAD
    // case ActionTypes.KILL_PLAYER:
    //   return Object.assign({}, state, { status: false });
    // case ActionTypes.HEAL_PLAYER:
    //   return Object.assign({}, state, { status: true });
    // case ActionTypes.GUESS_MAFIA:
    //   return Object.assign({}, state, { player: action.payload });
=======
    case ActionTypes.VOTES_COUNTED:
      return Object.assign({}, state, { deadMan: action.payload });
>>>>>>> b0b3070919831db5a854d96a4a8f1830346b367d
    default:
      return state;
  }
};

export default PlayerReducer;
