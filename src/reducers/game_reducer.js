import { ActionTypes } from '../actions';

const initialState = {
  id: 'unassigned',
  players: [],
  creator: '',
  stage: 0,
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
      console.log(state.players);
      console.log(typeof state.players);
      console.log(action.payload);
      console.log(typeof action.payload);
      if (state.players === action.payload) {
        console.log('hi');
        return state;
      } else {
        return Object.assign({}, state, { players: action.payload.players });
      }
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, action.payload);
    case ActionTypes.ADD_USER:
      return Object.assign({}, state, state.players.push(action.payload.data.name));
    case ActionTypes.ADVANCE_STAGE:
      return Object.assign({}, state, { stage: state.stage + 1 });
    case ActionTypes.UPDATE_STAGE:
      return Object.assign({}, state, { stage: action.payload });
    default:
      return state;
  }
};

export default GameReducer;
