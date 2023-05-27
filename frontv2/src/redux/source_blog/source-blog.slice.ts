import {ReduxEntityBase} from '@/types/general/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {getAllSourceBlogThunk} from '@/redux/source_blog/source-blog.thunk';
import {GetAllSourceBlogResponse} from '@/types/api/source_blog';

export type SourceBlogState = ReduxEntityBase<GetAllSourceBlogResponse>;

const initialState: SourceBlogState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const sourceBlogSlice = createSlice({
  name: 'sourceBlogSlice',
  initialState,
  reducers: {
    resetSourceBlogState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllSourceBlogThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllSourceBlogThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllSourceBlogThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetSourceBlogState} = sourceBlogSlice.actions;
