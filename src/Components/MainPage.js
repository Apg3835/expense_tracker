
import { Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './MainPage.css'
export const MainPage=()=>{
    const navigate=useNavigate();
    const signUpFormHandler=()=>{
        navigate('/signinform')
    }
    return(
        <body>
       <div>
      <Paper
        elevation={50}
        sx={{
          padding: "30px 20px",
          width: 650,
          //  height: 8,
          margin: "20px auto",
          boxShadow: "5px 5px 5px #353738",
          backgroundColor: "#e8e4e3",
          border: 3,
          borderColor: "black",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          You haven't Log in to the app yet, kindly Log in or Sign up first to manage your Savings
        </h1>
        <button 
          style={{
            width: "80%",
            height: 35,
            border: 0,
            borderRadius: "10px",
            marginLeft: "50px",
            color: "white",
            backgroundColor: "black",
            cursor:'pointer'
          }}
          onClick={signUpFormHandler}
        >
          <strong >Log in</strong>
        </button>
      </Paper>
    </div>
        </body>
    )
}