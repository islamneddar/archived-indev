import {createSlice} from '@reduxjs/toolkit';
import {useAppSelector} from '@/redux/store';
import {UserSession} from '@/types/general/user-session.type';
import {getUserProfileThunk} from '@/redux/auth/user/user.thunk';
import {ReduxEntityBase} from '@/types/general/redux.type';

export interface UserSessionState extends ReduxEntityBase<any> {
  isAuthenticated: boolean;
  user: UserSession | null;
}

const initialState: UserSessionState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: undefined,
  data: null,
  success: false,
};

export const userSessionSlice = createSlice({
  name: 'userSessionSlice',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserProfileThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {updateAuth} = userSessionSlice.actions;

export const selectUserSession = (state: {
  userSessionReducer: UserSessionState;
}) => state.userSessionReducer;

export const useUserSessionSelector = () => {
  return useAppSelector(selectUserSession);
};
