import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./managerSlice";

const store = configureStore({
  reducer: {
    manager: userReducer, // Add the caseManager slice reducer
  },
});

export default store;
