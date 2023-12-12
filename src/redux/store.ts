import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import requestReducer from "./request/slice";
import panelsReducer from "./panel/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    request: requestReducer,
    panels: panelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
