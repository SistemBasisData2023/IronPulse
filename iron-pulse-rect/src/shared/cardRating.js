import React, { useState } from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";
import Rating from "./rating";
import Button from "@mui/material/Button";

const CardRating = ({ rate }) => {
  const { rating_id, account_name, personal_trainer_id, user_id, rating, comment } = rate;
  const [currentRating, setCurrentRating] = useState(rating || 0);

  const handleRate = (newRating) => {
    setCurrentRating(newRating);
  };

  const isRatingNull = rating === null;

  return (
    <div className="card lg:card-side bg-white shadow-xl w-flex lg:max-w-xl">
      <figure>
        <img src="https://picsum.photos/200" alt="Album" />
      </figure>
      <div className="card-body">
        <div className="card-info">
          <h1 className="card-title -mb-2">{account_name}</h1>
          <h3>
            Rating: <span>{rating}</span>
          </h3>
          <h3>
            <span>{comment}</span>
          </h3>
        </div>
        <div className="card-rating">
          <div className="rating-container">
            {isRatingNull && (
              <Rating
                value={currentRating}
                readOnly={false}
                onRate={handleRate}
              />
            )}
            {isRatingNull && (
              <Button variant="contained" onClick={() => handleRate(0)}>
                Rate
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRating;
