import {ReduxEntityBase} from '@/types/general/redux.type';
import {GetAllCategoriesAiToolResponse} from '@/types/api/ai-tools/category-ai-tools';
import {createSlice} from '@reduxjs/toolkit';
import {getAllCategoriesAiToolsThunk} from '@/redux/slices/ai-tools/category-ai-tool/api/get-all-categories/get-all-categories.thunk';

export type GetAllCategoriesAiToolState =
  ReduxEntityBase<GetAllCategoriesAiToolResponse>;

const initialState: GetAllCategoriesAiToolState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const getAllCategoriesAiToolSlice = createSlice({
  name: 'getAllCategoriesAiToolSlice',
  initialState,
  reducers: {
    resetGetAllCategoriesAiToolState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllCategoriesAiToolsThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllCategoriesAiToolsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllCategoriesAiToolsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

export const {resetGetAllCategoriesAiToolState} =
  getAllCategoriesAiToolSlice.actions;
