import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

export const defaultUser: userType = {
  id: "",
  username: "",
  email: "",
  isOnline: false,
  img: "",
  creationTime: "",
  lastSeen: "",
  bio: "",
};

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // set logged in user
    },
    setUsers: (state, action) => {
      // set all users
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
