import { useCallback } from "react";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar";
import * as React from "react";
import axios from "axios";
import qs from "qs";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState(null);
  const [bday, setBday] = React.useState(null);
  const [gender, setGender] = React.useState("Female");
  const [email, setEmail] = React.useState(null);
  const [pass, setPass] = React.useState(null);
  const [confirmpass, setConfirmPass] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [phone, setPhone] = React.useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value); // Update the state with the selected value
  };

  //Navigate to login page whet onRegisterClick is pressed
  // const onRegisterClick = useCallback(() => {
  //   navigate("/");
  // }, [navigate]);

  const onRegisterClick = async (e) => {
    const data = {
      name: name,
      email: email,
      pass: pass,
      phone: phone,
      bdate: bday,
      weight: weight,
      height: height,
      bmi: weight / ((height / 100) * (height / 100)), // Calculate BMI based on weight and height
      gender: gender,
      admin_priv: "True", // Set the admin privilege value here if needed
      accountimg_url: "kuda", // Set the account image URL here if needed
      age: new Date().getFullYear() - new Date(bday).getFullYear(), // Calculate age based on birthdate
    };

    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("Password:", data.pass);
    console.log("Phone:", data.phone);
    console.log("Birthdate:", data.bdate);
    console.log("Weight:", data.weight);
    console.log("Height:", data.height);
    console.log("BMI:", data.bmi);
    console.log("Gender:", data.gender);
    console.log("Admin Privilege:", data.admin_priv);
    console.log("Account Image URL:", data.accountimg_url);
    console.log("Age:", data.age);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const formData = qs.stringify(data);

    axios
      .post("http://localhost:3200/register", formData, config)
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data); // You can customize this based on your requirements
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });

    //navigate("/");
  };

  return (
    <div className="relative bg-white w-full h-[1186px] overflow-hidden text-center text-[53.77px] text-white font-urbanist">
      <div className="absolute top-[-144px] left-[-144px] w-[2250px] h-[1500px]">
        <img
          className="absolute top-[144px] left-[144px] w-[2250px] h-[1500px] object-cover"
          alt=""
          src="/image-1@2x.png"
        />
        <div className="absolute top-[0px] left-[0px] [background:linear-gradient(180deg,_#000_2.43%,_rgba(0,_0,_0,_0)_36.83%)] w-[2250px] h-[1500px]" />
        <div className="absolute top-[0px] left-[0px] [background:linear-gradient(89.59deg,_#000,_rgba(0,_0,_0,_0.71)_47.21%,_rgba(0,_0,_0,_0)_59.51%)] w-[2250px] h-[1500px]" />
      </div>
      <Navbar />
      <div className="absolute top-[212px] left-[190px] w-[503px] h-[735px] text-left text-[58.45px]">
        <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[31px]">
          <div className="relative font-semibold">Introduce yourself.</div>
          <div className="flex flex-col items-start justify-start gap-[53px] text-8xl text-gray-200">
            <div className="relative w-[500px] h-[34px]">
              <TextField
                onChange={(e) => setName(e.target.value)}
                className="[border:none] bg-[transparent] relative"
                sx={{ width: 500 }}
                color="primary"
                variant="standard"
                type="text"
                label="Name"
                placeholder="Enter your name"
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
              {/* <img
                className="absolute top-[33px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
            <div className="relative w-[500px] h-8">
              <TextField
                onChange={(e) => setBday(e.target.value)}
                className="[border:none] bg-[transparent] relative"
                sx={{ width: 500 }}
                color="primary"
                variant="standard"
                type="date"
                label="Birth date"
                placeholder="Enter your birth date"
                size="medium"
                margin="normal"
                defaultValue=""
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
              {/* <img
                className="absolute top-[31px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ color: "white", fontFamily: "Urbanist, sans-serif" }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Female"
                name="radio-buttons-group"
                value={gender} // Set the selected value from the state
                onChange={handleGenderChange} //
              >
                <FormControlLabel
                  style={{ color: "white", fontFamily: "Urbanist, sans-serif" }}
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  style={{ color: "white", fontFamily: "Urbanist, sans-serif" }}
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <div className="relative w-[500px] h-[34px]">
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                className="[border:none] bg-[transparent] relative"
                sx={{ width: 500 }}
                color="primary"
                variant="standard"
                type="tel"
                label="Phone"
                placeholder="Enter your phone number"
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
              {/* <img
                className="absolute top-[33px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
            <div className="flex flex-row items-start justify-start gap-[35px]">
              <div className="relative w-[232px] h-[34px]">
                <TextField
                  onChange={(e) => setWeight(e.target.value)}
                  className="[border:none] bg-[transparent] relative"
                  sx={{ width: 230 }}
                  color="primary"
                  variant="standard"
                  type="number"
                  label="Weight"
                  placeholder="Enter your weight"
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
                {/* <img
                  className="absolute top-[33px] left-[-1px] w-[234px] h-0.5"
                  alt=""
                  src="/line-12.svg"
                /> */}
              </div>
              <div className="relative w-[232px] h-[35px]">
                <TextField
                  onChange={(e) => setHeight(e.target.value)}
                  className="[border:none] bg-[transparent] relative"
                  sx={{ width: 230 }}
                  color="primary"
                  variant="standard"
                  type="number"
                  label="Height"
                  placeholder="Enter your height"
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
                {/* <img
                  className="absolute top-[34px] left-[-1px] w-[234px] h-0.5"
                  alt=""
                  src="/line-12.svg"
                /> */}
              </div>
            </div>
            <div className="relative w-[500px] h-[34px]">
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
              {/* <img
                className="absolute top-[33px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
            <div className="relative w-[500px] h-[34px]">
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
              {/* <img
                className="absolute top-[33px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
            <div className="relative w-[500px] h-[34px]">
              <TextField
                onChange={(e) => setConfirmPass(e.target.value)}
                className="[border:none] bg-[transparent] relative"
                sx={{ width: 500 }}
                color="primary"
                variant="standard"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
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
              {/* <img
                className="absolute top-[33px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
          </div>
          {/* ... */}
          <button
            className="cursor-pointer [border:none] p-0 bg-white rounded-31xl w-[503px] h-[52px] flex flex-col items-center justify-center mt-5"
            onClick={onRegisterClick}>
            <div className="relative text-11xl font-semibold font-urbanist text-black text-center flex items-center justify-center w-[109.15px] h-[26.58px] shrink-0">
              Register
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
