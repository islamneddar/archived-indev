import {ReduxEntityBase} from '@/types/general/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {GetBlogsResponse} from '@/types/api/blogs/blog';
import {getAllBlogBySearchThunk} from '@/redux/slices/blogs/blog/api/get-blogs-by-search/get-blog-by-search.thunk';

export type getAllBlogBySearchSliceState = ReduxEntityBase<GetBlogsResponse>;

const initialState: getAllBlogBySearchSliceState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const getAllBlogBySearchSlice = createSlice({
  name: 'getAllBlogBySearchSlice',
  initialState,
  reducers: {
    resetGetAllBlogBySearchSlice: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllBlogBySearchThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllBlogBySearchThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllBlogBySearchThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetGetAllBlogBySearchSlice} = getAllBlogBySearchSlice.actions;
