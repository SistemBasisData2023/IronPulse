import { useCallback } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

  const navigate = useNavigate();

  //Navigate to login page whet onRegisterClick is pressed
  const onRegisterClick = useCallback(() => {
    navigate("/");
    }, [navigate]);


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
      <div className="absolute top-[27px] left-[190px] w-[1540px] h-[65px]">
        <b className="absolute top-[0px] left-[0px]">Iron Pulse</b>
        <div className="absolute top-[15px] right-[0px] w-[222.4px] h-9 text-left text-[22.98px]">
          <div className="absolute top-[7.72px] right-[125.32px] flex flex-row items-center justify-end">
            <div className="relative font-medium flex items-center w-[97.09px] h-[17.81px] shrink-0">
              Register
            </div>
          </div>
          <div className="absolute top-[0px] right-[0px] w-[110px] h-9 text-center text-[15.1px] text-black">
            <div className="absolute top-[0px] right-[0px] rounded-[21px] bg-white w-[110px] h-9" />
            <div className="absolute top-[11.08px] right-[19px] font-semibold flex items-center justify-center w-[73px] h-[13.84px]">
              About US
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[212px] left-[190px] w-[503px] h-[735px] text-left text-[58.45px]">
        <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[31px]">
          <div className="relative font-semibold">Introduce yourself.</div>
          <div className="flex flex-col items-start justify-start gap-[53px] text-8xl text-gray-200">
            <div className="relative w-[500px] h-[34px]">
              <TextField
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
            }}
              />
              {/* <img
                className="absolute top-[31px] left-[-1px] w-[502px] h-0.5"
                alt=""
                src="/line-11.svg"
              /> */}
            </div>
            <div className="relative w-[500px] h-[34px]">
              <TextField
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
                borderBottom: "1px solid white"
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
              }
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
          onClick={onRegisterClick}
>
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
