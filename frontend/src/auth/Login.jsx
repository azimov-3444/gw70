import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstanse } from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useStore } from "../store/zustand";
export default function Login() {


  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  let isLogin = useStore((state) => state.isLogin);
  let setIsLogin = useStore((state) => state.setIsLogin);
  let isAdmin = useStore((state) => state.isAdmin);
  let setIsAdmin = useStore((state) => state.setIsAdmin);

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginfn = async (value) => {
    try {
      console.log(value);

      setIsLoading(true);
      let response = await axiosInstanse.post("/login", value);

      setIsLoading(false);
      toast.success("Succesfull✅");

      let token = response.data.token;
      setCookie("token", token, { maxAge: 3600, path: "/" });

      let decodded = jwtDecode(token);
      console.log(decodded);

      setIsLogin(true);
      setIsAdmin(decodded.role);

      if (decodded.role == "user") {
        navigate("/user");
      } else if (decodded.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Ro'yhatdan o'tishda xatolik yuz berdi!❌");
      navigate("/")
    }
  };

  const Sumbit = (value) => {
    loginfn(value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      {isLoading ? (
        <Atom color="#32cd32" size="large" text="" textColor="" />
      ) : (
        ""
      )}
      <div className="bg-white w-87.5 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-5 border-b-2 border-blue-500 inline-block">
          Login
        </h2>

        <form
          className="flex flex-col gap-3 mt-4"
          onSubmit={handleSubmit(Sumbit)}
        >
          <input
            {...register("email", { required: "Bosh joy qolmasin" })}
            type="email"
            placeholder="Enter your email"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            {...register("password", { required: "Bosh joy qolmasin" })}
            type="password"
            placeholder="Create password"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700 transition"
          >
            Register Now
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to={"/"}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
