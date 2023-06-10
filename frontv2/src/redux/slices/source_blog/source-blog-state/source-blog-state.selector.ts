import {useAppSelector} from '@/redux/store';
import {SourceBlogStateSlice} from '@/redux/slices/source_blog/source-blog-state/source-blog-state.slice';

export const selectSourceBlogState = (state: {
  sourceBlogStatReducer: SourceBlogStateSlice;
}) => state.sourceBlogStatReducer;

export const useSourceBlogStateSelector = (): SourceBlogStateSlice =>
  useAppSelector(selectSourceBlogState);
