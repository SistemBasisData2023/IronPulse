import React, { useState } from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";


import Button from "@mui/material/Button";

const CardPT = ({ pt }) => {
  const { personal_trainer_id, name, age, gender, avgRating } = pt;
  const [currentRating, setCurrentRating] = useState(avgRating || 0);
  const [ratingData, setRatingData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRate = async () => {
    console.log("data" + personal_trainer_id);
    try {
      const response = await axios.get("http://localhost:3300/getrating", {
        params: {
          personal_trainer_id: personal_trainer_id,
        },
      });
  
      const data = response.data.ratings;
      setRatingData(data);
      console.log(data);
  
      navigate("/ratings", { state: { ratingData: data } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card lg:card-side bg-white shadow-xl w-flex lg:max-w-xl">
      <figure>
        <img src="https://picsum.photos/200" alt="Album" />
      </figure>
      <div className="card-body">
        <div className="card-info">
          <h1 className="card-title -mb-2">{name}</h1>
          <h3>
            Gender: <span>{gender}</span>
          </h3>
        </div>
        <div className="card-rating">
          <div className="rating-container">
              <Button variant="contained" onClick={() => handleRate(0)}>
                Rating : <span>{avgRating}</span>
              </Button>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPT;
