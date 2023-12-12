import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RequestState {
  receivedRequestCount: number;
}

const initialState: RequestState = {
  receivedRequestCount: 0,
};
export const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    updateReceivedRequests(state, action: PayloadAction<number>) {
      state.receivedRequestCount = action.payload;
    },
  },
});

export const { updateReceivedRequests } = requestSlice.actions;

export const selectRequest = (state: RootState) => state.request;

export default requestSlice.reducer;
