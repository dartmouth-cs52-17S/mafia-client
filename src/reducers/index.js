import { combineReducers } from 'redux';

import UserReducer from './user_reducer';
import GameReducer from './game_reducer';
import AuthReducer from './auth_reducer';
import PlayerReducer from './player_reducer';

const rootReducer = combineReducers({
  users: UserReducer,
  game: GameReducer,
  auth: AuthReducer,
  players: PlayerReducer,
});

export default rootReducer;
