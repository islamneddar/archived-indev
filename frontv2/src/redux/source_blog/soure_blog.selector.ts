import {useAppSelector} from '@/redux/store';
import {SourceBlogState} from '@/redux/source_blog/source_blog.slice';

export const selectSourceBlog = (state: {sourceBlogReducer: SourceBlogState}) =>
  state.sourceBlogReducer;

export const useSourceBlogSelector = (): SourceBlogState => {
  return useAppSelector(selectSourceBlog);
};
