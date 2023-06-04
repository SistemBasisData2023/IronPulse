import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const WorkoutSelect = () => {
  const navigate = useNavigate();

  const onSBDGroupF6Click = useCallback(() => {
    navigate("/personal-trainers");
  }, [navigate]);

  return (
    <div className="relative bg-white w-full h-[2491px] overflow-hidden text-left text-[81.62px] text-white font-urbanist">
      <div className="absolute top-[118px] left-[0px] w-[1920px] h-[461px]">
        <img
          className="absolute top-[0px] left-[calc(50%_-_960px)] w-[1920px] h-[461px] object-cover"
          alt=""
          src="/bg-image1@2x.png"
        />
        <div className="absolute top-[0px] left-[0px] [background:linear-gradient(180deg,_#000_2.43%,_rgba(0,_0,_0,_0)_36.83%)] w-[1920px] h-[461px]" />
        <div className="absolute top-[0px] left-[0px] [background:linear-gradient(89.59deg,_#000,_rgba(0,_0,_0,_0.71)_47.21%,_rgba(0,_0,_0,_0)_59.51%)] w-[1920px] h-[461px]" />
      </div>
      <div className="absolute top-[447px] left-[190px] font-semibold">
        Workout Name
      </div>
      <div className="absolute top-[591px] left-[calc(50%_-_220px)] text-51xl font-semibold text-black">
        Book your class
      </div>

      <div className="absolute top-[692px] left-[calc(50%_-_770px)] flex flex-row items-start justify-center gap-[77px] text-[25.34px] text-black">
        <div className="h-[486px] w-full flex flex-col items-start justify-start gap-[50px]">

          {/* Card buat per class */}
          <div className="card lg:card-side bg-white shadow-xl w-full sm:w-auto max-w-[706px]" style={{ maxHeight: '243px', maxWidth: '706px', width: '100%' }}>
          <figure style={{ width: '243px', height: '243px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://picsum.photos/200" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </figure>
            <div className="card-body">
              <h1 className="card-title -mb-2">PT Name</h1>
              <h2 className="card-subtitle text-sm mb-2">Difficulty - Calories</h2>
              <h3 className="font-semibold" style={{ fontSize: '17px' }}>Date: <span className="font-normal">13.00 - 14.00</span></h3>
              <h3 className="font-semibold" style={{ fontSize: '17px' }}>Time: <span className="font-normal">13.00 - 14.00</span></h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary bg-yellow-500 text-black focus:outline-none">BOOK</button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[486px] w-full flex flex-col items-start justify-start gap-[50px]">

        <div className="card lg:card-side bg-white shadow-xl" style={{ maxHeight: '243px', maxWidth: '706px', width: '100%'  }}>
          <figure style={{ width: '243px', height: '243px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://picsum.photos/200" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </figure>
            <div className="card-body">
              <h1 className="card-title -mb-2">PT Name</h1>
              <h2 className="card-subtitle text-sm mb-2">Difficulty - Calories</h2>
              <h3 className="font-semibold" style={{ fontSize: '17px' }}>Date: <span className="font-normal">13.00 - 14.00</span></h3>
              <h3 className="font-semibold" style={{ fontSize: '17px' }}>Time: <span className="font-normal">13.00 - 14.00</span></h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary bg-yellow-500 text-black focus:outline-none">BOOK</button>
              </div>
            </div>
          </div>
  
        </div>
      </div>
      <div className="absolute w-full top-[0px] right-[0px] left-[0px] bg-black h-[118px] flex flex-row py-0 px-[188px] box-border items-center justify-between text-center text-[53.77px]">
        <div className="flex flex-col items-start justify-center">
          <b className="relative">Iron Pulse</b>
        </div>
        <div className="flex flex-row items-center justify-center gap-[112px] text-right text-[22.98px]">
          <div className="flex flex-row items-center justify-end gap-[44px]">
            <div className="relative font-medium">Log Out</div>
            <div className="relative font-medium flex items-center w-[173px] h-[18px] shrink-0">
              Personal Trainers
            </div>
            <div className="relative font-medium flex items-center w-[130px] h-[18px] shrink-0">
              My Courses
            </div>
          </div>
          <img
            className="relative rounded-[50%] w-[54px] h-[54px] object-cover"
            alt=""
            src="/ellipse-1@2x.png"
          />
        </div>
      </div>
      <div className="absolute w-full top-[2409px] right-[0px] left-[0px] bg-black h-[82px] flex flex-row py-0 px-[188px] box-border items-center justify-between text-21xl">
        <div className="relative tracking-[0.09em] font-semibold flex items-center w-[341px] h-[27px] shrink-0">
          Iron Pulse
        </div>
        <div
          className="relative text-[22.98px] font-medium flex items-center w-[244.51px] h-[17.98px] shrink-0 cursor-pointer"
          onClick={onSBDGroupF6Click}>
          © SBD Group F6
        </div>
      </div>
    </div>
  );
};

export default WorkoutSelect;
