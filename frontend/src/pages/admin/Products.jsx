import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";

function Products() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-1/5">
          <AdminMenu />
        </div>
        <div className="lg:w-4/5">
          <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="no-underline hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full h-36 flex items-center justify-center bg-gray-100 p-4">
                    <img
                      src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                      className="max-h-full max-w-full object-contain"
                      alt={p.name}
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                    <p className="text-gray-700">{p.description.substring(0, 20)}...</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
