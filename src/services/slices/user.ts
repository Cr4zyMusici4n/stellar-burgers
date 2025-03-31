import { getUserApi, loginUserApi, TLoginData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type UserState = {
  data: TUser | null;
  isAuth: boolean;
  error?: string;
  isLoading: boolean;
};

const initialState: UserState = {
  data: null,
  isAuth: false,
  isLoading: false
};

export const fetchUser = createAsyncThunk('user/getUser', async () => {
  try {
    const response = await getUserApi();
    return response.user;
  } catch (error: any) {
    return error.message;
  }
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuth = true;
      });
  }
});

export default userSlice.reducer;
