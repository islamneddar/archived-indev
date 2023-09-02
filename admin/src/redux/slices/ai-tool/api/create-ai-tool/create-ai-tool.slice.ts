import {ReduxEntityBase} from '@/types/common/redux.type';
import {createSlice} from '@reduxjs/toolkit';
import {createAiToolThunk} from '@/redux/slices/ai-tool/api/create-ai-tool/create-ai-tool.thunk';

export type CreateAiToolState = ReduxEntityBase<any>;

const initialState: CreateAiToolState = {
  loading: false,
  error: undefined,
  data: undefined,
  success: false,
};

export const createAiToolSlice = createSlice({
  name: 'createAiTool',
  initialState,
  reducers: {
    resetCreateAiToolState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(createAiToolThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.data = undefined;
      state.success = false;
    });
    builder.addCase(createAiToolThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(createAiToolThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.data = undefined;
      state.success = false;
    });
  },
});

export const {resetCreateAiToolState} = createAiToolSlice.actions;
