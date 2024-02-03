import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/components/chats-panel";
import { RootState } from "../store";

interface chatState {
  activeChatUser: UserType | null;
}

const initialState: chatState = {
  activeChatUser: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChatUser(state, action: PayloadAction<UserType | null>) {
      state.activeChatUser = action.payload;
    },
  },
});

export const { setActiveChatUser } = chatSlice.actions;

export const selectActiveChatUser = (state: RootState) => state.chat;

export default chatSlice.reducer;
