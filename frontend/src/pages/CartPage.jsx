import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    
  }, [auth?.token]);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/addorders`, {
        cart,
      });
      
      if (data.success) {
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Order placed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to place order. Please try again.");
    }
  };
  
  return (
    <Layout>
      <div className="cart-page">
        <div className="flex justify-center flex-col bg-light p-4 mb-4">
          <h1 className="text-center text-2xl">
            {!auth?.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
          </h1>
          <p className="text-center text-lg">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : "Your Cart Is Empty"}
          </p>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full md:w-7/12 p-0">
              {cart?.map((p) => (
                <div
                  className="flex items-center card m-4 p-4 bg-white shadow-md rounded-lg"
                  key={p._id}
                >
                  <div className="w-3/12">
                    <img
                      src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-24 object-cover rounded-lg"
                      alt={p.name}
                    />
                  </div>
                  <div className="w-6/12 px-4">
                    <p className="text-lg">{p.name}</p>
                    <p className="text-gray-700">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="text-gray-700">Price: &#8377;{p.price}</p>
                  </div>
                  <div className="w-3/12 flex justify-end">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-5/12 cart-summary p-4 bg-white shadow-md rounded-lg text-center">
              <h2 className="text-2xl mb-4">Cart Summary</h2>
              <p className="text-lg">Total | Checkout</p>
              <hr className="my-2" />
              <h4 className="text-xl">Total: &#8377;{totalPrice()}</h4>
              {auth?.user?.address ? (
                <div className="my-4">
                  <h4 className="text-lg">Current Address</h4>
                  <h5 className="text-lg">{auth?.user?.address}</h5>
                  <button
                    className="py-2 px-4 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="my-4">
                  {auth?.token ? (
                    <button
                      className="py-2 px-4 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="py-2 px-4 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white"
                      onClick={() =>
                        navigate("/signin", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-4">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={handleCheckout}
                     
                    >
                      Make Order
                    </button>
                  </>
                )}
              </div>

              {
                !cart?.length ?(""):(
                  <>
                  <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={handleCheckout}
                     
                    >
                      Make Order
                    </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
