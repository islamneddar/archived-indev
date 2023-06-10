import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SourceBlog} from '@/types/api/source_blog';

export interface SourceBlogStateSlice {
  currentSelectedSourceBlog: SourceBlog | null; // the side bar for mobile
}

const initialState: SourceBlogStateSlice = {
  currentSelectedSourceBlog: null,
};

export const sourceBlogStateSlice = createSlice({
  name: 'sourceBlogStateSlice',
  initialState,
  reducers: {
    setSourceBlog: (state, action: PayloadAction<SourceBlog | null>) => {
      state.currentSelectedSourceBlog = action.payload;
    },
  },
});

export const {setSourceBlog} = sourceBlogStateSlice.actions;
