import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {systemSlice} from './system/system.slice';
import {blogSlice} from '@/redux/blog/blog.slice';
import {signupSlice} from '@/redux/auth/signup/signup.slice';
import {loginSlice} from '@/redux/auth/login/login.slice';
import {userSessionSlice} from '@/redux/auth/user/user.slice';
import {sourceBlogSlice} from '@/redux/source_blog/source-blog.slice';
import {followSourceBlogSlice} from '@/redux/source_blog/follow-source-blog/follow-source-blog.slice';
import {likeBlogSlice} from '@/redux/blog/like-blog/like-blog.slice';
import {bookMarkBlogSlice} from '@/redux/blog/bookmark-blog/bookmark-blog.slice';
import {getBookmarkBlogSlice} from '@/redux/blog/get-all-bookmarks/get-all-bookmarks.slice';

const middlewares = [];
// add thunk
middlewares.push(thunk);

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger({collapsed: true}));
}

export const store = configureStore({
  reducer: {
    systemReducer: systemSlice.reducer,
    blogReducer: blogSlice.reducer,
    signupReducer: signupSlice.reducer,
    loginReducer: loginSlice.reducer,
    userSessionReducer: userSessionSlice.reducer,
    sourceBlogReducer: sourceBlogSlice.reducer,
    sourceBlogFollowReducer: followSourceBlogSlice.reducer,
    blogLikeReducer: likeBlogSlice.reducer,
    bookmarkBlogReducer: bookMarkBlogSlice.reducer,
    getAllBookmarksReducer: getBookmarkBlogSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppSelector = (selector: (state: RootState) => any) => {
  return useSelector(selector);
};

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
