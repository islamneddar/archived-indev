import {GetAllAiToolState} from '@/redux/slices/ai-tools/ai-tool/api/get-all/get-all-ai-tool.slice';
import {useAppSelector} from '@/redux/store';

export const selectGetAllAiTool = (state: {
  getAllAiToolsReducer: GetAllAiToolState;
}) => state.getAllAiToolsReducer;

export const useGetAllAiToolSelector = (): GetAllAiToolState => {
  return useAppSelector(selectGetAllAiTool);
};
