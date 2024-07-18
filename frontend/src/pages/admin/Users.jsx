import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

function Users() {
  return (
    <Layout title={'Dashboasrd-manage users'}>
      <div className="grid grid-cols-5">
        <div className="col-span-1 ">
          <UserMenu />
        </div>
        <div className="col-span-4 w-full">
          <h1 className="text-5xl">manage users</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
