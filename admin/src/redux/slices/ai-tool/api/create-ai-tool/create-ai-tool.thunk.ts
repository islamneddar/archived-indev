import {createAsyncThunk} from '@reduxjs/toolkit';
import {templateThinkCall} from '@/redux/util';
import {CreateAiToolRequest} from '@/types/api/ai-tool';
import {AiToolService} from '@/service/ai-tool.service';

export const createAiToolThunk = createAsyncThunk<any, CreateAiToolRequest>(
  'aiTool/createAiTool',
  async (request: CreateAiToolRequest, {rejectWithValue}) => {
    return await templateThinkCall<CreateAiToolRequest, any>({
      request: request,
      callback: async (request: CreateAiToolRequest) => {
        return await AiToolService.getInstance().create(request);
      },
      rejectWithValue: rejectWithValue,
    });
  },
);
