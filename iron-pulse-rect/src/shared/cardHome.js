import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, buttonText }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/workout");
  };

  return (
    <div className="card w-96 bg-white shadow-xl text-base-content font-urbanist max-h-96">
      <figure className="px-10 pt-10">
        <img
          src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn btn-primary bg-yellow-500 text-black" onClick={handleButtonClick}>
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
