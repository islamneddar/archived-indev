import {useAppSelector} from '@/redux/store';
import {getAllSourceBlogTypesState} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog-types/get-all-source-blog-types.slice';

export const selectGetAllSourceBlogType = (state: {
  getAllTypeSourceBlogReducer: getAllSourceBlogTypesState;
}) => state.getAllTypeSourceBlogReducer;

export const useGetAllSourceBlogTypesSelector =
  (): getAllSourceBlogTypesState => {
    return useAppSelector(selectGetAllSourceBlogType);
  };
