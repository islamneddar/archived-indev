import {ReduxEntityBase} from '@/infra/types/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {GetBookmarksResponse} from '@/infra/web-services/types/blogs/blog';
import {getAllBookmarksThunk} from '@/redux/slices/blogs/blog/api/get-all-bookmarks/get-all-bookmarks.thunk';

export type GetBookmarkBlogState = ReduxEntityBase<GetBookmarksResponse>;

const initialState: GetBookmarkBlogState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const getBookmarkBlogSlice = createSlice({
  name: 'getBookmarkBlogSlice',
  initialState,
  reducers: {
    resetGetBookmarkState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllBookmarksThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllBookmarksThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllBookmarksThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetGetBookmarkState} = getBookmarkBlogSlice.actions;
