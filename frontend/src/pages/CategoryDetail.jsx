import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CategoryDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-category/${
          params.slug
        }`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>    <div>
         <h4 className="text-center text-2xl">Category - {category?.name}</h4>
    <h6 className="text-center">{products?.length} result found</h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
    {products?.map((p) => (
      <div
        key={p._id}
        className="bg-white shadow-md rounded-lg  overflow-hidden flex flex-col items-center"
      >
        <img
          src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
          className="w-full h-48 object-cover object-center"
          alt={p.name}
          style={{ height: "200px", width: "200px", objectFit: "contain", }}
        />
        <div className="p-4 text-center flex flex-col">
          <h5 className="font-semibold text-lg">{p.name.substring(0,10)}</h5>   
          <p className="text-gray-500 text-sm mb-2 ">
            {p.description.substring(0, 30)}...
          </p>
          <div className=" justify-between flex-row ">
            <button
              className=" text-white px-4 py-2 rounded justify-center"
              style={{background:
                "linear-gradient(135deg,rgba(0, 0, 0, 1),rgba(76, 76, 75, 0.2))"}}
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              More Details
            </button>
            {/* <button
              className="bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => {
                // setCart([...cart, p]);
                // localStorage.setItem("cart", JSON.stringify([...cart, p]));
                // toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button> */}
          </div>
        </div>
      </div>
    ))}
  </div>
  </div>
  </Layout>

  );
}

export default CategoryDetail;
