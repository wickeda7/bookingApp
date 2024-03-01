import { createSlice } from '@reduxjs/toolkit';
import { getStoreById, updateUser, updateEmail, uploadImage } from '../actions/staffAction';
import { use } from 'i18next';

const initialState = {
  staffData: [],
  isLoading: false,
  status: null,
};

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    selectRow: (state, action) => {
      state.staffData.map((i) => {
        if (i.id === action.payload) {
          i.selected = !i.selected;
        }
        return i;
      });
    },
    resetSeletedRow: (state) => {
      state.staffData.map((i) => {
        delete i.selected;
        return i;
      });
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
        state.staffData = state.staffData.map((item) => {
          if (item.id === userId) {
            const userInfo = { ...item.userInfo, ...data };
            return { ...item, userInfo };
          }
          return item;
        });

        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { selectRow, resetSeletedRow, updateStaffState } = staffSlice.actions;

export default staffSlice.reducer;
