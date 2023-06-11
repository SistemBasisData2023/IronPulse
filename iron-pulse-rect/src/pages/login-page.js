import { useCallback } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from '@mui/material';

import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar";
import * as React from "react";
import axios from "axios";
import qs from "qs";


const LoginPage = () => {
  const navigate = useNavigate();
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false); // State to control the visibility of success message
  const [isErrorOpen, setIsErrorOpen] = React.useState(false); // State to control the 
 
  const [name, setName] = React.useState(null);
  const [bday, setBday] = React.useState(null);
  const [gender, setGender] = React.useState("Female");
  const [email, setEmail] = React.useState(null);
  const [pass, setPass] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [phone, setPhone] = React.useState(null);


  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false); // Close the snackbar
  };


  const onLoginClick = async (e) => {
    const data = {
      email: email,
      pass: pass,
    };

    console.log("Email:", data.email);
    console.log("Password:", data.pass);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const formData = qs.stringify(data);

    axios
      .post("http://localhost:3300/login_member", formData, config)
      .then((response) => {
        const responseData = response.data;
    console.log(responseData); // You can customize this based on your requirements

    const { user_id, message, admin_priv } = responseData;
    console.log("User ID:", user_id);
    console.log("Message:", message);
    localStorage.setItem("user_id", user_id);
    console.log(localStorage);

    if (admin_priv == t){
      navigate("/admin")
    }else{
      navigate("/home")
    }
    
  

        

    
        // navigate("/home");
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      
        setIsErrorOpen(true); // Open the error message

      });



    // navigate("/home");
  };
  

  const onRegisterClick = useCallback(() => {
    navigate("/register-page");
  }, [navigate]);

  const handleSuccessClose = () => {
    setIsSuccessOpen(false); // Close the success message
  };

  const handleErrorClose = () => {
    setIsErrorOpen(false); // Close the error message
  };

  return (
    <div className="relative bg-white w-full h-[1080px] overflow-hidden text-left text-[53.77px] text-white font-urbanist">
      <img
        className="absolute h-[138.89%] w-[117.19%] top-[0%] right-[-17.19%] bottom-[-38.89%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/bg-image@2x.png"
      />
      <b className="absolute top-[27px] left-[190px] text-center">Iron Pulse</b>
      <div className="absolute top-[42px] right-[190.6px] w-[252.09px] h-9 flex flex-row items-center justify-start gap-[14px] text-[22.98px]">
        <div
          className="relative font-medium flex items-center w-[97.09px] h-[17.81px] shrink-0 cursor-pointer"
          onClick={onRegisterClick}>
          Register
        </div>
        <div className="rounded-[40px] bg-gainsboro w-[140px] h-9 flex flex-col py-0 px-[25px] box-border items-end justify-center text-center text-[18px] text-black">
          <div className="relative font-semibold flex items-center justify-center w-[87px] h-[16.5px] shrink-0">
            About US
          </div>
        </div>
      </div>
      <div className="absolute top-[439px] left-[190px] flex flex-col items-start justify-start gap-[27px] text-[58.45px]">
        <div className="relative font-semibold inline-block w-[685px]">
          Welcome back,
        </div>
        <div className="w-[503px] h-[147px] flex flex-col pt-0 px-0 pb-[19px] box-border items-center justify-start">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className="[border:none] bg-[transparent] relative"
            sx={{ width: 500 }}
            color="primary"
            variant="standard"
            type="email"
            label="E-mail address"
            placeholder="Enter your e-mail address"
            size="medium"
            margin="normal"
            InputProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
                borderBottom: "1px solid white",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              },
            }}
          />

          <TextField
            onChange={(e) => setPass(e.target.value)}
            className="[border:none] bg-[transparent] relative"
            sx={{ width: 500 }}
            color="primary"
            variant="standard"
            type="password"
            label="Password"
            placeholder="Enter your password"
            size="medium"
            margin="normal"
            InputProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
                borderBottom: "1px solid white",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              },
            }}
          />
          <img
            className="relative w-[500px] h-px hidden"
            alt=""
            src="/line-1.svg"
          />
        </div>
        <button
          className="cursor-pointer [border:none] p-0 bg-white rounded-31xl w-[503px] h-[52px] flex flex-col items-center justify-center"
          onClick={onLoginClick}>
          <div className="relative text-11xl font-semibold font-urbanist text-black text-center flex items-center justify-center w-[109.15px] h-[26.58px] shrink-0">
            Login
          </div>
        </button>

        {/* Success message */}
      <Snackbar open={isSuccessOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
        <div onClose={handleSuccessClose} severity="success">
          Login successful!
        </div>
      </Snackbar>

      {/* Error message */}
      <Snackbar open={isErrorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
        <div onClose={handleErrorClose} severity="error">
          An error occurred during login.
        </div>
      </Snackbar>
        
      </div>
      
    </div>
  );
};

export default LoginPage;
