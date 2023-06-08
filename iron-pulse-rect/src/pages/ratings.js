import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardRating.js";
import { Container } from "reactstrap";
import ptData from "../assets/data/ratings.js";
import "./workout-select.css";

const PersonalTrainers = () => {
  const navigate = useNavigate();

  const handleCardClick = (ptId) => {
    navigate(`/personal-trainers/${ptId}`);
  };

  return (
    <>
      <Navbar />
      <CoverImage title="Ratings" />
      <section className="bg-white h-screen w-screen">
        <Container className="card-container">
          {ptData.map((pt) => (
            <Card pt={pt} key={pt.id} onClick={() => handleCardClick(pt.id)} />
          ))}
        </Container>
      </section>
    </>
  );
};

export default PersonalTrainers;
