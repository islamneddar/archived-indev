import {useAppDispatch, useAppSelector} from '@/redux/store';
import {SystemState} from '@/redux/system/system.slice';

export const selectSystem = (state: {systemReducer: SystemState}) =>
  state.systemReducer;

export const useSystemSelector = (): SystemState =>
  useAppSelector(selectSystem);

export const useSystemDispatch = () => useAppDispatch();
