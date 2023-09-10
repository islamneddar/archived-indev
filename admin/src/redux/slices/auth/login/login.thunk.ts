import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginRequest, LoginResponse} from '@/types/api/auth';
import AuthService from '@/services/auth.service';

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest>(
  'login',
  async (loginRequest: LoginRequest, {rejectWithValue}) => {
    try {
      const response = await AuthService.getInstance().login(
        loginRequest.email,
        loginRequest.password,
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
