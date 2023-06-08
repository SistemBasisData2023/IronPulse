import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardPT.js";
import { Container } from "reactstrap";
import ptData from "../assets/data/pt.js";
import "./workout-select.css";

const PersonalTrainers = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageItems = 8;

  useEffect(() => {
    const pages = Math.ceil(ptData.length / pageItems); // cards per page
    setPageCount(pages);
  }, [ptData]);

  return (
    <>
      <Navbar />
      <CoverImage title={"Personal Trainers"} />
      <section className="bg-white h-screen">
        <Container className="card-container">
          {ptData.slice(page * pageItems, (page + 1) * pageItems).map((pt) => (
            <Card pt={pt} key={pt.id} />
          ))}
        </Container>
        <Container>
          <div className="pagination d-flex align-items-center justify-content-center mt-4">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={page === number ? "active_page" : ""}
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

export default PersonalTrainers;
