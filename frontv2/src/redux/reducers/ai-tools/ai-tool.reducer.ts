import {getAllAiToolSlice} from '@/redux/slices/ai-tools/ai-tool/api/get-all/get-all-ai-tool.slice';
import {aiToolStateSlice} from '@/redux/slices/ai-tools/ai-tool/ai-tool-state/ai-tool-state.slice';

export const aiToolReducer = {
  getAllAiToolsReducer: getAllAiToolSlice.reducer,
  aiToolStateReducer: aiToolStateSlice.reducer,
};
