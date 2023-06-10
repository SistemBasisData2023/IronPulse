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
      <CoverImage title={"Class Manager"} />
      
    </>
  );
};

export default Bookings;
