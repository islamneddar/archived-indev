import {createSlice} from '@reduxjs/toolkit';

export interface SystemState {
  sideBarMobileEnabled: boolean; // the side bar for mobile
}

const initialState: SystemState = {
  sideBarMobileEnabled: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleSideBarMobile: (state, action) => {
      state.sideBarMobileEnabled = action.payload;
    },
  },
});

export const {toggleSideBarMobile} = systemSlice.actions;
