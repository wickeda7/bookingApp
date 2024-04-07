import { createSlice } from '@reduxjs/toolkit';
import { getPayrollData } from '@redux/actions/payrollAction';

const initialState = {
  payrollData: [],
  selectedEmployee: null,
  isLoading: false,
  employeePayroll: [],
};

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setEmployeePayroll: (state, action) => {
      state.employeePayroll = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayrollData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayrollData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payrollData = action.payload;
      })
      .addCase(getPayrollData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setSelectedEmployee, setEmployeePayroll } = payrollSlice.actions;
export default payrollSlice.reducer;
