import {useAppSelector} from '@/redux/store';
import {BookmarkBlogState} from '@/redux/slices/blogs/blog/api/bookmark-blog/bookmark-blog.slice';

export const selectBookmarkBlog = (state: {
  bookmarkBlogReducer: BookmarkBlogState;
}) => state.bookmarkBlogReducer;

export const useBookmarkBlogSelector = (): BookmarkBlogState => {
  return useAppSelector(selectBookmarkBlog);
};
