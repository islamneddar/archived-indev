import {ReduxEntityBase} from '@/types/general/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {BookmarkBlogResponse} from '@/types/api/blog';
import {bookmarkBlogThunk} from '@/redux/slices/blog/api/bookmark-blog/bookmark-blog.thunk';

export type BookmarkBlogState = ReduxEntityBase<BookmarkBlogResponse>;

const initialState: BookmarkBlogState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const bookMarkBlogSlice = createSlice({
  name: 'bookmarkBlogSlice',
  initialState,
  reducers: {
    resetBookmarkBlogState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(bookmarkBlogThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(bookmarkBlogThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(bookmarkBlogThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetBookmarkBlogState} = bookMarkBlogSlice.actions;
