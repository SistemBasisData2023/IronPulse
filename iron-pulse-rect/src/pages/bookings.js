import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardBooking.js";
import { Container } from "reactstrap";
import axios from "axios";
import "./workout-select.css";

const Bookings = () => {
  const [pageCount, setPageCount] = useState(0); // State to hold the number of pages
  const [page, setPage] = useState(0); // State to hold the current page
  const pageItemCount = 9; // Number of items per page
  const [bookingData, setBookingData] = useState([]); // State to hold the booking data
  const userId = localStorage.getItem("user_id"); // Retrieve the user ID from local storage
  console.log(userId);

  useEffect(() => {
    fetchData(); // Fetch booking data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3300/check_booking", {
        params: {
          user_id: userId, // Pass the user ID parameter
        },
      });
      console.log(response.data.bookings);
      const bookings = response.data.bookings;
  
      setBookingData(bookings); // Update the booking data state with the fetched data
      const pages = Math.ceil(bookings.length / pageItemCount); // Calculate the number of pages based on the fetched booking data
      setPageCount(pages); // Update the page count state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <CoverImage title={"Bookings"} />
      <section className="bg-white h-screen">
        <Container className="card-container">
          {bookingData
            .slice(page * pageItemCount, (page + 1) * pageItemCount)
            .map((bookings) => (
              <Card bookings={bookings} key={bookings.booking_id} />
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
