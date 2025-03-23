import React from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/"); // Remove token from URL
    }
  }, []);

  return (
    <>
      <div className="mobile-warning">
      You can access the dashboard only on laptops and PCs for the best experience. 📌
      </div>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
