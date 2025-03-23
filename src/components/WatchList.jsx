import React, { useState , useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from "../data/data";
import {BarChartOutlined, KeyboardArrowDown , KeyboardArrowUp} from "@mui/icons-material"
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GeneralContext from "./GeneralContext";

const WatchList = () => {

  let [searchCompany , setSearchCompany] = useState("");
 
 const handleSearchInput = (event) =>{
        setSearchCompany(event.target.value);
 }


  return (
    <div className="watchlist-container">
      <div className="search-container">
      <i class="fa-solid fa-magnifying-glass search-companies"></i>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for companies to invest or trade"
          className="search"
          onChange={
            handleSearchInput
          }
          value={searchCompany}
        />
        <span className="counts"> {(watchlist.length)} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return(
            <WatchListItem stock={stock} index={index}/>
          )
        })}
      </ul>
    </div>
  );
};

export default WatchList;

function WatchListItem({stock}) {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchListActions(true);
  }
  const handleMouseLeave = (e) => {
    setShowWatchListActions(false);
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (<KeyboardArrowUp className="up" />)}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name}/>}
    </li>
  )


}

// function WatchListActions({uid}){
//   const generalContext = useContext(GeneralContext);

//   const handleBuyClick = () => {
//     generalContext.openBuyWindow(uid);
//   };
//     return (
//       <span className="actions">
//         <span>
//           <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
//             <button onClick={handleBuyClick} className="buy">B</button>
//           </Tooltip>
//           <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
//             <button className="sell">S</button>
//           </Tooltip>
//           <Tooltip title="Charts" placement="top" arrow TransitionComponent={Grow}>
//             <button className="action"><CandlestickChartIcon/></button>
//             {/* <BarChartOutlined className="icon"/> */}
//           </Tooltip>
//           <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//             <button className="action"><MoreHorizIcon/></button>
//           </Tooltip>
//         </span>
//       </span>
//     )
// }

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };
  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
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
};