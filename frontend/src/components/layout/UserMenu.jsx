import React from "react";
import "./AdminMenu.css";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css";
function UserMenu() {
  return (
    <>
      <div className="sidebar">
        <h1 className="text-lg underline text-center mt-3 mb-3">Dashboard</h1>
        <hr style={{ border: "1px solid black" }} />
        <ul className="">
          <li className="nav">
            <NavLink to="/dashboard/user/profile">Profile</NavLink>
          </li>
          <li className="nav">
            <NavLink to="/dashboard/user/orders">Orders</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserMenu;
