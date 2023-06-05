import React from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";

const CardBooking = ({ bookings }) => {
  const {id, workout_name, pt_name, date, time} = bookings;

  return (
    <div className="card lg:card-side bg-white shadow-xl w-full sm:w-auto ">
    <figure>
      <img
        src="https://picsum.photos/200"
        alt="Album"
      />
    </figure>
    <div className="card-body">
      <h1 className="card-title -mb-2"></h1> {workout_name}
      <h2 className="card-subtitle text-sm mb-2">{pt_name}</h2>
      <h3 className="card-info">Date: <span>{date}</span></h3>
      <h3 className="card-info">Time: <span>{time}</span></h3>
      <div className="card-actions">
        <button className="btn btn-primary bg-yellow-500 text-black focus:outline-none">DONE</button>
        <button className="btn bg-093052 text-white focus:outline-none">CANCEL</button>
        <button className="btn bg-E13030 text-white focus:outline-none">WHITE</button>
      </div>
    </div>
  </div>
  
  );
};

export default CardBooking;
