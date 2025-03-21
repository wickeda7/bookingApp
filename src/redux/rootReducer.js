import { combineReducers } from 'redux';
import staffReducer from './slices/staffSlice';
import bookingReducer from './slices/bookingSlice';
import adminHomeReducer from './slices/adminHomeSlice';
import storesReducer from './slices/storesSlice';
import payrollReducer from './slices/payrollSlice';
import batchesReducer from './slices/batchesSlice';

export default combineReducers({
  staff: staffReducer,
  booking: bookingReducer,
  adminHome: adminHomeReducer,
  stores: storesReducer,
  payroll: payrollReducer,
  batches: batchesReducer,
});
