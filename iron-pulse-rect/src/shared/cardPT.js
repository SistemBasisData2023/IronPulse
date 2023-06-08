import React, { useState } from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import Rating from "./rating";
import Button from "@mui/material/Button";

const CardReview = ({ pt }) => {
  const { id, name, age, gender, avgRating } = pt;
  const [currentRating, setCurrentRating] = useState(avgRating || 0);

  const handleRate = (newRating) => {
    setCurrentRating(newRating);
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
            Age: <span>{age}</span>
          </h3>
          <h3>
            Gender: <span>{gender}</span>
          </h3>
        </div>
        <div className="card-rating">
          <div className="rating-container">
            <Link to="/ratings">
              <Button variant="contained" onClick={() => handleRate(0)}>
                Rating : <span>{avgRating}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
