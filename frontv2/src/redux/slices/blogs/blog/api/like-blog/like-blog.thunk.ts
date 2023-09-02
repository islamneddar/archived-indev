import BlogService from '@/services/blogs/blog.service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {templateThinkCall} from '@/redux/util';
import {LikeBlogRequest, LikeBlogResponse} from '@/types/api/blogs/blog';

export const likeBlogThunk = createAsyncThunk<
  LikeBlogResponse,
  LikeBlogRequest
>('likeBlogThunk', async (request: LikeBlogRequest, {rejectWithValue}) => {
  return await templateThinkCall<LikeBlogRequest, LikeBlogResponse>({
    request,
    callback: async (request: LikeBlogRequest) => {
      return await BlogService.getInstance().likeBlog(request);
    },
    rejectWithValue,
    isProtected: true,
  });
});
