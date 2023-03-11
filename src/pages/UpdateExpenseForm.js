import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { expenseDataActions } from "../reducer/expenseDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid, MenuItem } from "@mui/material";
import { editExpenseAction, getExpenseAction } from "../reducer/asyncExpenseTrackerReducer";
import { useNavigate } from "react-router-dom";
const Type = [
  {
    value: "FOOD",
  },
  {
    value: "PETROL",
  },
  {
    value: "TRANSPORT",
  },
  {
    value: "RENT",
  },
  {
    value: "GROCERY",
  },
];

export default function UpdateExpenseForm() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const formOpen = useSelector((state) => state.expenseTracker.editForm);
  const userData=useSelector((state)=>state.auth.userProfileData);
  const expenseToBeEdited = useSelector((state) => state.expenseTracker.expenseToBeEdited);
  // console.log(expenseToBeEdited)
 
  

  const [newDescription, setNewDescription] = React.useState(expenseToBeEdited.description);
  const [newAmount, setNewAmount] = React.useState(expenseToBeEdited.amount);
  const [newType, setNewType] = React.useState(expenseToBeEdited.type);
  const [newDate, setNewDate] = React.useState(expenseToBeEdited.date);

  const descriptionChangeHandler = (e) => {
    setNewDescription(e.target.value);
  };
  const amountChangeHandler = (e) => {
    setNewAmount(e.target.value);
  };
  const expenseTypeChangeHandler = (e) => {
    setNewType(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setNewDate(e.target.value);
  };

  const updateExpenseHandler = () => {
    const localId=userData.localId
    const updatedExpense = {
      key: expenseToBeEdited.key,
      description: newDescription,
      amount: newAmount,
      type: newType,
      date: newDate,
      localId:localId,
    };

    dispatch(editExpenseAction(updatedExpense))
    setTimeout(()=>{dispatch(getExpenseAction(localId))},1000)
    dispatch(expenseDataActions.cancelEditForm());
  };

  const handleClose = () => {
    dispatch(expenseDataActions.cancelEditForm());
  };

  return (
    <div>
      <Dialog open={formOpen} onClose={handleClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your expense, please enter given fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Dscription"
            placeholder="expense description"
            type="text"
            fullWidth
            variant="standard"
            value={newDescription}
            onChange={descriptionChangeHandler}
          />
          <Grid
            align="left
          "
          >
            <TextField
              label="Amount"
              id="amount-input"
              placeholder="Expense Amount"
              type="number"
              variant="outlined"
              value={newAmount}
              onChange={amountChangeHandler}
              sx={{ mt: 1, width: "50%" }}
            />
            <TextField
              id="filled-select-category"
              select
              label="Select"
              defaultValue=" "
              helperText="expense category"
              value={newType}
              onChange={expenseTypeChangeHandler}
              variant="filled"
              sx={{ mt: 1, width: "50%" }}
            >
              {Type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <TextField
            fullWidth
            type="date"
            value={newDate}
            onChange={dateChangeHandler}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateExpenseHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
