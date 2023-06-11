import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar-logged-in.js";
import CoverImage from "../global/common-section.js";
import Card from "../shared/cardWorkout.js";
import { Container } from "reactstrap";
import gymData from "../assets/data/gym.js";
import "./workout-select.css";
import { useLocation } from "react-router-dom";


let workoutName = null;

const WorkoutSelect = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const workoutData = location.state?.workoutData || [];
  console.log(workoutData) // Menampilkan workoutData pada konsol
  console.log(gymData) // Menampilkan gymData pada konsol


  useEffect(() => {
    const pages = Math.ceil(workoutData.length / 9); // cards per page
    setPageCount(pages);  // Mengatur jumlah halaman ke variabel state pageCount
  }, [workoutData]);

  return (
    <>
      <Navbar /> {/* Menampilkan komponen CoverImage dengan judul "Workout" */}
      <CoverImage title={"Workout"} /> 
      <section className="bg-white h-screen">
        <Container className="card-container">
          {workoutData.slice(page * 9, (page + 1) * 9).map((gym) => (
            <Card gym={gym} key={gym.id} />
          ))}
        </Container>
        <Container>
          {/* Menampilkan navigasi halaman (pagination) */}
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

export default WorkoutSelect;
