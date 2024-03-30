import { createSlice } from '@reduxjs/toolkit';
import {
  getStoreById,
  updateUser,
  updateEmail,
  uploadImage,
  unverifiedStaff,
  createAccessCode,
  getInvoiceByDate,
} from '../actions/staffAction';

const initialState = {
  staffData: [],
  newStaff: [],
  invoiceByDate: [],
  weeklyTips: 0,
  weeklyTotal: 0,
  totalNewStaff: 0,
  isLoading: false,
  status: null,
};

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    selectRow: (state, action) => {
      const id = action.payload.id;
      const type = action.payload.type;
      if (type === 'unverified') {
        state.newStaff.map((i) => {
          if (i.id === id) {
            i.selected = !i.selected;
          }
          return i;
        });
      } else {
        state.staffData.map((i) => {
          if (i.id === id) {
            i.selected = !i.selected;
          }
          return i;
        });
      }
    },
    resetSeletedRow: (state, action) => {
      if (action.payload === 'staff') {
        state.staffData = state.staffData.map((i) => {
          delete i.selected;
          return i;
        });
      } else {
        state.newStaff.map((i) => {
          delete i.selected;
          return i;
        });
      }
    },
    updateStaffState: (state, action) => {
      const data = action.payload.data;
      const method = action.payload.method;
      if (method === 'put') {
        state.staffData = state.staffData.map((i) => {
          if (i.id === data.id) {
            return data;
          }
          return i;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreById.fulfilled, (state, action) => {
        state.staffData = action.payload;
        state.isLoading = false;
      })
      .addCase(getStoreById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStoreById.rejected, (state, action) => {
        state.isLoading = false;
        state.staffData = [];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        const data = action.payload.data;
        const id = action.payload.id;
        if (userId) {
          state.staffData = state.staffData.map((item) => {
            if (item.id === userId) {
              const userInfo = { ...item.userInfo, ...data };
              return { ...item, userInfo };
            }
            return item;
          });
        }
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createAccessCode.fulfilled, (state, action) => {
        const data = action.payload.data;
        const method = action.payload.method;
        if (method === 'PUT') {
          state.newStaff = state.newStaff.map((item) => {
            if (item.id === data.id) {
              return { ...item, ...data };
            }
            return item;
          });
        } else if (method === 'POST') {
          state.newStaff.unshift(data);
          state.totalNewStaff = state.totalNewStaff + 1;
        } else if (method === 'DELETE') {
          state.newStaff = state.newStaff.filter((i) => !data.includes(i.id));
          state.totalNewStaff = state.totalNewStaff - data.length;
        }

        state.isLoading = false;
      })
      .addCase(createAccessCode.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAccessCode.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        const userId = action.payload.id;
        const data = action.payload.data;
        state.staffData = state.staffData.map((item) => {
          if (item.id === userId) {
            return { ...item, email: data.email };
          }
          return item;
        });

        state.isLoading = false;
      })
      .addCase(updateEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        const newImage = action.payload.newImage;
        const imageType = action.payload.imageType;
        if (!userId) {
          state.status = 'fulfilled';
          state.isLoading = false;
          return;
        }
        state.staffData = state.staffData.map((item) => {
          if (item.id === userId) {
            let temp = { ...item, userInfo: { ...item.userInfo } };
            if (imageType === 'profileImg') {
              temp.userInfo.profileImg = newImage;
            } else {
              let images = temp.userInfo.images || [];
              images.unshift(newImage);
              temp.userInfo.images = images;
            }
            return temp;
          }
          return item;
        });

        state.status = 'fulfilled';
        state.isLoading = false;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
      })
      .addCase(unverifiedStaff.fulfilled, (state, action) => {
        state.newStaff = action.payload;
        state.totalNewStaff = action.payload.length;
        state.isLoading = false;
      })
      .addCase(unverifiedStaff.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(unverifiedStaff.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getInvoiceByDate.fulfilled, (state, action) => {
        state.weeklyTips = action.payload.tips;
        state.weeklyTotal = action.payload.total;
        state.invoiceByDate = action.payload.agendaItems;
        state.isLoading = false;
      })
      .addCase(getInvoiceByDate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInvoiceByDate.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { selectRow, resetSeletedRow, updateStaffState } = staffSlice.actions;

export default staffSlice.reducer;
