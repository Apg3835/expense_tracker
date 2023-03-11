import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import expenseDataSlice from "../reducer/expenseDataSlice";

const store = configureStore({
  reducer: { expenseTracker: expenseDataSlice.reducer,auth:authSlice.reducer },
});
export default store;
