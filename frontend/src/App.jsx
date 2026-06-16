import React from "react";
import SignUp from "./auth/SignUp";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import { useStore } from "./store/zustand";
import Header from "./components/Header";
import Admin from "./admin/Admin";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
export default function App() {
  let isLogin = useStore((state) => state.isLogin);
  let setIsLogin = useStore((state) => state.setIsLogin);
  let isAdmin = useStore((state) => state.isAdmin);
  let setIsAdmin = useStore((state) => state.setIsAdmin);
  let navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      let decodded = jwtDecode(cookies.token);
      setIsLogin(true);
      setIsAdmin(decodded.role);
    } else {
      setIsLogin(false);
    }
  }, []);
  return (
    <div>
      <ToastContainer />
      <Routes>
        {!isLogin ? (
          <Route
            path="/*"
            element={
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            }
          />
        ) : isAdmin == "user" ? (
          <Route path="/user" element={<Header />} />
        ) : (
          <Route path="/*" element={<Admin />} />
        )}
      </Routes>
    </div>
  );
}
