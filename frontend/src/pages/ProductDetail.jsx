import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();


  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    console.log(params);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8" key={product._id}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${
                product._id
              }`}
              className="rounded-lg"
              alt={product.name}
              style={{ height: "300px", width: "300px", objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-col justify-center" key={product._id}>
            <h1 className="text-center text-3xl font-bold mb-4">
              Product Details
            </h1>
            <hr className="mb-4 mr-6" />
            <h6 className="mb-2">Name: {product.name}</h6>
            <h6 className="mb-2 mr-5">Description: {product.description}</h6>
            <h6 className="mb-2">Price:&#8377;{product.price}</h6>
            <h6 className="mb-2">Category: {product?.category?.name}</h6>

            <button
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                toast.success(`${product.name} added to cart`);
              }}
              className=" text-white px-4 mr-6 py-2 mt-4 rounded"
              style={{background:
                "linear-gradient(135deg,rgba(0, 0, 0, 1),rgba(766, 766, 75, 0.2))"}}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr className="my-8" />
        <div className="container mx-auto">
          <h4 className="text-lg font-semibold mb-4">Similar Products ➡️</h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts?.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-md rounded-lg  overflow-hidden flex flex-col items-center"
              >
                <img
                  src={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover object-center"
                  alt={p.name}
                  style={{
                    height: "200px",
                    width: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="p-4 text-center flex flex-col">
                  <h5 className="font-semibold text-lg">{p.name.substring(0,20)}</h5>
                  <p className="text-gray-500 text-sm mb-2 ">
                    {p.description.substring(0, 20)}...
                  </p>
                  <div className=" justify-between flex-row ">
                    <button
                      className=" text-white px-4 py-2 rounded justify-center"
                      style={{background:
                        "linear-gradient(135deg,rgba(0, 0, 0, 1),rgba(76, 76, 75, 0.2))"}}
                      onClick={() =>{ navigate(`/product/${p.slug}`)
                    }}

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
      </div>
    </Layout>
  );
}

export default ProductDetail;
