import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect( () => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/auth/user-auth`
      );

      if (res.data.ok) {
        if (res.data.ok && auth.user.role === 0) {
          setOk(true);
        }
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
