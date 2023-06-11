import {
  Routes,
  Route,
  Router,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import HomePageUser from "./pages/home-page-user";
import WorkoutSelect from "./pages/workout-select.js";
import Bookings from "./pages/bookings";
import PersonalTrainers from "./pages/personal-trainer.js";
import Ratings from "./pages/ratings.js";
import AdminHome from "./pages/admin-home";
import PTManager from "./pages/pt-manager";
import ClassManager from "./pages/classs-manager";
import { useEffect } from "react";
import LocalStorageChecker from "./shared/sessionCheck";

function App() {
  // Menggunakan hook useNavigationType untuk mendapatkan tipe navigasi
  const action = useNavigationType();
  
  // Menggunakan hook useLocation untuk mendapatkan lokasi saat ini
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Menggunakan useEffect untuk melakukan scroll ke atas saat navigasi bukan merupakan tipe "POP"
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    // Menggunakan useEffect untuk mengubah judul dokumen dan meta deskripsi sesuai dengan lokasi saat ini
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/register-page":
        title = "";
        metaDescription = "";
        break;
      // Tambahkan kasus lainnya sesuai dengan kebutuhan Anda
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <React.Fragment>
      {/* Komponen LocalStorageChecker digunakan di dalam aplikasi */}
      <LocalStorageChecker />
      <Routes>
        {/* Mendefinisikan rute-rute aplikasi */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/home" element={<HomePageUser />} />
        <Route path="/workout" element={<WorkoutSelect />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/personal-trainers" element={<PersonalTrainers />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/pt-manager" element={<PTManager />} />
        <Route path="/admin/class-manager" element={<ClassManager />} />
      </Routes>
    </React.Fragment>

    //test using tailwind
    //   <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>

  );
}

export default App;
