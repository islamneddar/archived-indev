import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserProfileResponse} from '@/types/api/auth';
import AuthService from '@/services/auth.service';

export const getUserProfileThunk = createAsyncThunk<UserProfileResponse, any>(
  'signup',
  async (accessToken: string, {rejectWithValue}) => {
    try {
      const response = await UserService.getInstance().getProfileUser(
        signupRequest,
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
