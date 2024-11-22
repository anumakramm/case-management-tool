import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  caseManagerId: null,
};

const userSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.caseManagerId = action.payload;
    },
    clearUserId: (state) => {
      state.caseManagerId = null;
    },
  },
});

export const {
  setUserId,
  clearUserId,
} = userSlice.actions;
export default userSlice.reducer;
