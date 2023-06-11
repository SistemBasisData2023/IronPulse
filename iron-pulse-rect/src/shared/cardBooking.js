import React, { useState } from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CardBooking = ({ bookings }) => {
  const { workout, pt_name, start_time, end_time, class_date, rating, personal_trainer_id } = bookings;
  const [currentRating, setCurrentRating] = useState(rating || 0);
  const [ratingText, setRatingText] = useState("");
  const isRatingNull = rating === null;
  console.log(rating);
  const userId = localStorage.getItem("user_id");

  const handleRate = (newRating) => {
    setCurrentRating(newRating);

    // Prepare the rating data to send to the backend
    const ratingData = {
      personal_trainer_id: personal_trainer_id, // Replace with the actual personal_trainer_id
      user_id: userId, // Replace with the actual user_id
      rating: newRating,
      comment: ratingText,
    };

    // Make the HTTP POST request
    axios.post("http://localhost:3300/insert_ratings", ratingData)
      .then((response) => {
        console.log(response.data); // Success message from the backend
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card lg:card-side bg-white shadow-xl w-flex lg:max-w-xl">
      <figure>
        <img src="https://picsum.photos/200" alt="Album" />
      </figure>
      <div className="card-body">
        <div className="card-info">
          <h1 className="card-title -mb-2">{workout}</h1>
          <h2 className="card-subtitle text-sm mb-2">{pt_name}</h2>
          <h3>
            Date: <span>{class_date}</span>
          </h3>
          <h3>
            Time: <span>{start_time}</span> - <span>{end_time}</span>
          </h3>
        </div>
        <div className="card-rating">
          <div className="rating-container">
            {isRatingNull ? (
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star ${
                        star <= currentRating ? "gold" : "gray"
                      }`}
                      onClick={() => handleRate(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="text-input">
                  <TextField
                    label="Enter your rating text"
                    value={ratingText}
                    onChange={(event) => setRatingText(event.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            ) : (
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star ${
                        star <= currentRating ? "gold" : "gray"
                      }`}
                      disabled
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
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

export default CardBooking;
