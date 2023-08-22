import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  FollowSourceBlogRequest,
  FollowSourceBlogResponse,
} from '@/types/api/blogs/source_blog';
import SourceBlogService from '@/services/blogs/source_blog.service';
import {templateThinkCall} from '@/redux/util';

export const followSourceBlogThunk = createAsyncThunk<
  FollowSourceBlogResponse,
  FollowSourceBlogRequest
>(
  'followSourceBlogThunk',
  async (request: FollowSourceBlogRequest, {rejectWithValue}) => {
    return await templateThinkCall<
      FollowSourceBlogRequest,
      FollowSourceBlogResponse
    >({
      request,
      callback: async (request: FollowSourceBlogRequest) => {
        return await SourceBlogService.getInstance().followSourceBlog(request);
      },
      rejectWithValue,
    });
  },
);
