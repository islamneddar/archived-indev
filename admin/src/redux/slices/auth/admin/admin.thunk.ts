import {createAsyncThunk} from '@reduxjs/toolkit';
import {AdminProfileResponse} from '@/types/api/auth';
import {EventBusFront, EventBusFrontType} from '@/events/event_bus';
import AdminService from '@/service/admin.service';

export const getAdminProfileThunk = createAsyncThunk<AdminProfileResponse, any>(
  'getProfileUser',
  async (accessToken: string, {rejectWithValue}) => {
    try {
      return await AdminService.getInstance().getAdminProfile(accessToken);
    } catch (error: any) {
      EventBusFront.dispatch(EventBusFrontType.LOGOUT, {});
      return rejectWithValue(error.response.status);
    }
  },
);
