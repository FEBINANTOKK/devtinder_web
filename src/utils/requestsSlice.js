import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id != action.payload);
      return newArray;
    },
  },
});
// Action creators are generated for each case reducer function
export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
