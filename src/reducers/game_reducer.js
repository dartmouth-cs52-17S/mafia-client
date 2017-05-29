import { ActionTypes } from '../actions';

const initialState = {
  id: 'unassigned',
  players: [],
  creator: '',
  stage: 0,
  winner: '',
};

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_GAME:
      return Object.assign({}, state, {
        id: action.payload.data.id,
        creator: action.payload.data.creator,
        players: action.payload.data.players,
      });
    case ActionTypes.UPDATE_GAME:
      if (state.players === action.payload) {
        return state;
      } else {
        return Object.assign({}, state, { players: action.payload.players });
      }
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, action.payload);
    case ActionTypes.ADD_USER:
      return Object.assign({}, state, state.players.push(action.payload.data.name));
    case ActionTypes.UPDATE_STAGE:
      return Object.assign({}, state, { stage: action.payload.data.currentGameStage });
    case ActionTypes.DECLARE_WINNER:
      return Object.assign({}, state, { winner: action.payload });
    default:
      return state;
  }
};

export default GameReducer;
