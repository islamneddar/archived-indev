import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AiTool} from '@/types/api/ai-tools/ai-tool';

export interface AiToolStateSlice {
  currentSelectedAiToolInDialog: AiTool | null;
}

const initialState: AiToolStateSlice = {
  currentSelectedAiToolInDialog: null,
};

export const aiToolStateSlice = createSlice({
  name: 'sourceBlogStateSlice',
  initialState,
  reducers: {
    setAiTool: (state, action: PayloadAction<AiTool | null>) => {
      state.currentSelectedAiToolInDialog = action.payload;
    },
  },
});

export const {setAiTool} = aiToolStateSlice.actions;
