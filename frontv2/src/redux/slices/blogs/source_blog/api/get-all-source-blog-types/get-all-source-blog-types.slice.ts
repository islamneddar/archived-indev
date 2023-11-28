import {ReduxEntityBase} from '@/infra/types/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {GetAllTypeSourceBlogResponse} from '@/infra/web-services/types/blogs/source_blog';
import {getAllSourceBlogTypesThunk} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog-types/get-all-source-blog-types.thunk';

export type getAllSourceBlogTypesState =
  ReduxEntityBase<GetAllTypeSourceBlogResponse>;

const initialState: getAllSourceBlogTypesState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const getAllSourceBlogTypesSlice = createSlice({
  name: 'getAllSourceBlogTypesSlice',
  initialState,
  reducers: {
    resetGetAllSourceBlogTypes: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllSourceBlogTypesThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllSourceBlogTypesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllSourceBlogTypesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetGetAllSourceBlogTypes} = getAllSourceBlogTypesSlice.actions;
