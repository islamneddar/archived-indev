import {ReduxEntityBase} from '@/types/general/redux.type';
import {GetAllAiToolResponse} from '@/types/api/ai-tools/ai-tool';
import {createSlice} from '@reduxjs/toolkit';
import {getAllAiToolThunk} from '@/redux/slices/ai-tools/ai-tool/api/get-all/get-all-ai-tool.thunk';

export type GetAllAiToolState = ReduxEntityBase<GetAllAiToolResponse>;

export const initialState: GetAllAiToolState = {
  loading: false,
  error: undefined,
  success: false,
  data: undefined,
};

export const getAllAiToolSlice = createSlice({
  name: 'getAllAiTool',
  initialState,
  reducers: {
    resetGetAllAiTool: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllAiToolThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
      state.data = undefined;
    });
    builder.addCase(getAllAiToolThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getAllAiToolThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {resetGetAllAiTool} = getAllAiToolSlice.actions;
