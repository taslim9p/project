
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import  Layout  from "../../components/layout/Layout.jsx";
import moment from "moment";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
const { Option } = Select;

function AdminOrders() {
    const [status, setStatus] = useState([
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ]);
      const [changeStatus, setChangeStatus] = useState("");
      const [orders, setOrders] = useState([]);
      const [auth, setAuth] = useAuth();
    
      const getOrders = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/all-orders`);
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
    
      const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/auth/order-status/${orderId}`, {
            status: value,
          });
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };
    
      return (
        <Layout title={"All Orders Data"}>
          <div className="flex flex-col md:flex-row md:gap-4 p-3">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <AdminMenu />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-center text-2xl font-bold mb-4">All Orders</h1>
              {orders?.map((o, i) => (
                <div key={o._id} className="border rounded-lg shadow mb-4 p-4">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Buyer</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Payment</th>
                        <th className="px-4 py-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                            className="w-full"
                          >
                            {status.map((s, index) => (
                              <Option key={index} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td className="px-4 py-2">{o?.buyer?.name}</td>
                        <td className="px-4 py-2">{moment(o?.createAt).fromNow()}</td>
                        <td className="px-4 py-2">cash on delevery</td>
                        <td className="px-4 py-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4">
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
                          <p className="text-sm">Price: ${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Layout>
      );
}

export default AdminOrders;
