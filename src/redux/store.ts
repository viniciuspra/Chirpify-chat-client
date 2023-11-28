import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./user/slice";
import panelsReducer from "./panel/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    panels: panelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
