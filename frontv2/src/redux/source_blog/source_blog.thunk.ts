import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetAllSourceBlogRequest,
  GetAllSourceBlogResponse,
} from '@/types/api/source_blog';
import SourceBlogService from '@/services/source_blog.service';
import {EventBusFront, EventBusFrontType} from '@/events/event_bus';

export const getAllSourceBlogThunk = createAsyncThunk<
  GetAllSourceBlogResponse,
  GetAllSourceBlogRequest
>(
  'source_blog/getAllSourceBlog',
  async (
    getAllSourceBlogRequest: GetAllSourceBlogRequest,
    {rejectWithValue},
  ) => {
    try {
      return await SourceBlogService.getInstance().getAllSourceBlogWithPagination(
        getAllSourceBlogRequest,
      );
    } catch (error: any) {
      console.log(error);
      console.log(error.response.status);
      if (error.response.status === 401) {
        //EventBusFront.dispatch(EventBusFrontType.LOGOUT, {});
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);
