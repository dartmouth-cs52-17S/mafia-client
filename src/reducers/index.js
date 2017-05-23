import { combineReducers } from 'redux';

import UserReducer from './user_reducer';
import GameReducer from './game_reducer';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  users: UserReducer,
  game: GameReducer,
  auth: AuthReducer,
});

export default rootReducer;
