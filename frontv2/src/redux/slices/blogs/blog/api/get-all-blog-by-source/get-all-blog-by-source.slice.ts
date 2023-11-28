import {createSlice} from '@reduxjs/toolkit';
import {ReduxEntityBase} from '@/infra/types/redux.type';
import {GetBlogsResponse} from '@/infra/web-services/types/blogs/blog';
import {getAllBlogBySourceBlogRequestThunk} from '@/redux/slices/blogs/blog/api/get-all-blog-by-source/get-all-blog-by-source.thunk';

export type BlogBySourceBlogState = ReduxEntityBase<GetBlogsResponse>;

const initialState: BlogBySourceBlogState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const blogBySourceBlogSlice = createSlice({
  name: 'blogBySourceBlogSlice',
  initialState,
  reducers: {
    resetBlogBySourceBlogState: () => initialState,
  },
  extraReducers: builder => {
    // getAllBlog
    builder.addCase(getAllBlogBySourceBlogRequestThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(
      getAllBlogBySourceBlogRequestThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      },
    );
    builder.addCase(
      getAllBlogBySourceBlogRequestThunk.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      },
    );
  },
});

export const {resetBlogBySourceBlogState} = blogBySourceBlogSlice.actions;
