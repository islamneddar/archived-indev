import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetAllSourceBlogRequest,
  GetAllSourceBlogResponse,
} from '@/infra/web-services/types/blogs/source_blog';
import SourceBlogService from '@/infra/web-services/services/blogs/source_blog.service';
import {EventBusFront, EventBusFrontType} from '@/infra/events/event_bus';

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
      if (error.response === undefined) {
        return rejectWithValue('internal error');
      }
      if (error.response.status === 401) {
        EventBusFront.dispatch(EventBusFrontType.LOGOUT, {});
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);
