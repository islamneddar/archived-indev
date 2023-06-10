import {createAsyncThunk} from '@reduxjs/toolkit';

import SourceBlogService from '@/services/source_blog.service';
import {templateThinkCall} from '@/redux/util';
import {
  GetAllTypeSourceBlogRequest,
  GetAllTypeSourceBlogResponse,
} from '@/types/api/source_blog';

export const getAllSourceBlogTypesThunk = createAsyncThunk<
  GetAllTypeSourceBlogResponse,
  GetAllTypeSourceBlogRequest
>(
  'getAllSourceBlogTypesThunk',
  async (request: GetAllTypeSourceBlogRequest, {rejectWithValue}) => {
    return await templateThinkCall<
      GetAllTypeSourceBlogRequest,
      GetAllTypeSourceBlogResponse
    >({
      request,
      callback: async (request: GetAllTypeSourceBlogRequest) => {
        return await SourceBlogService.getInstance().getAllTypesSourceBlog(
          request,
        );
      },
      rejectWithValue,
    });
  },
);
