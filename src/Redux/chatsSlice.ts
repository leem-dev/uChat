import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  isChatsTab: false,
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatsTab: (state, action: { payload: boolean; type: string }) => {
      state.isChatsTab = action.payload;
    },
    setChats: (state, action) => {
      const chats = action.payload;
      state.chats = chats;
    },
  },
});

export const { setIsChatsTab, setChats } = chatsSlice.actions;
export default chatsSlice.reducer;
