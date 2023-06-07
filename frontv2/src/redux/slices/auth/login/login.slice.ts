import {createSlice} from '@reduxjs/toolkit';
import {loginThunk} from './login.thunk';
import {LoginResponse} from '@/types/api/auth';
import {useAppDispatch, useAppSelector} from '@/redux/store';

export interface LoginState {
  data?: LoginResponse;
  loading: boolean;
  error: string | undefined;
}

const initialState: LoginState = {
  data: undefined,
  loading: false,
  error: undefined,
};

// create slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectLogin = (state: {loginReducer: LoginState}) =>
  state.loginReducer;

export const useLoginSelector = () => {
  return useAppSelector(selectLogin);
};

export const useLoginDispatch = () => {
  return useAppDispatch();
};
