import { createSlice } from "@reduxjs/toolkit";

export const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConections: () => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addConnections, removeConections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
