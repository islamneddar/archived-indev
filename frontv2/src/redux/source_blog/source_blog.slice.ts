import {ReduxEntityBase} from '@/types/general/redux.type';
import {SourceBlog} from '@/types/api/source_blog';
import {createSlice} from '@reduxjs/toolkit';
import {getAllSourceBlogThunk} from '@/redux/source_blog/source_blog.thunk';

export interface SourceBlogState extends ReduxEntityBase<any> {
  sourceBlogs: SourceBlog[];
  meta: any;
}

const initialState: SourceBlogState = {
  loading: false,
  error: undefined,
  success: false,
  sourceBlogs: [],
  meta: {
    page: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export const sourceBlogSlice = createSlice({
  name: 'sourceBlogSlice',
  initialState,
  reducers: {
    clearSourceBlogs: state => {
      state.sourceBlogs = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllSourceBlogThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(getAllSourceBlogThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.sourceBlogs = [...state.sourceBlogs, ...action.payload.data];
      state.meta = action.payload.meta;
    });
    builder.addCase(getAllSourceBlogThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {clearSourceBlogs} = sourceBlogSlice.actions;
