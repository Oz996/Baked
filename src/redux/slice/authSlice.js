import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser(state, action){
      const { email, userID } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userID = userID;
    },
    removeActiveUser(state){
      state.isLoggedIn = false;
      state.email = null;
      state.userID = null;
    }
  },
});

export const { setActiveUser, removeActiveUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
