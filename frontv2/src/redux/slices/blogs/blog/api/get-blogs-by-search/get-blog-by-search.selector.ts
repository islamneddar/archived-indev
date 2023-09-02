import {useAppSelector} from '@/redux/store';
import {getAllBlogBySearchSliceState} from '@/redux/slices/blogs/blog/api/get-blogs-by-search/get-blog-by-search.slice';

export const selectGetAllBlogBySearch = (state: {
  getAllBlogBySearch: getAllBlogBySearchSliceState;
}) => state.getAllBlogBySearch;

export const useGetAllBlogBySearchSelector =
  (): getAllBlogBySearchSliceState => {
    return useAppSelector(selectGetAllBlogBySearch);
  };
