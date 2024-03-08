import { combineReducers } from 'redux';
import staffReducer from './slices/staffSlice';
import bookingReducer from './slices/bookingSlice';
export default combineReducers({
  staff: staffReducer,
  booking: bookingReducer,
});
