import { useCallback } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  function handleClick() {
    // Perform actions when the button is clicked
    console.log("Button clicked!");
  }
  

  const onRegisterTextClick = useCallback(() => {
    navigate("/register-page");
  }, [navigate]);

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
          onClick={onRegisterTextClick}
        >
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
            className="[border:none] bg-[transparent] relative"
            sx={{ width: 493 }}
            color="primary"
            variant="standard"
            type="text"
            label="E-mail address"
            placeholder="Placeholder"
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
    
          <TextField
            className="[border:none] bg-[transparent] relative"
            sx={{ width: 495 }}
            color="primary"
            variant="standard"
            type="password"
            label="Password"
            placeholder="Enter your password"
            size="medium"
            margin="none"
            InputProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white",
                borderBottom: "1px solid white"
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Urbanist', sans-serif",
                color: "white"
              }
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
          onClick={handleClick}
>
          <div className="relative text-11xl font-semibold font-urbanist text-black text-center flex items-center justify-center w-[109.15px] h-[26.58px] shrink-0">
            Login
          </div>
        </button>

      </div>
    </div>
  );
};

export default LoginPage;
