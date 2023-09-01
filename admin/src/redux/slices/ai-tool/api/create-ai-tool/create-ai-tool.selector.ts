import {CreateAiToolState} from '@/redux/slices/ai-tool/api/create-ai-tool/create-ai-tool.slice';
import {useAppSelector} from '@/redux/store';

export const selectCreateAiTool = (state: {
  createAiToolReducer: CreateAiToolState;
}) => state.createAiToolReducer;

export const useCreateAiToolSelector = (): CreateAiToolState => {
  return useAppSelector(selectCreateAiTool);
};
