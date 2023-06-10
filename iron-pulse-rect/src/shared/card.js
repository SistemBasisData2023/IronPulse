import React from "react";
import "./card.css";
import { Container, Row, Col } from "reactstrap";

const Card = ({ gym }) => {
  const { id, pt_name, difficulty, calories, date, duration } = gym;

  return (
    <div className="card lg:card-side bg-white shadow-xl w-full sm:w-auto ">
      <figure>
        <img src="https://picsum.photos/200" alt="Album" />
      </figure>
      <div className="card-body">
        <h1 className="card-title -mb-2"></h1> {pt_name}
        <h2 className="card-subtitle text-sm mb-2">{difficulty}</h2>
        <h3 className="card-info">
          Date: <span>{date}</span>
        </h3>
        <h3 className="card-info">
          Time: <span>{duration}</span> min
        </h3>
        <div className="card-actions">
          <button className="btn btn-primary bg-yellow-500 text-black focus:outline-none">
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
