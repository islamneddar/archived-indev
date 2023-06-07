import {sourceBlogSlice} from '@/redux/slices/source_blog/get-all-source-blog/source-blog.slice';
import {followSourceBlogSlice} from '@/redux/slices/source_blog/follow-source-blog/follow-source-blog.slice';
import {getAllSourceBlogTypesSlice} from '@/redux/slices/source_blog/get-all-source-blog-types/get-all-source-blog-types.slice';

export const sourceBlogReducers = {
  sourceBlogReducer: sourceBlogSlice.reducer,
  sourceBlogFollowReducer: followSourceBlogSlice.reducer,
  getAllTypeSourceBlogReducer: getAllSourceBlogTypesSlice.reducer,
};
