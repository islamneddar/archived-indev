import {useAppSelector} from '@/redux/store';
import {SourceBlogState} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog/source-blog.slice';

export const selectSourceBlog = (state: {sourceBlogReducer: SourceBlogState}) =>
  state.sourceBlogReducer;

export const useSourceBlogSelector = (): SourceBlogState => {
  return useAppSelector(selectSourceBlog);
};
