import React from "react";
import Layout from "../components/layout/Layout";
import UserMenu from "../components/layout/UserMenu";

function Orders() {
  return (
    <Layout title={"Dashboasrd-orders"}>
      <div className="grid grid-cols-5">
        <div className="col-span-1 ">
          <UserMenu />
        </div>
        <div className="col-span-4 w-full">
          <h1 className="text-5xl">Orders</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
