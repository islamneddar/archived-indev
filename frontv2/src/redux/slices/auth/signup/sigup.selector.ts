import {useAppSelector} from '@/redux/store';
import {SignupState} from '@/redux/slices/auth/signup/signup.slice';

export const selectSignup = (state: {signupReducer: SignupState}) =>
  state.signupReducer;

export const useSignupSelector = (): SignupState => {
  return useAppSelector(selectSignup);
};
