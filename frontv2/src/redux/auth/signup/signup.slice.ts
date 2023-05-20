import {createSlice} from '@reduxjs/toolkit';
import {signupThunk} from './signup.thunk';
import {useAppSelector} from '@/redux/store';

export interface SignupState {
  loading: boolean;
  error: string | undefined;
  success: boolean;
}

const initialState: SignupState = {
  loading: false,
  error: undefined,
  success: false,
};

export const signupSlice = createSlice({
  name: 'signupSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signupThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectSignup = (state: {signupReducer: SignupState}) =>
  state.signupReducer;

export const useSignupSelector = () => {
  return useAppSelector(selectSignup);
};
