import {useAppSelector} from '@/redux/store';
import {FollowSourceBlogSliceState} from '@/redux/slices/blogs/source_blog/api/follow-source-blog/follow-source-blog.slice';

export const selectFollowSourceBlog = (state: {
  sourceBlogFollowReducer: FollowSourceBlogSliceState;
}) => state.sourceBlogFollowReducer;

export const useFollowSourceBlogSelector = (): FollowSourceBlogSliceState => {
  return useAppSelector(selectFollowSourceBlog);
};
