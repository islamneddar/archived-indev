import {createSlice} from '@reduxjs/toolkit';
import {useAppSelector} from '@/redux/store';
import {UserSession} from '@/types/general/user-session.type';

export interface UserSessionState {
  isAuthenticated: boolean;
  user: UserSession | null;
}

const initialState: UserSessionState = {
  isAuthenticated: false,
  user: null,
};

export const userSessionSlice = createSlice({
  name: 'userSessionSlice',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {updateAuth} = userSessionSlice.actions;

export const selectUserSession = (state: {
  userSessionReducer: UserSessionState;
}) => state.userSessionReducer;

export const useUserSessionSelector = () => {
  return useAppSelector(selectUserSession);
};
