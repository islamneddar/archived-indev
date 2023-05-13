import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppDispatch, useAppSelector} from '../store';

export interface SystemState {
  sideBarTopics: boolean; // the side bar where there is categories
  searchEnabled: boolean;
}

const initialState: SystemState = {
  sideBarTopics: false,
  searchEnabled: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleSideBarTopic: state => {
      state.sideBarTopics = !state.sideBarTopics;
    },
    toggleSearch: (state, action: PayloadAction<boolean>) => {
      state.searchEnabled = action.payload;
    },
  },
});

export const {toggleSideBarTopic, toggleSearch} = systemSlice.actions;

export const selectSystem = (state: {systemReducer: SystemState}) =>
  state.systemReducer;

export const useSystemSelector = () => useAppSelector(selectSystem);

export const useSystemDispatch = () => useAppDispatch();
