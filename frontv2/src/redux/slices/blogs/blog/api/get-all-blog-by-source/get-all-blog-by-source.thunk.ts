import BlogService from '@/infra/web-services/services/blogs/blog.service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {templateThinkCall} from '@/redux/util';
import {
  GetAllBlogByPaginationForSourceBlogIdRequest,
  GetBlogsResponse,
} from '@/infra/web-services/types/blogs/blog';

export const getAllBlogBySourceBlogRequestThunk = createAsyncThunk<
  GetBlogsResponse,
  GetAllBlogByPaginationForSourceBlogIdRequest
>(
  'getAllBlogsBySourceThunk',
  async (
    request: GetAllBlogByPaginationForSourceBlogIdRequest,
    {rejectWithValue},
  ) => {
    return await templateThinkCall<
      GetAllBlogByPaginationForSourceBlogIdRequest,
      GetBlogsResponse
    >({
      request,
      callback: async (
        request: GetAllBlogByPaginationForSourceBlogIdRequest,
      ) => {
        return await BlogService.getInstance().getAllBlogWithPaginationAndSourceBlog(
          request,
        );
      },
      rejectWithValue,
      isProtected: true,
    });
  },
);
