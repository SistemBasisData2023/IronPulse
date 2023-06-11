import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LocalStorageChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user_id"); // Update with your authentication logic
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <React.Fragment />;  // This component doesn't render anything
}

export default LocalStorageChecker;
