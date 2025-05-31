import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchFeed = createAsyncThunk('feed/getAll', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedInfo: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    })
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export default feedSlice.reducer;
