import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/auth/admin-auth`
      );
     
      if (res.data.ok) {
        if (res.data.ok && auth.user.role === 1) {
          setOk(true);
        }
        console.log(ok);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  console.log(ok);

  return ok ? <Outlet /> : <Spinner path="" />;
}
