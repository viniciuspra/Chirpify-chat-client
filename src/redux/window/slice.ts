import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface WindowSizeState {
  width: number;
  height: number;
  isMobile: boolean;
}

const initialState: WindowSizeState = {
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth <= 640,
};

const windowSize = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    setWindowSize(
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.isMobile = action.payload.width <= 640;
    },
  },
});

export const { setWindowSize } = windowSize.actions;

export const selectWindow = (state: RootState) => state.window

export default windowSize.reducer;
