import React, { useState } from "react";
import "./Rating.css"; // Import CSS file for Rating component styles
import TextField from "@mui/material/TextField";


const Stars = ({ value, hoveredValue, onHover, onClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="stars">
      {stars.map((star) => (
        <button
          key={star}
          className={`star ${star <= (hoveredValue || value) ? "gold" : "gray"}`}
          onClick={() => onClick(star)}
          onMouseEnter={() => onHover(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const TextInput = ({ value, onChange }) => {
    return (
      <div className="text-input ">
        <TextField
          label="Enter your rating text"
          value={value}
          onChange={onChange}
          fullWidth
        />
      </div>
    );
  };

const Rating = ({ value, onRate }) => {
  const [hoveredValue, setHoveredValue] = useState(0);
  const [ratingText, setRatingText] = useState("");

  const handleMouseEnter = (star) => {
    setHoveredValue(star);
  };

  const handleMouseLeave = () => {
    setHoveredValue(0);
  };

  const handleClick = (star) => {
    if (onRate) {
      onRate(star, ratingText);
    }
  };

  const handleTextChange = (event) => {
    setRatingText(event.target.value);
  };

  return (
    <div className="rating" onMouseLeave={handleMouseLeave}>
      <Stars
        value={value}
        hoveredValue={hoveredValue}
        onHover={handleMouseEnter}
        onClick={handleClick}
      />
      <TextInput value={ratingText} onChange={handleTextChange} />
    </div>
  );
};

export default Rating;
