import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetBlogsBySearchRequest, GetBlogsResponse} from '@/types/api/blog';
import {templateThinkCall} from '@/redux/util';
import BlogService from '@/services/blog.service';

export const getAllBlogBySearchThunk = createAsyncThunk<
  GetBlogsResponse,
  GetBlogsBySearchRequest
>(
  'getAllBlogBySearchThunk',
  async (request: GetBlogsBySearchRequest, {rejectWithValue}) => {
    return await templateThinkCall<GetBlogsBySearchRequest, GetBlogsResponse>({
      request,
      callback: async (request: GetBlogsBySearchRequest) => {
        return await BlogService.getInstance().getAllBySearch(request);
      },
      rejectWithValue,
      isProtected: true,
    });
  },
);
