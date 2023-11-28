import {createAsyncThunk} from '@reduxjs/toolkit';

import SourceBlogService from '@/infra/web-services/services/blogs/source_blog.service';
import {templateThinkCall} from '@/redux/util';
import {
  GetAllTypeSourceBlogRequest,
  GetAllTypeSourceBlogResponse,
} from '@/infra/web-services/types/blogs/source_blog';

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
