import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import ProductHome from "./ProductHome";
import MainCat from "./MainCat";
import axios from "axios";

function Homepage() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"best deals"}>
      <hr />
      <hr />
      <MainCat />
      <div>
        <br />
        <hr />
        <hr />
        <hr />
        <hr />
        <br />
        <ProductHome />
      </div>
    
    </Layout>
  );
}

export default Homepage;
