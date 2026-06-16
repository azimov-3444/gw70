import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstanse } from "../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signupfn = async (value) => {
    try {
      let response = await axiosInstanse.post("/signup", value);
      console.log(response);
      toast.success("Ro'yhatda o'tildi✅");
    } catch (err) {
      console.log(err);
      toast.error("Ro'yhatdan o'tishda xatolik yuz berdi!❌");
    }
  };

  const Sumbit = (value) => {
    signupfn(value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white w-87.5 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-5 border-b-2 border-blue-500 inline-block">
          Registration
        </h2>

        <form
          className="flex flex-col gap-3 mt-4"
          onSubmit={handleSubmit(Sumbit)}
        >
          <input
            {...register("name", { required: "Bosh joy qolmasin" })}
            type="text"
            placeholder="Enter your name"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            {...register("surname", { required: "Bosh joy qolmasin" })}
            type="text"
            placeholder="Enter your surname"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

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
          <Link to={"/login"} className="text-blue-600 cursor-pointer hover:underline">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}
