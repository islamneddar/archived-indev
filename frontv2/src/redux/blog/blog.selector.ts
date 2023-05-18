import {useAppSelector} from '@/redux/store';
import {BlogState} from '@/redux/blog/blog.slice';

export const selectBlog = (state: {blogReducer: BlogState}) =>
  state.blogReducer;

export const useBlogSelector = (): BlogState => {
  return useAppSelector(selectBlog);
};
