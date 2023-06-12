import {blogSlice} from '@/redux/slices/blog/api/get-all-blog/blog.slice';
import {likeBlogSlice} from '@/redux/slices/blog/api/like-blog/like-blog.slice';
import {bookMarkBlogSlice} from '@/redux/slices/blog/api/bookmark-blog/bookmark-blog.slice';
import {getBookmarkBlogSlice} from '@/redux/slices/blog/api/get-all-bookmarks/get-all-bookmarks.slice';
import {blogBySourceBlogSlice} from '@/redux/slices/blog/api/get-all-blog-by-source/get-all-blog-by-source.slice';

export const blogReducers = {
  blogReducer: blogSlice.reducer,
  blogLikeReducer: likeBlogSlice.reducer,
  bookmarkBlogReducer: bookMarkBlogSlice.reducer,
  getAllBookmarksReducer: getBookmarkBlogSlice.reducer,
  getBlogsBySourceBlog: blogBySourceBlogSlice.reducer,
};
