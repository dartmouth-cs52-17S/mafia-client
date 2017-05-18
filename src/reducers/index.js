import { combineReducers } from 'redux';

import UserReducer from './user_reducer';

const rootReducer = combineReducers({
  users: UserReducer,
});

export default rootReducer;
