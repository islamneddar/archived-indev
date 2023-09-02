import {templateThinkCall} from '@/redux/util';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AiToolCategoryService from '@/services/ai-tools/ai-tool-category.service';
import {GetAllCategoriesAiToolResponse} from '@/types/api/ai-tools/category-ai-tools';

export const getAllCategoriesAiToolsThunk = createAsyncThunk<
  GetAllCategoriesAiToolResponse,
  null
>('getAllCategoriesAiToolsThunk', async (request: any, {rejectWithValue}) => {
  return await templateThinkCall<null, GetAllCategoriesAiToolResponse>({
    request,
    callback: async () => {
      return await AiToolCategoryService.getInstance().getAll();
    },
    rejectWithValue,
    isProtected: false,
  });
});
