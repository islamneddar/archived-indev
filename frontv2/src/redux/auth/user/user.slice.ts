import {createSlice} from '@reduxjs/toolkit';
import {useAppSelector} from '@/redux/store';

export interface UserSessionState {
  isAuthenticated: boolean;
}

const initialState: UserSessionState = {
  isAuthenticated: false,
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
