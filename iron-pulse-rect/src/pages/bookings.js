import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardBooking.js";
import { Container } from "reactstrap";
import bookingData from "../assets/data/bookings.js";
import "./workout-select.css";

const Bookings = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageItemCount = 9;

  useEffect(() => {
    const pages = Math.ceil(bookingData.length / pageItemCount); // cards per page
    setPageCount(pages);
  }, [bookingData]);

  return (
    <>
      <Navbar />
      <CoverImage title={"Bookings"} />
      <section className="bg-white h-screen">
        <Container className="card-container">
          {bookingData
            .slice(page * pageItemCount, (page + 1) * pageItemCount)
            .map((bookings) => (
              <Card bookings={bookings} key={bookings.id} />
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

export default Bookings;
