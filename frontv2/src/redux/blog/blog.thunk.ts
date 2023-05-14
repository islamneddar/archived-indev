import {GetAllBlogRequest, GetBlogsResponse} from '@/types/api/blog';
import {createAsyncThunk} from '@reduxjs/toolkit';
import BlogService from '@/services/blog.service';

export const getAllBlogThunk = createAsyncThunk<GetBlogsResponse, GetAllBlogRequest>(
  'blog/getAllBlog',
  async (getAllBlogRequest: GetAllBlogRequest, {rejectWithValue}) => {
    try{
      return await BlogService.getInstance().getAllBlogWithPagination(getAllBlogRequest)
    }catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data.message);
    }
  },
)