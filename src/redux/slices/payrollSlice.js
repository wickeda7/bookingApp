import { createSlice } from '@reduxjs/toolkit';
import { getPayrollData } from '@redux/actions/payrollAction';

const initialState = {
  payrollData: [],
  selectedEmployee: null,
  isLoading: false,
  employeePayroll: [],
  payrollSummary: {},
};

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setEmployeePayroll: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        const { data, subtotal, tips, specialistId } = action.payload.reduce(
          (acc, item) => {
            const { title, subtotal: isub, tips: itips, total: itotal, data } = item;
            const specialistId = data[0].specialist.id;
            acc.subtotal += isub;
            acc.tips += itips;
            acc.specialistId = specialistId;
            acc.data.push({ subtotal: isub, date: title, tips: itips, specialistId });
            return acc;
          },
          { data: [], subtotal: 0, tips: 0, specialistId: null }
        );
        state.employeePayroll = data;
        state.payrollSummary = { subtotal, tips, specialistId };
      } else {
        state.employeePayroll2 = [];
      }
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
