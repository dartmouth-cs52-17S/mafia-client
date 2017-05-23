import { ActionTypes } from '../actions';

const defaultState = {
  all: [],
  // user: {},
};

// const UserReducer = (state = defaultState, action) => {
const GameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, { all: action.payload });
    // case ActionTypes.FETCH_USER:
    //   return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
};

export default GameReducer;
