import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserProfileResponse} from '@/types/api/auth';
import UserService from '@/services/user.service';
import {EventBusFront, EventBusFrontType} from '@/events/event_bus';

export const getUserProfileThunk = createAsyncThunk<UserProfileResponse, any>(
  'getProfileUser',
  async (accessToken: string, {rejectWithValue}) => {
    try {
      return await UserService.getInstance().getProfileUser(accessToken);
    } catch (error: any) {
      if (error.response.status === 401) {
        EventBusFront.dispatch(EventBusFrontType.LOGOUT, {});
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);
