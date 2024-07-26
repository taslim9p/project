import React from "react";
import "./AdminMenu.css";
import { NavLink } from "react-router-dom";
function AdminMenu() {
  return (
    <>
      <div className="sidebar">
        <h1 className="text-lg underline text-center mt-3 mb-3">
          Admin Dashboard
        </h1>
        <hr style={{ border: "1px solid black" }} />
        <ol className="">
          <li className="nav">
            <NavLink to="/dashboard/admin/create-category">
              Create Category
            </NavLink>
          </li>
          <li className="nav">
            <NavLink to="/dashboard/admin/products">Products</NavLink>
          </li>
          <li className="nav">
            <NavLink to="/dashboard/admin/create-product">
              Create Product
            </NavLink>
          </li>
          <li className="nav">
            <NavLink to="">Users</NavLink>
          </li>
          <li className="nav">
            <NavLink to="/dashboard/admin/orders">orders</NavLink>
          </li>
        </ol>
      </div>
    </>
  );
}

export default AdminMenu;
