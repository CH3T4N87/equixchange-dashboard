import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeBuyWindow } = useContext(GeneralContext);

  // const handleBuyClick = () => {
  //   const token = Cookies.get("token");
  //   const user= jwtDecode(token);
  //   // console.log(user.id);
  //   axios.post("http://localhost:3002/newOrder", {
  //     name: uid,
  //     qty: stockQuantity,
  //     price: stockPrice,
  //     mode: "BUY",
  //     userId : user.id,
  //   });

  //   closeBuyWindow();
  // };

  const handleBuyClick = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const user = jwtDecode(token);
  
        axios.post("https://equixchange.onrender.com/newOrder", {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "BUY",
          userId: user.id,
        })
        .then((res) => {
          console.log("Order placed successfully:", res.data);
          closeBuyWindow();
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
  
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No token found in localStorage");
    }
  };
  
  const handleCancelClick = () => {
    closeBuyWindow();
  };



  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
     
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
         
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;