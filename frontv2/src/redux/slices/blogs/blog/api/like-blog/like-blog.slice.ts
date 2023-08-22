import {LikeBlogResponse} from '@/types/api/blogs/blog';
import {ReduxEntityBase} from '@/types/general/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {likeBlogThunk} from '@/redux/slices/blogs/blog/api/like-blog/like-blog.thunk';

export type LikeBlogSliceState = ReduxEntityBase<LikeBlogResponse>;

const initialState: LikeBlogSliceState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const likeBlogSlice = createSlice({
  name: 'likeBlogSlice',
  initialState,
  reducers: {
    resetLikeBlogState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(likeBlogThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(likeBlogThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(likeBlogThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetLikeBlogState} = likeBlogSlice.actions;
