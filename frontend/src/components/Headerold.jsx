import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faHouse,faUser,faCartShopping,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => (
  <header className="flex h-10">

    {/* logo */}
    <div className="flex ml-7">
      <FontAwesomeIcon
        icon={faDesktop}
        style={{ color: "white", fontSize: "1.4rem" }}
      />
      <span className="text-white " style={{ fontSize: "1.2rem" }}>
        pcrex
      </span>
    </div>

    {/* search bar */}
    <input type="text" className="rounded-xl  ml-7 " style={{width:'60%'}} />
    <FontAwesomeIcon icon={faMagnifyingGlass}  style={{ color: "white", fontSize: "1.1rem" }} className="m-0.5 p-0.5"/>

  {/* nav items */}
    <nav className="">
      <ul className="flex">
        <li className="flex  hover:underline">
          <FontAwesomeIcon
            icon={faHouse}
            style={{ color: "white", fontSize: "1.1rem" }}
            className="m-1"
          />
          <Link to="/home" className="hover:underline hover:underline-offset-4">Home</Link>
        </li>
        <li className="flex">
          <FontAwesomeIcon
            icon={faUser}
            style={{ color: "white", fontSize: "1.1rem" }}
            className="m-1"
          />
          <Link className="hover:underline hover:underline-offset-4" to="/login">Login</Link>
        </li>
        <li className="flex">
          <FontAwesomeIcon
            icon={faUser}
            style={{ color: "white", fontSize: "1.1rem" }}
            className="m-1"
          />
          <Link className="hover:underline hover:underline-offset-4" to="/Register">Signup</Link>
        </li>
        <li className="flex">
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ color: "white", fontSize: "1.1rem" }}
            className="m-1"
          />
          <Link className="hover:underline hover:underline-offset-4" to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
