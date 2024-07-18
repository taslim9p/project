import React from "react";
import Layout from "../components/layout/Layout";
import UserMenu from "../components/layout/UserMenu";

function Profile() {
  return (
    <Layout title={"Dashboasrd-Profile"}>
      <div className="grid grid-cols-5">
        <div className="col-span-1 ">
          <UserMenu />
        </div>
        <div className="col-span-4 w-full">
          <h1 className="text-5xl">Profile</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
