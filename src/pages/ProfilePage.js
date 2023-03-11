import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../reducer/authSlice";
import { expenseDataActions } from "../reducer/expenseDataSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate("");

  const profileData = useSelector((state) => state.auth.userProfileData);
  console.log(profileData);

  const profileFormHandler = () => {
    navigate("/updateprofileform");
  };
  const expenseListHandler=()=>{
    navigate('/');
  }

  const logOutButtonHandler = () => {
    dispatch(authSliceActions.userLogOut());
    dispatch(expenseDataActions.userLogout());
    navigate("/");
  };
  return (
    <div>
      <Box>
        <Paper
          elevation={20}
          sx={{
            padding: "80px 20px",
            width: 600,
            height: 100,
            margin: "20px auto",
            boxShadow: "5px 5px 5px #353738",
          }}
        >
          <Grid>
            {profileData ? (
              <Avatar
                src={profileData.photoUrl}
                sx={{ height: "180px", width: "180px", ml: 52, mt: -4 }}
              />
            ) : (
              <Avatar
                src="/broken-image.jpg"
                sx={{ height: "180px", width: "180px", ml: 52, mt: -4 }}
              />
            )}
          </Grid>
          <h1>
            <Typography sx={{ fontSize: 50, mt: -26 }}>
              {profileData && profileData.displayName}
            </Typography>
          </h1>
          <h4>
            <Typography sx={{ fontSize: 20, mt: -3 }}>
              {profileData && profileData.email}
            </Typography>
          </h4>
          <Typography
            sx={{ mt: 7, fontSize: 17, color: "red", cursor: "pointer" }}
            onClick={profileFormHandler}
          >
            View activity <ArrowRightIcon sx={{ mb: -0.8 }} />
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ mt: -1.9 }}>
        <Paper
          elevation={80}
          sx={{
            padding: "30px 20px",
            width: 600,
            height: 30,
            margin: "20px auto",
            boxShadow: "5px 5px 5px #353738",
          }}
        >
          <Grid>
            <AutoStoriesIcon sx={{ width: 50, height: 50, mb: -1.5 }} />
            <ArrowForwardIosIcon
              sx={{ width: 30, height: 30, ml: 62, mt: -2 }}
            />
          </Grid>
          <Typography onClick={expenseListHandler}sx={{ fontSize: 25, ml: 10, mt: -5, cursor: "pointer" }}>
            Your Expenses
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: -1.9 }}>
        <Paper
          elevation={100}
          sx={{
            padding: "30px 20px",
            width: 600,
            height: 30,
            margin: "20px auto",
            boxShadow: "5px 5px 5px #353738",
          }}
        >
          <Grid>
            <LogoutIcon sx={{ width: 50, height: 50, mt: -2.4 }} />
            <ArrowForwardIosIcon
              sx={{ width: 30, height: 30, ml: 62, mt: -2 }}
            />
          </Grid>
          <Typography
            sx={{ fontSize: 25, ml: 10, mt: -5, cursor: "pointer" }}
            onClick={logOutButtonHandler}
          >
            Log Out
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}
