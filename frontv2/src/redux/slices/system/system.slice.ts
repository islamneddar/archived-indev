import {createSlice} from '@reduxjs/toolkit';

export interface SystemState {
  sideBarMobileEnabled: boolean; // the side bar for mobile
  sideOverForGetBlogsBySourceBlog: boolean;
}

const initialState: SystemState = {
  sideBarMobileEnabled: false,
  sideOverForGetBlogsBySourceBlog: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleSideBarMobile: (state, action) => {
      state.sideBarMobileEnabled = action.payload;
    },
    toggleSideOverForGetBlogsBySourceBlog: (state, action) => {
      state.sideOverForGetBlogsBySourceBlog = action.payload;
    },
  },
});

export const {toggleSideBarMobile, toggleSideOverForGetBlogsBySourceBlog} =
  systemSlice.actions;
