import {sourceBlogSlice} from '@/redux/slices/source_blog/api/get-all-source-blog/source-blog.slice';
import {followSourceBlogSlice} from '@/redux/slices/source_blog/api/follow-source-blog/follow-source-blog.slice';
import {getAllSourceBlogTypesSlice} from '@/redux/slices/source_blog/api/get-all-source-blog-types/get-all-source-blog-types.slice';
import {sourceBlogStateSlice} from '@/redux/slices/source_blog/source-blog-state/source-blog-state.slice';

export const sourceBlogReducers = {
  sourceBlogReducer: sourceBlogSlice.reducer,
  sourceBlogFollowReducer: followSourceBlogSlice.reducer,
  getAllTypeSourceBlogReducer: getAllSourceBlogTypesSlice.reducer,
  sourceBlogStatReducer: sourceBlogStateSlice.reducer,
};
