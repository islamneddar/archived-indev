import {createSlice} from '@reduxjs/toolkit';
import {AdminSession} from '@/types/common/user-session.type';
import {getAdminProfileThunk} from '@/redux/slices/auth/admin/admin.thunk';
import {ReduxEntityBase} from '@/types/common/redux.type';

export interface AdminSessionState extends ReduxEntityBase<any> {
  isAuthenticated: boolean;
  user: AdminSession;
}

const initialState: AdminSessionState = {
  isAuthenticated: false, // means that we fetched the user from backend
  user: {
    accessToken: '',
    email: '',
    username: '',
    id: 0,
    role: '',
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
        email: string;
        username: string;
        id: number;
        role: string;
      };
      state.isAuthenticated = payload.isAuthenticated;
      state.user.accessToken = payload.accessToken;
      state.user.email = payload.email;
      state.user.username = payload.username;
      state.user.id = payload.id;
      state.user.role = payload.role;
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
      state.success = false;
      state.isAuthenticated = false;
    });
  },
});

export const {updateAuth} = adminSessionSlice.actions;
