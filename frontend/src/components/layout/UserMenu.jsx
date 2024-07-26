import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-teal-300 p-4 w-full max-w-xs min-h-screen text-white flex flex-col">
      <h1 className="text-lg font-bold underline text-center mb-4">
        Dashboard
      </h1>
      <hr className="border-t-2 border-gray-200 mb-4" />
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) =>
              `block p-2 rounded-md ${
                isActive
                  ? "bg-white text-blue-600"
                  : "text-gray-100 hover:bg-white hover:text-blue-600"
              }`
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              `block p-2 rounded-md ${
                isActive
                  ? "bg-white text-blue-600"
                  : "text-gray-100 hover:bg-white hover:text-blue-600"
              }`
            }
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
