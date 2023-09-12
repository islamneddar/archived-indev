import {createAsyncThunk} from '@reduxjs/toolkit';
import {AdminProfileResponse} from '@/types/api/auth';
import {EventBusFront, EventBusFrontType} from '@/events/event_bus';
import AdminService from '@/service/admin.service';
import {templateThinkCall} from '@/redux/util';
import {CreateAiToolRequest} from '@/types/api/ai-tool';
import {AiToolService} from '@/service/ai-tool.service';

export const getAdminProfileThunk = createAsyncThunk<AdminProfileResponse, any>(
  'getProfileUser',
  async (accessToken: string, {rejectWithValue}) => {
    return await templateThinkCall<string, any>({
      request: accessToken,
      callback: async (request: string) => {
        return await AdminService.getInstance().getAdminProfile(request);
      },
      rejectWithValue: rejectWithValue,
      isProtected: true,
    });
  },
);
