import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import UserMenu from "../components/layout/UserMenu.jsx";
import Layout from "../components/layout/Layout.jsx";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [sortOrder, setSortOrder] = useState("desc");

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/auth/cancel-order/${orderId}`);
      if (data?.message) {
        toast.success(data.message);
        getOrders(); // Refresh the orders list
      }
    } catch (error) {
      console.log(error);
      toast.error("Error cancelling order");
    }
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <Layout title={"Your Orders"}>
      <div className="container mx-auto p-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <UserMenu />
          </div>
          <div className="col-span-1 md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-center text-2xl font-semibold">All Orders</h1>
              <button onClick={toggleSortOrder} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
              </button>
            </div>
            {sortedOrders?.map((o, i) => {
              const totalPrice = o.products.reduce((total, product) => total + product.price, 0);
              return (
                <div key={i} className="border shadow rounded-lg mb-4">
                  <table className="table-auto w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Buyer</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Payment</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Total Price</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">{o?.status}</td>
                        <td className="px-4 py-2">{o?.buyer?.name}</td>
                        <td className="px-4 py-2">{moment(o?.createdAt).fromNow()}</td>
                        <td className="px-4 py-2">Cash on Delivery</td>
                        <td className="px-4 py-2">{o?.products?.length}</td>
                        <td className="px-4 py-2">₹{totalPrice}</td>
                        <td className="px-4 py-2">
                          {o?.status !== "Cancelled" && o?.status !== "Delivered" && (
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-md"
                              onClick={() => cancelOrder(o._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-4">
                    {o?.products?.map((p, index) => (
                      <div key={p._id} className="flex flex-col md:flex-row mb-4">
                        <div className="flex-shrink-0 mb-2 md:mb-0">
                          <img
                            src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                            className="w-24 h-24 object-cover rounded-md"
                            alt={p.name}
                          />
                        </div>
                        <div className="md:ml-4">
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-sm text-gray-600">{p.description.substring(0, 30)}</p>
                          <p className="text-sm">Price: ₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
