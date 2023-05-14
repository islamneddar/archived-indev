import {Blog} from '@/types/api/blog';
import {PageMetaResponse} from '@/types/api/common';
import {createSlice} from '@reduxjs/toolkit';
import {getAllBlogThunk as getAllBlog} from '@/redux/blog/blog.thunk';
import {useAppSelector} from '@/redux/store';

export interface BlogState {
  loading : boolean;
  error : string | undefined;
  success : boolean;
  blogs : Blog[];
  meta : PageMetaResponse ;
}

const initialState : BlogState = {
  loading: false,
  error: undefined,
  success: false,
  blogs: [],
  meta: {
    page: 1,
    hasPreviousPage : false,
    hasNextPage : false
  }
}

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // getAllBlog
    builder.addCase(getAllBlog.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.blogs = [...state.blogs,...action.payload.data];
      state.meta = action.payload.meta;
    });
    builder.addCase(getAllBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  }
})





