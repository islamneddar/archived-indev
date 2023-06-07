import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {systemSlice} from '@/redux/slices/system/system.slice';
import {blogSlice} from '@/redux/slices/blog/blog.slice';
import {signupSlice} from '@/redux/slices/auth/signup/signup.slice';
import {loginSlice} from '@/redux/slices/auth/login/login.slice';
import {userSessionSlice} from '@/redux/slices/auth/user/user.slice';
import {likeBlogSlice} from '@/redux/slices/blog/like-blog/like-blog.slice';
import {bookMarkBlogSlice} from '@/redux/slices/blog/bookmark-blog/bookmark-blog.slice';
import {getBookmarkBlogSlice} from '@/redux/slices/blog/get-all-bookmarks/get-all-bookmarks.slice';
import {sourceBlogReducers} from '@/redux/reducers/source-blog-reducers';

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
    blogLikeReducer: likeBlogSlice.reducer,
    bookmarkBlogReducer: bookMarkBlogSlice.reducer,
    getAllBookmarksReducer: getBookmarkBlogSlice.reducer,
    ...sourceBlogReducers,
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
