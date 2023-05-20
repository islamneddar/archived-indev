import {createAsyncThunk} from '@reduxjs/toolkit';
import {SignupRequest} from '@/types/api/auth';
import AuthService from '@/services/auth.service';

export const signupThunk = createAsyncThunk<any, SignupRequest>(
  'signup',
  async (signupRequest: SignupRequest, {rejectWithValue}) => {
    try {
      const response = await AuthService.getInstance().signup(signupRequest);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
