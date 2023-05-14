import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {systemSlice} from './system/system.slice';
import {blogSlice} from '@/redux/blog/blog.slice';

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
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = (selector: (state: RootState) => any) => {
  return useSelector(selector);
};

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
