import { createSlice } from '@reduxjs/toolkit';
import { getPayrollData, getStaffPayrollData, createPayroll, updatePayroll } from '@redux/actions/payrollAction';

const initialState = {
  payrollData: [],
  selectedEmployee: null,
  isLoading: false,
  employeePayroll: [],
  payrollSummary: null,
  staffPayroll: null,
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
        const {
          data,
          subtotal,
          tips,
          specialistId,
          invoiceIds,
          signature,
          payrollId,
          payrollCreatedAt,
          paidDate,
          paid,
        } = action.payload.reduce(
          (acc, item) => {
            const { title, subtotal: isub, tips: itips, total: itotal, data } = item;
            const ids = data.reduce((acc2, item) => {
              if (item.payroll === null) {
                acc2.push(item.id);
              } else {
                acc.payrollCreatedAt = item.payroll.createdAt;
                acc.paidDate = item.payroll.paidDate;
                acc.paid = item.payroll.paid;
                acc.payrollId = item.payroll.id;
                if (item.payroll.signature) {
                  if (item.payroll.signature.data) {
                    acc.signature = item.payroll.signature.data.attributes.url;
                  } else {
                    acc.signature = item.payroll.signature.url;
                  }
                }
              }
              return acc2;
            }, []);
            acc.invoiceIds = [...acc.invoiceIds, ...ids];
            const specialistId = data[0].specialist.id;
            acc.subtotal += isub;
            acc.tips += itips;
            acc.specialistId = specialistId;
            acc.data.push({ subtotal: isub, date: title, tips: itips, specialistId });
            return acc;
          },
          {
            data: [],
            subtotal: 0,
            tips: 0,
            specialistId: null,
            invoiceIds: [],
            signature: null,
            payrollId: null,
            payrollCreatedAt: null,
            paidDate: null,
            paid: null,
          }
        );
        state.employeePayroll = data;
        state.payrollSummary = {
          subtotal,
          tips,
          specialistId,
          invoiceIds,
          signature,
          payrollId,
          payrollCreatedAt,
          paidDate,
          paid,
        };
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
      })
      .addCase(getStaffPayrollData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaffPayrollData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staffPayroll = action.payload;
      })
      .addCase(getStaffPayrollData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPayroll.pending, (state) => {})
      .addCase(createPayroll.fulfilled, (state, action) => {
        const { id, attributes } = action.payload.data;
        const specialistId = attributes.specialistId;
        const payroll = { ...attributes, id };
        let payrollData = state.payrollData;
        let specialistData = payrollData[specialistId];
        specialistData = specialistData.map((item) => {
          return { ...item, payroll };
        });
        payrollData[specialistId] = specialistData;
        state.payrollData = payrollData;

        let payrollSummary = state.payrollSummary;
        payrollSummary = { ...payrollSummary, invoiceIds: [], payrollId: id, payrollCreatedAt: attributes.createdAt };
        state.payrollSummary = payrollSummary;
      })
      .addCase(createPayroll.rejected, (state) => {})
      .addCase(updatePayroll.pending, (state) => {})
      .addCase(updatePayroll.fulfilled, (state, action) => {
        const { id, attributes } = action.payload.data;
        const specialistId = attributes.specialistId;
        const payroll = { ...attributes, id };
        let payrollData = state.payrollData;
        let specialistData = payrollData[specialistId];
        specialistData = specialistData.map((item) => {
          return { ...item, payroll };
        });
        payrollData[specialistId] = specialistData;
        state.payrollData = payrollData;

        let payrollSummary = state.payrollSummary;
        payrollSummary = { ...payrollSummary, paidDate: attributes.paidDate, paid: attributes.paid };
        state.payrollSummary = payrollSummary;
      })
      .addCase(updatePayroll.rejected, (state) => {});
  },
});
export const { setSelectedEmployee, setEmployeePayroll } = payrollSlice.actions;
export default payrollSlice.reducer;
