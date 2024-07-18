import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import Mainlogo from "../../components/layout/Mainlogo";
import "./signin.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { toast } from 'sonner';
import axios from "axios";
import { useAuth } from "../../context/auth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/signin`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log(auth);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Signup-page"}>
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <Mainlogo />
        </div>
        <div className="col-span-4">
          <form action="" onSubmit={handleSubmit}>
            <div className="mdd">
              <h1 className=" text-center text-white txtt">signin page</h1>
              <div className="text-center txx font-light">
                "Welcome back! Sign in to access your account and continue your
                hardware shopping journey."
              </div>

              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="intt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="PASSWORD"
                  className="intt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <br />
              <button
                className="btnn hover:bg-gray focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700   "
                type="submit"
              >
                SignIn
              </button>
              <div className="t33">
                <div>NOT REGISTER YET?</div>
                <a href="/signup">SIGNUP</a>
                <br />
                <a href="/forgot-password" className="text-sm">
                  FORGOT PASSWORD ?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Signin;
