import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";



const Menu = () => {
  let [userName, setUserName] = useState("Hi");
  let [isProfileDropDownOpen, setIsProfileDropdownOpen] = useState(false);

 
    // const token = Cookies.get("token");
    // const user = jwtDecode(token);
    // // console.log(user.id);
    
    // axios.get(`http://localhost:3002/${user.id}`)
    // .then((res) => {
    //   // setUserName(res.data.user)
    //   // console.log("Response:", res.data[0].username);
    //   setUserName(res.data[0].username);
    // })
    // .catch((error) => {
    //   console.error("Error Details:", error.toJSON());
    // });
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log(token);
      // ✅ Check if token exists and is a valid string
      if (!token || token === "undefined" || token === "null") {
        console.warn("No valid token found.");
        return;
      }
     
      try {
        const user = jwtDecode(token); // ✅ Decode only if valid token
        if (!user || !user.id) throw new Error("Invalid token structure");
  
        axios
          .get(`http://localhost:3002/${user.id}`)
          .then((res) => {
            setUserName(res.data[0].username || "User");
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // ✅ Remove invalid token
      }
    }, []);
  

const handleMenuClick = (index)=>{
  // setSelectedMenu(index);
}
const handleProfileClick = (index)=>{
  setIsProfileDropdownOpen(!isProfileDropDownOpen);
}

const menuClass ="menu";
const activeMenuClass ="menu selected";

  return (
    <div className="menu-container">
      <img src="updated-logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{textDecoration:"none"}} to={"/"} onClick={() => handleMenuClick(0) }>
            <p >Dashboard</p>
            </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to={"/orders"} onClick={() => handleMenuClick(1) }>
            <p >Orders</p>
            </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to={"/holdings"} onClick={() => handleMenuClick(2) }>
            <p >Holdings</p>
            </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to={"/positions"} onClick={() => handleMenuClick(3) }>
            <p>Positions</p>
            </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none",color:"white",fontWeight:"600"}}  to={"http://localhost:3001/"} onClick={() => handleMenuClick(4) }>
            <p>Home</p>
            </Link>
          </li>
          <li>
          {/* <Link style={{textDecoration:"none"}} to={"/apps"} onClick={() => handleMenuClick(5) }>
            <p></p>
            </Link> */}
          </li>
        </ul>
        <hr />
        <div className="profile" >
          <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
          <p className="username">{userName.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
