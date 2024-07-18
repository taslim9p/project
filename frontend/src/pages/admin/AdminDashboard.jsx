import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <Layout>
      <AdminMenu />
    </Layout>
  );
}

export default AdminDashboard;
