import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    loginAdmin(state, action) {
      return action.payload;
    },
    logOutAdmin(state, action) {
      return null;
    },
  },
});

export const { loginAdmin, logOutAdmin } = userSlice.actions;
export default userSlice.reducer;
