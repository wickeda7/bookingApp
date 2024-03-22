import { createSlice } from '@reduxjs/toolkit';
import { getStores, getStoreRelation, getReviews, getStoreBooking } from '../actions/storesAction';
import { users } from '@api/users';
const initialState = {
  stores: [],
  county: null,
  latitude: null,
  longitude: null,
  selectedStore: null,
  storeBooking: null,
  reviews: null,
  isLoading: false,
};

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      const storeId = action.payload.storeId;
      const userId = action.payload.userId;
      const storeIndex = state.stores.findIndex((obj) => obj.id === storeId);
      let store = { ...state.stores[storeIndex] };
      store = { ...store, selected: !store.selected };
      users.updateFavorite(userId, store);
      state.stores[storeIndex] = store;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    setCounty: (state, action) => {
      state.county = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.isLoading = false;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.status = action.error.message;
        state.isLoading = false;
      })
      .addCase(getStoreRelation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreRelation.fulfilled, (state, action) => {
        const data = action.payload.data;
        const storeId = action.payload.storeId;
        const storeIndex = state.stores.findIndex((obj) => obj.id === storeId);
        let store = { ...state.stores[storeIndex] };
        store = { ...store, ...data };
        state.selectedStore = store;
        state.stores[storeIndex] = store;
        state.isLoading = false;
      })
      .addCase(getStoreRelation.rejected, (state, action) => {
        state.status = action.error.message;
        state.isLoading = false;
      })
      .addCase(getStoreBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreBooking.fulfilled, (state, action) => {
        state.storeBooking = action.payload;
        state.isLoading = false;
      })
      .addCase(getStoreBooking.rejected, (state, action) => {
        state.status = action.error.message;
        state.isLoading = false;
      })

      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        const keys = Object.keys(action.payload);
        console.log('action.payload', action.payload);
        console.log('keys', keys);
        state.reviews = null;
        state.isLoading = false;
        // if (keys.length > 0) {

        // } else {
        //   state.reviews = null;
        //   state.isLoading = false;
        // }
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setCounty, setLatitude, setLongitude, setSelectedStore, setFavorite } = storesSlice.actions;

export default storesSlice.reducer;
