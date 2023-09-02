import {AiToolStateSlice} from '@/redux/slices/ai-tools/ai-tool/ai-tool-state/ai-tool-state.slice';
import {useAppSelector} from '@/redux/store';

export const selectAiToolState = (state: {
  aiToolStateReducer: AiToolStateSlice;
}) => state.aiToolStateReducer;

export const useAiToolStateSelector = (): AiToolStateSlice =>
  useAppSelector(selectAiToolState);
