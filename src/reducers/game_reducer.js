import { ActionTypes } from '../actions';

const defaultState = {
  players: [],
};

const GameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, action.payload);
    case ActionTypes.ADD_USER:
      return Object.assign({}, state, state.players.push(action.payload.data.name));
    default:
      return state;
  }
};

export default GameReducer;
