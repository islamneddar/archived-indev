import {ReduxEntityBase} from '@/infra/types/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {FollowSourceBlogResponse} from '@/infra/web-services/types/blogs/source_blog';
import {followSourceBlogThunk} from '@/redux/slices/blogs/source_blog/api/follow-source-blog/follow-source-blog.thunk';

export type FollowSourceBlogSliceState =
  ReduxEntityBase<FollowSourceBlogResponse>;

const initialState: FollowSourceBlogSliceState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const followSourceBlogSlice = createSlice({
  name: 'followSourceBlogSlice',
  initialState,
  reducers: {
    resetFollowSourceBlogState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(followSourceBlogThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(followSourceBlogThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(followSourceBlogThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetFollowSourceBlogState} = followSourceBlogSlice.actions;
