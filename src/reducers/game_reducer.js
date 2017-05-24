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
      return Object.assign({}, state, {
        id: action.payload.data.id,
        creator: action.payload.data.creator,
        players: action.payload.data.players,
      });
    case ActionTypes.UPDATE_GAME:
      return Object.assign({}, state, { players: action.payload.players });
    case ActionTypes.ADD_USER:
      return Object.assign({}, state, state.players.push(action.payload.data.name));
    default:
      return state;
  }
};

export default GameReducer;
