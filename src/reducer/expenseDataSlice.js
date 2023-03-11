import { createSlice } from "@reduxjs/toolkit";
import { getExpenseAction } from "./asyncExpenseTrackerReducer";

const expenseDataSlice = createSlice({
  name: "expenseTracker",
  initialState: {
    list: [],
    editForm: false,
    expenseToBeEdited: undefined,
    isSubscribe: false,
    isDownload: false,
    isDarkMode: false,
  },
  reducers: {
    addNewExpense(state, action) {
      const newAddedExpense = action.payload;
      console.log(newAddedExpense);
      state.list.push(newAddedExpense);
    },
    editExpense(state, action) {
      const updatedExpense = action.payload;
      console.log(updatedExpense);
    },
    editFormOpen(state, action) {
      state.editForm = true;
      state.expenseToBeEdited = action.payload;
      console.log(state.expenseToBeEdited);
    },
    cancelEditForm(state, action) {
      state.editForm = false;
    },
    subscribeButton(state, action) {
      state.isSubscribe = true;
    },
    darkModeButton(state, action) {
      // state.isDownload = true;
      state.isDarkMode = !state.isDarkMode;
    },
    userLogout(state, action) {
      state.isSubscribe = false;
      state.isDarkMode = false;
      state.isDownload = false;
    },
    hideSubscribeButton(state, action) {
      state.isSubscribe = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenseAction.fulfilled, (state, action) => {
      const response = action.payload;
      const newExpenseArr = [];
      for (const key in response) {
        const newExpense = response[key];
        newExpenseArr.push({
          amount: newExpense.amount,
          date: newExpense.date,
          description: newExpense.description,
          id: newExpense.id,
          type: newExpense.type,
          key: key,
        });
      }
      state.list = newExpenseArr;
    });
  },
});
export default expenseDataSlice;
export const expenseDataActions = expenseDataSlice.actions;
