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
      <CoverImage title={"Admin Settings"} />
      <section className="bg-white h-screen">
        <div className="card-container">
          <div className="card w-96 bg-base-100 shadow-xl bg-white">
            <figure className="px-10 pt-10">
              <img
                src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">PT Manager!</h2>
              <p>Manage PTs here</p>
              <div className="card-actions">
              <a href="/admin/pt-manager">
                  <button className="btn btn-primary">Open</button>
                </a>              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl bg-white">
            <figure className="px-10 pt-10">
              <img
                src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Class Manager</h2>
              <p>Manage classes here</p>
              <div className="card-actions">
                <a href="/admin/class-manager">
                  <button className="btn btn-primary">Open</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bookings;
