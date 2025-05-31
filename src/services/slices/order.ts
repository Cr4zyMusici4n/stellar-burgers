import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrdersState = {
  orderModalData: TOrder | null;
  data: TOrder[];
  singleOrder: TOrder | null;
  isLoading: boolean;
  orderRequest: boolean;
};

export const initialState: TOrdersState = {
  orderModalData: null,
  data: [],
  singleOrder: null,
  isLoading: false,
  orderRequest: false
};

export const fetchOrders = createAsyncThunk(
  'order/getAll',
  async () => await getOrdersApi()
);

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (ingredientId: string[]) => orderBurgerApi(ingredientId)
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderRequest(state) {
      state.orderRequest = false;
    },
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderModalData: (state) => state.orderModalData,
    getAllOrders: (state) => state.data,
    getIsLoading: (state) => state.isLoading,
    getOrderRequest: (state) => state.orderRequest,
    getSingleOrder: (state) => state.singleOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });

    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.order;
        state.data.push(action.payload.order);
        state.orderRequest = false;
      });

    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload;
      });
  }
});

export default orderSlice.reducer;
export const { clearOrderModalData, clearOrderRequest } = orderSlice.actions;
