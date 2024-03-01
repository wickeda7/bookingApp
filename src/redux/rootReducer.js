import { combineReducers } from 'redux';
import staffReducer from './slices/staffSlice';
export default combineReducers({
  staff: staffReducer,
});
