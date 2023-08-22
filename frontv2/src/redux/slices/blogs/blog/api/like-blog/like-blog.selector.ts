import {LikeBlogSliceState} from '@/redux/slices/blogs/blog/api/like-blog/like-blog.slice';
import {useAppSelector} from '@/redux/store';

export const selectLikeBlog = (state: {blogLikeReducer: LikeBlogSliceState}) =>
  state.blogLikeReducer;

export const useLikeBlogSelector = (): LikeBlogSliceState => {
  return useAppSelector(selectLikeBlog);
};
