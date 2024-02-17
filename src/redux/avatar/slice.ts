import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface avatarState {
  avatarUrl: File | null;
  avatarPreview: string;
}

const initialState: avatarState = {
  avatarUrl: null,
  avatarPreview: "",
};

export const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setUserAvatar: (state, action: PayloadAction<File | null>) => {
      state.avatarUrl = action.payload;
    },
    setAvatarPreview: (state, action: PayloadAction<string>) => {
      state.avatarPreview = action.payload;
    },
  },
});

export const { setUserAvatar, setAvatarPreview } = avatarSlice.actions;

export const selectAvatar = (state: RootState) => state.avatar;

export default avatarSlice.reducer;
