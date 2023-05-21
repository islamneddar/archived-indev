import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserProfileResponse} from '@/types/api/auth';
import UserService from '@/services/user.service';

export const getUserProfileThunk = createAsyncThunk<UserProfileResponse, any>(
  'signup',
  async (accessToken: string, {rejectWithValue}) => {
    try {
      return await UserService.getInstance().getProfileUser(accessToken);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
