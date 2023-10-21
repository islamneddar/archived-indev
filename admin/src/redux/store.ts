import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {aiToolReducer} from '@/redux/reducers/ai-tool-reducer';
import {adminSessionSlice} from '@/redux/slices/auth/admin/admin.slice';

const middlewares = [];
middlewares.push(thunk);

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger({collapsed: true}));
}

export const store = configureStore({
  reducer: {
    ...aiToolReducer,
    adminSessionReducer: adminSessionSlice.reducer,
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
