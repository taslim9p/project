import { Button } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";

function ProductHome() {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
      console.log(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      setProducts(data.products);
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="w-full h-full m-auto pt-4 flex flex-wrap justify-around  gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="h-80 w-60 rounded-2xl border-2 border-black overflow-hidden flex flex-col justify-between"
          >
            <div className="flex flex-col items-center p-2">
              <img
                src={`${
                  import.meta.env.VITE_API
                }/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="h-36 w-full object-cover "
              />
              <hr className="bg-red w-full my-2" />
              <h1 className="text-lg font-bold">{p.name}</h1>
              <h1 className="text-md text-gray-700">&#8377;{p.price}</h1>
              <h1 className="text-sm text-gray-600">
                {p.description.substring(0, 25)}...
              </h1>
            </div>
            <div className="flex justify-between p-2 ">
              <Link
                to={`/product/${p.slug}`}
               
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Show Details
              </Link>
              <button
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success(`${p.name} added to cart`);
                }}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        {products && products.length < total && (
          <button
            className=" text-black bg-slate-300 border-black hover:text-white px-4 py-2 rounded  mt-4 transition duration-300 ease-in-out transform hover:bg-blue-400 hover:scale-105 hover:shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
}

export default ProductHome;
