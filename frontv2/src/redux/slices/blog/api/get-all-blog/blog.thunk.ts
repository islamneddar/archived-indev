import {GetAllBlogRequest, GetBlogsResponse} from '@/types/api/blog';
import {createAsyncThunk} from '@reduxjs/toolkit';
import BlogService from '@/services/blog.service';

export const getAllBlogThunk = createAsyncThunk<
  GetBlogsResponse,
  GetAllBlogRequest
>(
  'blog-section/getAllBlog',
  async (getAllBlogRequest: GetAllBlogRequest, {rejectWithValue}) => {
    try {
      if (getAllBlogRequest.accessToken === null) {
        return await BlogService.getInstance().getAllBlogWithPagination(
          getAllBlogRequest,
        );
      } else {
        return await BlogService.getInstance().getAllBlogWithPaginationWithAuth(
          getAllBlogRequest,
        );
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
