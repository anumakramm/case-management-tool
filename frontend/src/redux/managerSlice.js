import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  caseManagerId: null, // Default is no case manager logged in
  productManagerId: null,
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    setCaseManagerId: (state, action) => {
      state.caseManagerId = action.payload;
    },
    clearCaseManagerId: (state) => {
      state.caseManagerId = null;
    },
    setProductManagerId: (state, action) => {
      state.productManagerId = action.payload;
    },
    clearProductManagerId: (state) => {
      state.productManagerId = null;
    },
  },
});

export const {
  setCaseManagerId,
  clearCaseManagerId,
  setProductManagerId,
  clearProductManagerId,
} = managerSlice.actions;
export default managerSlice.reducer;
