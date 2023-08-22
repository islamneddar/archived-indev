import {createSlice} from '@reduxjs/toolkit';
import {getAllBlogThunk as getAllBlog} from '@/redux/slices/blogs/blog/api/get-all-blog/blog.thunk';
import {ReduxEntityBase} from '@/types/general/redux.type';
import {GetBlogsResponse} from '@/types/api/blogs/blog';

export type BlogState = ReduxEntityBase<GetBlogsResponse>;

const initialState: BlogState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    resetBlogState: () => initialState,
  },
  extraReducers: builder => {
    // getAllBlog
    builder.addCase(getAllBlog.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetBlogState} = blogSlice.actions;
