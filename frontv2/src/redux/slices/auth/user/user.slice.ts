import {createSlice} from '@reduxjs/toolkit';
import {UserSession} from '@/types/general/user-session.type';
import {getUserProfileThunk} from '@/redux/slices/auth/user/user.thunk';
import {ReduxEntityBase} from '@/types/general/redux.type';

export interface UserSessionState extends ReduxEntityBase<any> {
  isAuthenticated: boolean;
  user: UserSession;
}

const initialState: UserSessionState = {
  isAuthenticated: false, // means that we fetched the user from backend
  user: {
    accessToken: '',
    email: '',
    username: '',
    id: 0,
  },
  loading: false,
  error: undefined,
  success: false,
};

export const userSessionSlice = createSlice({
  name: 'userSessionSlice',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      const payload = action.payload as {
        isAuthenticated: boolean;
        accessToken: string;
      };
      state.isAuthenticated = payload.isAuthenticated;
      state.user.accessToken = payload.accessToken;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserProfileThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        accessToken: state.user?.accessToken || '',
        ...action.payload,
      };
      state.success = true;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {updateAuth} = userSessionSlice.actions;
