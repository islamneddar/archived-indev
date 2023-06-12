import {useAppSelector} from '@/redux/store';
import {BlogState} from '@/redux/slices/blog/api/get-all-blog/blog.slice';
import {BlogBySourceBlogState} from '@/redux/slices/blog/api/get-all-blog-by-source/get-all-blog-by-source.slice';

export const selectBlogBySourceBlog = (state: {
  getBlogsBySourceBlog: BlogState;
}) => state.getBlogsBySourceBlog;

export const useGetBlogsBySourceBlogSelector = (): BlogBySourceBlogState => {
  return useAppSelector(selectBlogBySourceBlog);
};
