import {createSlice} from '@reduxjs/toolkit';
import {UserSession} from '@/types/common/user-session.type';
import {getAdminProfileThunk} from '@/redux/slices/auth/admin/admin.thunk';
import {ReduxEntityBase} from '@/types/common/redux.type';

export interface AdminSessionState extends ReduxEntityBase<any> {
  isAuthenticated: boolean;
  user: UserSession;
}

const initialState: AdminSessionState = {
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

export const adminSessionSlice = createSlice({
  name: 'adminSessionSlice',
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
    builder.addCase(getAdminProfileThunk.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(getAdminProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        accessToken: state.user?.accessToken || '',
        ...action.payload,
      };
      state.success = true;
    });
    builder.addCase(getAdminProfileThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {updateAuth} = adminSessionSlice.actions;
