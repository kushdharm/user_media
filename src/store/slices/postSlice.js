import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    userList: [],
  },
  reducers: {
    setPostList: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setPostList } = postSlice.actions;
export default postSlice.reducer;