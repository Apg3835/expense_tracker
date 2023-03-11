import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ExpenseList from "./Components/ExpenseList";
import ExpenseSummary from "./Components/ExpenseSummary";
import ExpenseTrackerMainForm from "./Components/ExpenseTrackerMainForm";

import { MainPage } from "./Components/MainPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import ProfilePage from "./pages/ProfilePage";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import UpdateExpenseForm from "./pages/UpdateExpenseForm";
import UpdateProfileForm from "./pages/UpdateProfileForm";
import { getUserDataAction } from "./reducer/asyncAuthReducer";
import { getExpenseAction } from "./reducer/asyncExpenseTrackerReducer";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userProfileData);
  const formOpen = useSelector((state) => state.expenseTracker.editForm);
  const darkModeChange = useSelector(
    (state) => state.expenseTracker.isDarkMode
  );

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  useEffect(() => {
    if (userData !== undefined) {
      setTimeout(() => {
        dispatch(getExpenseAction(userData.localId));
      }, 1000);
    }
  }, [userData]);

  const darkTheme = createTheme({
    palette: {
      mode: darkModeChange ? "dark" : "light",
      
     
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {userData && (
                  <div>
                    {formOpen && <UpdateExpenseForm />}
                    <ExpenseTrackerMainForm />
                    <ExpenseList />
                  </div>
                )}
                {!userData && (
                  <divdiv>
                    <ExpenseSummary />
                    <MainPage />
                  </divdiv>
                )}
              </div>
            }
          ></Route>

          <Route path="signupform" element={<SignUpForm />}></Route>
          <Route path="signinform" element={<SignInForm />}></Route>
          <Route
            path="updateprofileform"
            element={<UpdateProfileForm />}
          ></Route>
          <Route
            path="forgotpasswordform"
            element={<ForgotPasswordForm />}
          ></Route>
          <Route path="profilepage" element={<ProfilePage />}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
