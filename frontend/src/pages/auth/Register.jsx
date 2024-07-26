import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import Mainlogo from "../../components/layout/Mainlogo";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function Register() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/register`,
        { uname, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // toast.success("login successfully");
        navigate("/signin");
      } else {
        // toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Signup-page"}>
      <form action="" className=" md" onSubmit={handleSubmit}>
        <div className="">
          <h1 className=" text-center text-white txt">signup page</h1>
          <div className="text-center tx font-light">
            "Join us today to streamline your hardware shopping."
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="USERNAME"
              className="int"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="int"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="EMAIL"
              className="int"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="phone"
              className="int"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="address"
              className="int"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="your first pet's name"
              className="int"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <br />
          <button className="btn" type="submit">
            SignUp
          </button>

          <div className="t3">
            <div>ALREADY SIGNUP?</div>
            <a href="/signin">SIGN IN</a>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default Register;
