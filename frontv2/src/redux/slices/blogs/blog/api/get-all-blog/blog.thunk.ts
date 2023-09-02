import {GetAllBlogRequest, GetBlogsResponse} from '@/types/api/blogs/blog';
import {createAsyncThunk} from '@reduxjs/toolkit';
import BlogService from '@/services/blogs/blog.service';

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
      }
      if (getAllBlogRequest.followedBlogs) {
        return await BlogService.getInstance().getAllBlogWithPaginationAndFollowedOnly(
          getAllBlogRequest,
        );
      }

      return await BlogService.getInstance().getAllBlogWithPaginationWithAuth(
        getAllBlogRequest,
      );
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
