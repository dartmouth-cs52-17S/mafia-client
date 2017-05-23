import { combineReducers } from 'redux';

import UserReducer from './user_reducer';
import GameReducer from './game_reducer';

const rootReducer = combineReducers({
  users: UserReducer,
  game: GameReducer,
});

export default rootReducer;
