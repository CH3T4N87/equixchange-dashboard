import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Orders = () => {

  let [allOrders, setAllOrders] = useState([]);

  // useEffect(() => {
  //   const token = Cookie.get("token");
  //   const userId = jwtDecode(token);
  //   // console.log(userId);
  //   axios.get(`http://localhost:3002/orders/${userId.id}`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setAllOrders(res.data);
  //     })
  // });
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const userId = jwtDecode(token);
        axios.get(`https://equixchange.onrender.com/orders/${userId.id}`)
          .then((res) => {
            setAllOrders(res.data);
          })
          .catch((error) => console.error("Error fetching orders:", error));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  });
  

  return (
    <div className="orders">

      <h3 className="title">Orders ({allOrders.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Qty.</th>
            <th>LTP</th>
            <th>Mode</th>
            
          </tr>

          {allOrders.map((stock, index) => {
            
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price}</td>
                <td>{stock.mode}</td>
                
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Orders;
