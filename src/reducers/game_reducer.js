import { ActionTypes } from '../actions';

const defaultState = {
  id: 'unassigned',
  players: [],
  creator: '',
};

const GameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_GAME:
      state.players.push(action.payload.data.creator);
      return Object.assign({}, state, { id: action.payload.data.id, creator: action.payload.data.creator });
    case ActionTypes.FETCH_GAME:
    case ActionTypes.UPDATE_PLAYERS:
      return Object.assign({}, state, action.payload);
    case ActionTypes.ADD_USER:
      return Object.assign({}, state, state.players.push(action.payload.data.name));
    default:
      return state;
  }
};

export default GameReducer;
