import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TooltipContent } from "@/components/side-bar";
import { RootState } from "../store";

interface PanelsState {
  activePanel: TooltipContent;
}

const initialState: PanelsState = {
  activePanel: "Chats",
};

export const panelsSlice = createSlice({
  name: "panels",
  initialState,
  reducers: {
    setActivePanel(state, action: PayloadAction<TooltipContent>) {
      state.activePanel = action.payload;
    },
  },
});

export const { setActivePanel } = panelsSlice.actions;

export const selectActivePanel = (state: RootState) => state.panels.activePanel;

export default panelsSlice.reducer;
