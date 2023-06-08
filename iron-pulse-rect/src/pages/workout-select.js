import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../global/navbar-logged-in.js';
import CoverImage from '../global/common-section.js';
import Card from "../shared/card.js";
import { Container } from "reactstrap";
import gymData from "../assets/data/gym.js";
import './workout-select.css'

const WorkoutSelect = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(gymData.length / 2); // cards per page
    setPageCount(pages);
  }, [gymData]);

  return (
    <>
      <Navbar />
      <CoverImage title={'Workout'} />
      <section className="bg-white h-screen">
        <Container className="card-container">
          {gymData
            .slice(page * 2, (page + 1) * 2)
            .map((gym) => (
              <Card gym={gym} key={gym.id} />
            ))}
        </Container>
        <Container>
          <div className="pagination d-flex align-items-center justify-content-center mt-4">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={page === number ? 'active_page' : ""}
              >
                {number + 1}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default WorkoutSelect;
