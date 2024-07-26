import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <AdminMenu />
          </div>
          <div className="col-span-1 md:col-span-3">
            <h1 className="text-2xl font-semibold mb-4 text-center">Welcome, {auth?.user?.name}</h1>
            {/* Add any additional content for the Admin Dashboard here */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
