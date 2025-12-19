import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import feedReducer from "../utils/feedSlice";
import toastReducer from "./toastSlice";
import ConnectionsReducer from "../utils/connectionsSilce";
import requestsResucers from "../utils/requestsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    toast: toastReducer,
    connections: ConnectionsReducer,
    requests: requestsResucers,
  },
});
