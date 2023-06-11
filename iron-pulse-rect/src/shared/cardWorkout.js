import React from "react";
import moment from "moment";
import axios from "axios";
import "./card.css";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Card = ({ gym }) => {
  const { class_id, pt_name, difficulty, calories, class_date, start_time, end_time } = gym;

  // Format the class date
  const formattedDate = moment(class_date).format("YYYY-MM-DD");

  // Format the start time
  const formattedStartTime = moment(start_time).format("HH:mm");

  const navigate = useNavigate();

  const handleBook = async () => {
    try {
      const userId = localStorage.getItem("user_id"); // Retrieve the user ID from localStorage
      if (!userId) {
        // Handle the case when user ID is not available
        console.log("User ID not found in localStorage");
        return;
      }

      const response = await axios.post("http://localhost:3300/add_booking", {
        class_id,
        user_id: userId,
      });

      console.log(response.data); // Handle the response as needed

      // Show popup with response data
      alert(response.data)

      // Redirect to the home page
      navigate("/home");

    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  return (
    <div className="card lg:card-side bg-white shadow-xl w-full sm:w-auto ">
      <figure>
        <img src="https://picsum.photos/200" alt="Album" />
      </figure>
      <div className="card-body">
        <h1 className="card-title -mb-2">{pt_name}</h1>
        <h2 className="card-subtitle text-sm mb-2">{difficulty}</h2>
        <h3 className="card-info">
          Date: <span>{formattedDate}</span>
        </h3>
        <h3 className="card-info">
          Time: <span>{formattedStartTime}</span> - <span>{end_time}</span>
        </h3>
        <div className="card-actions">
          <button className="btn btn-primary bg-yellow-500 text-black focus:outline-none" onClick={handleBook}>
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
