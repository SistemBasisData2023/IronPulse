import React, { useState } from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";
import Rating from "./rating";
import Button from "@mui/material/Button";

const CardBooking = ({ bookings }) => {
  const { id, workout_name, pt_name, date, time, rating } = bookings;
  const [currentRating, setCurrentRating] = useState(rating || 0);

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
          <h1 className="card-title -mb-2">{workout_name}</h1>
          <h2 className="card-subtitle text-sm mb-2">{pt_name}</h2>
          <h3>
            Date: <span>{date}</span>
          </h3>
          <h3>
            Time: <span>{time}</span>
          </h3>
        </div>
        <div className="card-rating">
          <div className="rating-container">
            <Rating
              value={currentRating}
              readOnly={false}
              onRate={handleRate}
            />
            <Button variant="contained" onClick={() => handleRate(0)}>
              Rate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBooking;
