import {useAppSelector} from '@/redux/store';
import {GetBookmarkBlogState} from '@/redux/slices/blogs/blog/api/get-all-bookmarks/get-all-bookmarks.slice';

export const selectGetAllBookmarkBlog = (state: {
  getAllBookmarksReducer: GetBookmarkBlogState;
}) => state.getAllBookmarksReducer;

export const useGetAllBookmarksSelector = (): GetBookmarkBlogState => {
  return useAppSelector(selectGetAllBookmarkBlog);
};
