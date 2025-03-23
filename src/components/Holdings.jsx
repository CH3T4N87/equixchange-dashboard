import React, { useState, useEffect } from "react";
import axios from "axios";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {BarChartOutlined, KeyboardArrowDown , KeyboardArrowUp} from "@mui/icons-material"
import { Tooltip, Grow } from "@mui/material";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";


const Holdings = () => {
  let [allHoldings, setAllHoldings] = useState([]);
  let [allOrders, setAllOrders] = useState([]);

  // // Fetch orders from the backend
  // useEffect(() => {
  //   const token = Cookie.get("token");
  //   const userId = jwtDecode(token);
  //   axios.get(`http://localhost:3002/orders/${userId.id}`).then((res) => {
  //     setAllOrders(res.data);
  //   });
  // }, []);

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
  }, []);
  

  // Calculate holdings based on orders
  useEffect(() => {
    const newHoldings = {};

    allOrders.forEach((order) => {
      let { name, qty, price, mode } = order;

      // Initialize the holding for the stock if not already present
      if (!newHoldings[name]) {
        newHoldings[name] = {
          instrument: name,
          qty: 0,
          totalCost: 0,
          ltp: price, // assuming LTP is the latest price fetched from orders
        };
      }

      // Adjust quantity and total cost based on "BUY" or "SELL" mode
      if (mode === "BUY") {
        newHoldings[name].qty += qty; // Increase qty on buy
        newHoldings[name].totalCost += qty * price; // Add to total cost
      } else if (mode === "SELL") {
        newHoldings[name].qty -= qty; // Decrease qty on sell
        newHoldings[name].totalCost -= qty * price; // Reduce from total cost
      }

      // Calculate average cost for the remaining holdings
      if (newHoldings[name].qty > 0) {
        newHoldings[name].avgCost =
          newHoldings[name].totalCost / newHoldings[name].qty;
      } else {
        newHoldings[name].avgCost = 0;
      }

      // Assuming you get LTP from some other source; for now, it's the price from orders
      newHoldings[name].ltp = price;
    });

    // Convert the holdings object into an array and update the state
    setAllHoldings(Object.values(newHoldings));
  }, [allOrders]);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Cost</th>
              <th>LTP</th>
              <th>Cur. Val</th>
              <th>P&L</th>
              <th>Net Chg.</th>
              <th>Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((holding, index) => {
              const currValue = holding.qty * holding.ltp;
              const pnl = (holding.ltp - holding.avgCost) * holding.qty;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const netChange = holding.ltp - holding.avgCost; // Adjust this logic as needed
              const dayChange = (netChange / holding.avgCost) * 100; // Percentage change

              return (
                <tr key={index}>
                  <td>{holding.instrument}</td>
                  <td>{holding.qty}</td>
                  <td>{holding.avgCost.toFixed(2)}</td>
                  <td>{holding.ltp.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td>{netChange.toFixed(2)}</td>
                  <td>{dayChange.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Holdings;


function HoldingActions() {
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHorizIcon className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
}