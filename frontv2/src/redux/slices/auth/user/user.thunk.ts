import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserProfileResponse} from '@/types/api/auth';
import UserService from '@/services/user.service';
import {EventBusFront, EventBusFrontType} from '@/infra/events/event_bus';

export const getUserProfileThunk = createAsyncThunk<UserProfileResponse, any>(
  'getProfileUser',
  async (accessToken: string, {rejectWithValue}) => {
    try {
      return await UserService.getInstance().getProfileUser(accessToken);
    } catch (error: any) {
      EventBusFront.dispatch(EventBusFrontType.LOGOUT, {});
      return rejectWithValue(error.response.status);
    }
  },
);
