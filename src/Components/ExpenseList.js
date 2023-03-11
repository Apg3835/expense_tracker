import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  deleteExpenseAction,
  getExpenseAction,
} from "../reducer/asyncExpenseTrackerReducer";
import { expenseDataActions } from "../reducer/expenseDataSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ExpenseList() {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.expenseTracker.list);
  const userData = useSelector((state) => state.auth.userProfileData);

  console.log(listData);

  let total = 0;
  listData.map((item) => {
    total = total + +item.amount;
  });

  const deleteButtonhandler = (key) => {
    const localId = userData.localId;
    dispatch(deleteExpenseAction({ key: key, localId: localId }));
    setTimeout(() => {
      dispatch(getExpenseAction(localId));
    }, 1000);
  };
  const editFormOpenHandler = (editExpense) => {
    dispatch(expenseDataActions.editFormOpen(editExpense));
  };
  
  return (
    <Grid align="center">
      <TableContainer component={Paper} sx={{ width: "95%", mb: 1 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Expense Type</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">DELETE/EDIT</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {data.description}
                </StyledTableCell>
                <StyledTableCell align="center">{data.type}</StyledTableCell>
                <StyledTableCell align="center">
                  ₹ {data.amount}
                </StyledTableCell>
                <StyledTableCell align="center">{data.date}</StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteTwoToneIcon
                    onClick={() => deleteButtonhandler(data.key)}
                    sx={{ color: "#d62b2b", cursor: "pointer" }}
                  />

                  <EditTwoToneIcon
                    onClick={() => editFormOpenHandler(data)}
                    sx={{ color: "#1db345", cursor: "pointer" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}

            <StyledTableRow>
              <StyledTableCell
                sx={{ backgroundColor: "black" ,color:'white'}}
                align="center"
              >
                TOTAL
              </StyledTableCell>
              <StyledTableCell
                sx={{ backgroundColor: "#cdcfd1" }}
              ></StyledTableCell>
              <StyledTableCell
                sx={{ backgroundColor: "#cdcfd1" }}
              ></StyledTableCell>
              <StyledTableCell
                sx={{ backgroundColor: "#cdcfd1" }}
              ></StyledTableCell>

              <StyledTableCell
                align="center"
                sx={{ backgroundColor: "black" ,color:'white'}}
              >
                {" "}
                 ₹{total}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
