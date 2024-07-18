import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [values, setValues] = useSearch([]);

  const addToCart = (product) => {
    // Implement addToCart functionality here
    console.log("Adding to cart:", product);
  };

  return (
    <Layout title={"Search results"}>
      <h1 className="text-2xl font-medium mt-4 text-center">Search Results</h1>
      <h6 className="text-lg mt-2 font-light text-center">
        {values?.results.length < 1
          ? "No Products Found"
          : `Found ${values?.results.length} products`}
      </h6>
      <div className="w-full h-full m-auto pt-4 flex flex-wrap justify-around  gap-8">
        {values?.results.map((p) => (
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
                to={`/product/${p._id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Show Details
              </Link>
              <button
                onClick={() => addToCart(p)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SearchResults;
