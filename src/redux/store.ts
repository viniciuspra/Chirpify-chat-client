import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import requestReducer from "./request/slice";
import panelsReducer from "./panel/slice";
import chatReducer from "./chat/slice";
import avatarReducer from "./avatar/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    request: requestReducer,
    panels: panelsReducer,
    chat: chatReducer,
    avatar: avatarReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
