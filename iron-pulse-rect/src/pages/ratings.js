import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardRating.js";
import { Container } from "reactstrap";
import ptData from "../assets/data/ratings.js";
import "./workout-select.css";
import { useLocation } from "react-router-dom";

const Ratings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ratingData = location.state?.ratingData || [];
  console.log(ratingData);

  return (
    <>
      <Navbar />
      <CoverImage title="Ratings" />
      <section className="bg-white h-screen w-screen">
        <Container className="card-container">
          {Array.isArray(ratingData) &&
            ratingData.map((rate) => (
              <Card rate={rate} key={rate.id} onClick={() => handleCardClick(rate.id)} />
            ))}
        </Container>
      </section>
    </>
  );
};

export default Ratings;
