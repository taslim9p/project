import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faBars,
  faHouse,
  faUser,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Dropdown from "./Dropdown.jsx";
import SearchInput from "../form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <header className="flex flex-row md:flex-row justify-between items-center h-16 md:h-9 px-4 text-white bg-gray-800">
      {/* logo */}
      <div className="flex items-center mb-2 md:mb-0">
        <FontAwesomeIcon icon={faDesktop} className="text-2xl" />
        <span className="ml-1 mt-5 md:mt-2 text-lg underline">PCREX</span>
      </div>

      {/* search bar */}
      <div className="w-full md:flex-1 mx-4 mb-2 md:mb-0">
        <SearchInput />
      </div>

      {/* nav items */}
      <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
        <NavLink to="/" className="flex items-center hover:underline">
          <FontAwesomeIcon icon={faHouse} className="text-sm mr-1" />
          Home
        </NavLink>

        {!auth.user ? (
          <>
            <NavLink to="/reg" className="flex items-center hover:underline">
              <FontAwesomeIcon icon={faUser} className="text-sm mr-1" />
              Signup
            </NavLink>
            <NavLink to="/signin" className="flex items-center hover:underline">
              <FontAwesomeIcon icon={faUser} className="text-sm mr-1" />
              Signin
            </NavLink>
          </>
        ) : (
          <Dropdown />
        )}

        <NavLink to="/cart" className="flex items-center hover:underline">
          <FontAwesomeIcon icon={faCartShopping} className="text-sm mr-1" />
          <Badge count={cart?.length} showZero offset={[5, -3]}>
            <h1 className="text-white">Cart</h1>
          </Badge>
        </NavLink>
      </nav>

      <button className="md:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={sidebarVisible ? faXmark : faBars} />
      </button>

      {/* sidebar */}
      <div
        className={`sidebar absolute  right-0 top-16 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${
          sidebarVisible ? "translate-x-0" : "hidden"
        } md:hidden overflow-y-auto`}
      >
        {/* nav items */}
        <nav className="flex mt-9 flex-col gap-9 items-center">
          <NavLink to="/" className="">
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            Home
          </NavLink>

          {!auth.user ? (
            <>
              <NavLink to="/reg" className="flex items-center hover:underline">
                <FontAwesomeIcon icon={faUser} className="text-sm mr-1" />
                Signup
              </NavLink>
              <NavLink to="/signin" className="flex items-center hover:underline">
                <FontAwesomeIcon icon={faUser} className="text-sm mr-1" />
                Signin
              </NavLink>
            </>
          ) : (
            <Dropdown />
          )}

          <NavLink to="/cart" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faCartShopping} className="text-sm mr-1 mr-3" />
            <Badge count={cart?.length} showZero offset={[5, -3]}>
              <h1 className="text-white">Cart</h1>
            </Badge>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
