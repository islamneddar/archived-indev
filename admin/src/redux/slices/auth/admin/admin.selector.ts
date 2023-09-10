import {useAppSelector} from '@/redux/store';
import {AdminSessionState} from '@/redux/slices/auth/admin/admin.slice';

export const selectAdminSession = (state: {
  adminSessionReducer: AdminSessionState;
}) => state.adminSessionReducer;

export const useAdminSessionSelector = (): AdminSessionState => {
  return useAppSelector(selectAdminSession);
};
