import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TooltipContent } from "@/components/side-bar";
import { RootState } from "../store";
import { UserType } from "@/components/chats-panel";

interface PanelsState {
  activePanel: TooltipContent | null;
  selectedUser: UserType | null;
}

const initialState: PanelsState = {
  activePanel: "Chats",
  selectedUser: null,
};

export const panelsSlice = createSlice({
  name: "panels",
  initialState,
  reducers: {
    setActivePanel(state, action: PayloadAction<TooltipContent>) {
      state.activePanel = action.payload;
    },
    clearActivePanel(state) {
      state.activePanel = null;
    },
    setSelectedUser(state, action: PayloadAction<UserType | null>) {
      state.selectedUser = action.payload;
    },
  },
});

export const { setActivePanel, clearActivePanel, setSelectedUser } = panelsSlice.actions;

export const selectActivePanel = (state: RootState) => state.panels.activePanel;

export default panelsSlice.reducer;
