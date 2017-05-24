import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
};

// const UserReducer = (state = defaultState, action) => {
const PlayerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_PLAYERS:
      return Object.assign({}, state, { all: action.payload });
    default:
      return state;
  }
};

export default PlayerReducer;
