import { combineReducers } from 'redux';
import staffReducer from './slices/staffSlice';
import bookingReducer from './slices/bookingSlice';
import adminHomeReducer from './slices/adminHomeSlice';
export default combineReducers({
  staff: staffReducer,
  booking: bookingReducer,
  adminHome: adminHomeReducer,
});
