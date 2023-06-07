import {useAppSelector} from '@/redux/store';
import {UserSessionState} from '@/redux/slices/auth/user/user.slice';

export const selectUserSession = (state: {
  userSessionReducer: UserSessionState;
}) => state.userSessionReducer;

export const useUserSessionSelector = (): UserSessionState => {
  return useAppSelector(selectUserSession);
};
