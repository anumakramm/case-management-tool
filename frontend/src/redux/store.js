import { configureStore } from "@reduxjs/toolkit";
import managerReducer from "./managerSlice";

const store = configureStore({
  reducer: {
    manager: managerReducer, // Add the caseManager slice reducer
  },
});

export default store;
