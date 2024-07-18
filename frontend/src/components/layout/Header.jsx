import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faHouse,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Dropdown from "./Dropdown.jsx";
import SearchInput from "../form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <header className="flex justify-between items-center h-12 px-4 bg-gray-800 text-white">
      {/* logo */}
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faDesktop}
          className="text-2xl"
        />
        <span className="ml-2 text-xl">pcrex</span>
      </div>

      {/* search bar */}
      <div className="flex-1 mx-4">
        <SearchInput />
      </div>

      {/* nav items */}
      <nav className="flex items-center space-x-4">
        <NavLink to="/" className="flex items-center hover:underline">
          <FontAwesomeIcon icon={faHouse} className="text-xl mr-1" />
          Home
        </NavLink>

        {!auth.user ? (
          <>
            <NavLink to="/register" className="flex items-center hover:underline">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-1" />
              Signup
            </NavLink>
            <NavLink to="/signin" className="flex items-center hover:underline">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-1" />
              Signin
            </NavLink>
          </>
        ) : (
          <Dropdown />
        )}

        <NavLink to="/cart" className="flex items-center hover:underline">
          <FontAwesomeIcon icon={faCartShopping} className="text-xl mr-1" />
          <Badge count={cart?.length} showZero offset={[5, -3]}>
           <h1 className="text-white ">Cart</h1>
          </Badge>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
