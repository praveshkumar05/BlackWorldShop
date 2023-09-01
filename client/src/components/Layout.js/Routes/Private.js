import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import Spinner from "../../../components/spinner/Spinner";
import { BASE_URL } from "../APIS/baseurl.js";
export const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${BASE_URL}/auth/user-auth`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      });
      if (res?.data?.ok) {
        setOk(true);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  
  return ok ? <Outlet /> : <Spinner path="" />;
};
