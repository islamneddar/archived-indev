import BlogService from '@/services/blog.service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {templateThinkCall} from '@/redux/util';
import {GetBookmarksParams, GetBookmarksResponse} from '@/types/api/blog';

export const getAllBookmarksThunk = createAsyncThunk<
  GetBookmarksResponse,
  GetBookmarksParams
>(
  'getBookmarkBlogThunk',
  async (request: GetBookmarksParams, {rejectWithValue}) => {
    return await templateThinkCall<GetBookmarksParams, GetBookmarksResponse>({
      request,
      callback: async (request: GetBookmarksParams) => {
        return await BlogService.getInstance().getBookmarks(request);
      },
      rejectWithValue,
      isProtected: true,
    });
  },
);
