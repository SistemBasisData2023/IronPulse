import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ratings = () => {
    const navigate = useNavigate();
  
    const onSBDGroupF6Click = useCallback(() => {
      navigate("/personal-trainers");
    }, [navigate]);

    return(
        <div className="relative bg-white w-full h-[2491px] overflow-hidden text-left text-[81.62px] text-white font-urbanist">

        </div>


    );
};
export default ratings;