import {templateThinkCall} from '@/redux/util';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetAllAiToolRequest,
  GetAllAiToolResponse,
} from '@/types/api/ai-tools/ai-tool';
import {AiToolService} from '@/services/ai-tools/ai-tool.service';

export const getAllAiToolThunk = createAsyncThunk<
  GetAllAiToolResponse,
  GetAllAiToolRequest
>('aiTool/getAll', async (request: GetAllAiToolRequest, {rejectWithValue}) => {
  return await templateThinkCall<GetAllAiToolRequest, GetAllAiToolResponse>({
    request,
    callback: async (request: GetAllAiToolRequest) => {
      return await AiToolService.getInstance().findAll(request);
    },
    rejectWithValue,
    isProtected: false,
  });
});
