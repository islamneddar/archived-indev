import {GetAllCategoriesAiToolState} from '@/redux/slices/ai-tools/category-ai-tool/api/get-all-categories/get-all-categories.slice';
import {useAppSelector} from '@/redux/store';

export const selectGetAllAiToolsCategories = (state: {
  getAllCategoriesAiToolReducer: GetAllCategoriesAiToolState;
}) => state.getAllCategoriesAiToolReducer;

export const useGetAllAiToolsCategoriesSelector =
  (): GetAllCategoriesAiToolState => {
    return useAppSelector(selectGetAllAiToolsCategories);
  };
