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
        const { data, subtotal, tips, specialistId, invoiceIds } = action.payload.reduce(
          (acc, item) => {
            const { title, subtotal: isub, tips: itips, total: itotal, data } = item;
            const ids = data.reduce((acc, item) => {
              if (item.payroll === null) {
                acc.push(item.id);
              }
              return acc;
            }, []);
            acc.invoiceIds = [...acc.invoiceIds, ...ids];
            const specialistId = data[0].specialist.id;
            acc.subtotal += isub;
            acc.tips += itips;
            acc.specialistId = specialistId;
            acc.data.push({ subtotal: isub, date: title, tips: itips, specialistId });
            return acc;
          },
          { data: [], subtotal: 0, tips: 0, specialistId: null, invoiceIds: [] }
        );
        state.employeePayroll = data;
        state.payrollSummary = { subtotal, tips, specialistId, invoiceIds };
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
