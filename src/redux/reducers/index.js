import { combineReducers } from 'redux';
import userReducer from './user.reducer';

// combine reducer for further addition
const rootReducer = combineReducers({ users: userReducer });

export default rootReducer;
