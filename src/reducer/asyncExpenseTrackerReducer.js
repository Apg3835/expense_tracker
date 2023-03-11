import { createAsyncThunk } from "@reduxjs/toolkit";
import apiExpenseTrackerServices from "../Components/services/apiExpenseTrackerServices";

export const addExpenseAction=createAsyncThunk('addExpenseAction', async(expenseData)=>{
    // console.log(2,expenseData);
    const response = await apiExpenseTrackerServices.addExpense(expenseData);
    console.log();
    // return response;

})
export const getExpenseAction=createAsyncThunk('getExpenseAction', async(localId)=>{
    // console.log(2,localId);
    const response = await apiExpenseTrackerServices.getExpense(localId);
    // console.log();
    return response;

})
export const deleteExpenseAction=createAsyncThunk('deleteExpenseAction', async(key)=>{
    // console.log(2,key);
    const response = await apiExpenseTrackerServices.deleteExpense(key);
    // console.log();
    return response;

})
export const editExpenseAction=createAsyncThunk('editExpenseAction', async(data)=>{
    console.log(2,data);
    const response = await apiExpenseTrackerServices.editExpense(data);
    // console.log();
    return response;

})

