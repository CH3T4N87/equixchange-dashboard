
import React, { useState, useContext,useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const Summary = () => {
  const [userName , setUserName] = useState("Lol");
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const user = jwtDecode(token);
        axios
          .get(`https://equixchange.onrender.com/${user.id}`)
          .then((res) => {
            setUserName(res.data[0].username);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
  
  return (
    <>
     
     
      <div className="username">
        <h6>Hi, {userName.toUpperCase()}🙂</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
