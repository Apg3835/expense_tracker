import * as React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";

import PostAddIcon from "@mui/icons-material/PostAdd";

import MenuItem from "@mui/material/MenuItem";

import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addExpenseAction,
  getExpenseAction,
} from "../reducer/asyncExpenseTrackerReducer";
import { expenseDataActions } from "../reducer/expenseDataSlice";

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

const ExpenseTrackerMainForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userProfileData);
  const listData = useSelector((state) => state.expenseTracker.list);
  // console.log(userData);

  const [description, setDiscription] = React.useState("");

  const [amount, setAmount] = React.useState("");
  const [expenseType, setExpenseType] = React.useState("");

  const [date, setDate] = React.useState();

  let total = 0;
  listData.map((data) => {
    total = total + +data.amount;
  });
  React.useEffect(()=>{
    if(total<10000){
      dispatch(expenseDataActions.hideSubscribeButton())
    }
  },[total])

  const descriptionChangeHandler = (e) => {
    setDiscription(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };
  const expenseTypeChangeHandler = (e) => {
    setExpenseType(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const cancelButtonHandler = () => {
    navigate("/");
  };
  const subscribeClickHandler = () => {
    dispatch(expenseDataActions.subscribeButton());
  };
  const addNewExpenseHandler = (e) => {
    e.preventDefault();
    const localId = userData.localId;
    const addExpenseObj = {
      id: Math.random(),
      expenseDescription: description,
      expenseAmount: amount,
      expenseType: expenseType,
      expenseDate: date,
      localId: localId,
    };
    // console.log(addExpenseObj);
    dispatch(addExpenseAction(addExpenseObj));
    setTimeout(() => {
      dispatch(getExpenseAction(localId));
    }, 1000);

    setDiscription("");
    setAmount("");
    setExpenseType("");
    setDate("");
    navigate("/");
  };

  return (
    <Grid align="center" sx={{ mt: 5 }}>
      <Box>
        <Paper
          elevation={20}
          sx={{
            padding: "80px 20px",
            width: "50%",
            height: "50%",
            margin: "20px auto",
            boxShadow: "5px 5px 5px #353738",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "green",
              mt: -8,
              height: "40px",
              width: "40px",
            }}
          >
            <PostAddIcon />
          </Avatar>
          <h2 style={{ margin: 1 }}>EXPENSE MANAGER</h2>
          <hr />
          <TextField
            fullWidth
            id="description-input"
            label="Description"
            placeholder="Expense Description"
            value={description}
            onChange={descriptionChangeHandler}
            variant="outlined"
          />
          <Grid
            align="left
          "
          >
            <TextField
              label="Amount"
              id="amount-input"
              placeholder="Expense Amount"
              variant="outlined"
              value={amount}
              onChange={amountChangeHandler}
              sx={{ mt: 1, width: "50%" }}
            />
            <TextField
              id="filled-select-category"
              select
              label="Select"
              defaultValue=" "
              helperText="expense category"
              value={expenseType}
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
            value={date}
            onChange={handleDateChange}
          ></TextField>

          <Stack
            spacing={2}
            mt={3}
            justifyContent="space-between"
            direction="row"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={addNewExpenseHandler}
              sx={{ boxShadow: "4px 4px 4px #a5baf0", width: "30%" }}
            >
              ADD
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={cancelButtonHandler}
              sx={{ boxShadow: "4px 4px 4px #f09999", width: "30%" }}
            >
              CANCEL
            </Button>
          </Stack>
          <Stack
            spacing={2}
            
            justifyContent="space-between"
            direction="row"
          >
            {total >= 10000 && (
              <Button
                type="submit"
                variant="contained"
                // color="warning"
                sx={{ boxShadow: "4px 4px 4px #a5baf0", width: "30%", mt: 10 ,m:"auto",backgroundColor:"gold",color:'black',":hover":{"&:hover":{
                  backgroundColor:"#f7c41e"
                }}}}
                onClick={subscribeClickHandler}>
                activate premium
              </Button>
            )}
          </Stack>
        </Paper>
      </Box>
    </Grid>
  );
};

export default ExpenseTrackerMainForm;
