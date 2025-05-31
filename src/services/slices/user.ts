import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

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
    throw new Error(error.message);
  }
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    const { accessToken, refreshToken } = response;

    localStorage.setItem('refreshToken', String(refreshToken));
    setCookie('accessToken', String(accessToken));

    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => {
    const response = await updateUserApi(data);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectError: (state) => state.error,
    selectUser: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuth = true;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
        state.isAuth = true;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
        state.isAuth = true;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
        state.isAuth = true;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuth = false;
      state.data = null;
    });
  }
});

export default userSlice.reducer;
