import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import Mainlogo from "../../components/layout/Mainlogo";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { toast } from 'sonner';
import axios from "axios";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/forgot-password`,
        { email,newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
       
        navigate("/signin");
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
      
        <div className="">
          <form action="" onSubmit={handleSubmit}>
            <div className="mdd h-80 ">
              <h1 className=" text-center text-white txtt">Reset password</h1>
              

              <div className="">
                <input
                  type="email"
                  placeholder="Email"
                  className="intt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="">
                <input
                  type="password"
                  placeholder="New Password"
                  className="intt"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="your first pet's name"
                  className="intt"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>

              <br />
              <button
                className="btnn hover:bg-gray focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700   "
                type="submit"
              >
                change password
              </button>
              </div>
            </div>
          </form>
        </div>
      
    </Layout>
  );
}

export default ForgotPassword;
