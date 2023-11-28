import BlogService from '@/infra/web-services/services/blogs/blog.service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {templateThinkCall} from '@/redux/util';
import {
  BookmarkBlogRequest,
  BookmarkBlogResponse,
} from '@/infra/web-services/types/blogs/blog';

export const bookmarkBlogThunk = createAsyncThunk<
  BookmarkBlogResponse,
  BookmarkBlogRequest
>(
  'bookmarkBlogThunk',
  async (request: BookmarkBlogRequest, {rejectWithValue}) => {
    return await templateThinkCall<BookmarkBlogRequest, BookmarkBlogResponse>({
      request,
      callback: async (request: BookmarkBlogRequest) => {
        return await BlogService.getInstance().bookmarkBlog(request);
      },
      rejectWithValue,
      isProtected: true,
    });
  },
);
