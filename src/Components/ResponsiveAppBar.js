import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu"; 

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import CalculateIcon from "@mui/icons-material/Calculate";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authSliceActions } from "../reducer/authSlice";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { styled } from "@mui/material/styles";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { expenseDataActions } from "../reducer/expenseDataSlice";
import { saveAs } from "file-saver";


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function ResponsiveAppBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userProfileData);
  const subscribe = useSelector((state) => state.expenseTracker.isSubscribe);
  const listData=useSelector((state)=>state.expenseTracker.list);
 
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const profilePageHandler = () => {
    navigate("/profilepage");
  };
  const homePageHandler = () => {
    navigate("/");
  };

  const logOutButtonHandler = () => {
    dispatch(authSliceActions.userLogOut());
    dispatch(expenseDataActions.userLogout());
    navigate("/");
  };
  const darkModeOpenHandler = () => {
    dispatch(expenseDataActions.darkModeButton());
  };
  const downloadButtonHandler = () => {
    const csvDownload=listData.map((expense)=>`ID: ${expense.id}, Title: ${expense.type},  ${expense.description}, Rs${expense.amount}/-,  ${expense.date}\n`).join("");
    const blob=new Blob([csvDownload], {type: "text/csv;charset=utf-8"});
    saveAs(blob, "expense.csv");
    
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CalculateIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
              width: 40,
              height: 60,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={homePageHandler}
          >
            DAILY EXPENSE TRACKER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <CalculateIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 2,
              height: 60,
              width: 40,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={homePageHandler}
          >
            DAILY EXPENSE TRACKER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}></Box>
          {subscribe ? (
            <>
              {" "}
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                onClick={darkModeOpenHandler}
              />
              <DownloadForOfflineIcon
                fontSize="large"
                sx={{ mr: 2, mt: 0.5 }}
                onClick={downloadButtonHandler}
              />
            </>
          ) : (
            <></>
          )}
          {userData && (
            <Typography
              onClick={logOutButtonHandler}
              sx={{ cursor: "pointer" }}
            >
              Log Out
            </Typography>
          )}
          &nbsp;&nbsp;&nbsp;
          <Box sx={{ flexGrow: 0 }}>
            {userData ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={userData.photoUrl} />
              </IconButton>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                {userData ? (
                  <Typography textAlign="center" onClick={logOutButtonHandler}>
                    Log Out
                  </Typography>
                ) : (
                  <Link
                    to="/signinform"
                    textAlign="center"
                    textDecoration="none"
                  >
                    Log In
                  </Link>
                )}
              </MenuItem>
             { userData && <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={profilePageHandler}>
                  My Profile
                </Typography>
              </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
