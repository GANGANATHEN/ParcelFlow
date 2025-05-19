"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
// react icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("info@codedthemes.com");
  const [password, setPassword] = useState(123456);
  const [hide, setHide] = useState(false);
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Must be a valid email");
      return;
    } else {
      setEmailError("");
    }
    console.log(emailError);
    
  }, [email])
  

  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     setPassmessage(
  //       "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
  //     );
  //     return;
  //   }
  
  return (
    <div className="flex flex-col gap-y-7">
    {/* header */}
      <div className="py-6 px-6 mt-2">
        <Link href="/dashboard" className="flex gap-3">
          <Image src="/logo/image.png" width={30} height={30} alt="logo" />
          <p className="font-bold text-2xl">Mantis</p>
        </Link>
      </div>
      {/* login box */}
      <div className="flex items-center justify-center p-2">
        <div className="bg-white shadow-sm flex flex-col gap-y-5 p-5 rounded-sm w-[35%]">
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-bold">Login</h1>
            <Link href="/register" className="text-blue-500 text-[14px]">
              Don&apos;t have an account?
            </Link>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-zinc-400 text-[14px]">Email Address</label>
            <input
              type="text"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${email==0 || emailError!=0 ? "hover:border-red-300 border-red-500 focus:border-red-500 rounded-sm focus:ring-1 focus:ring-red-300 dark:focus:ring-red-300 hover:ring-offset-red-300 hover:focus:ring-offset-red-300" :"hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300"} w-full border text-[14px] p-2  outline-none`}
            />
            {email==0 ? <p className="text-[10px] text-red-500">Email is required</p> : emailError!=0 ? <p className="text-[10px] text-red-500">{emailError}</p> : ""}
          </div>
          <div className="relative flex flex-col gap-y-1">
            <label className="text-zinc-400 text-[14px]">Password</label>

            <input
              type={hide ? "text" : "password"}
              placeholder="Enter email address"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${password==0 ? "hover:border-red-300 border-red-500 focus:border-red-500 rounded-sm focus:ring-1 focus:ring-red-300 dark:focus:ring-red-300 hover:ring-offset-red-300 hover:focus:ring-offset-red-300" :"hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300"} w-full border text-[14px] p-2  outline-none`}
            />
            {password==0 ? <p className="text-[10px] text-red-500">Password is required</p> : ""}
            <span
              onClick={() => setHide((prev) => !prev)}
              className="absolute right-[10px] top-[50%] translate-y-[40%] cursor-pointer"
            >
              {hide ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          <div className="flex justify-between">
            <div class="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 cursor-pointer bg-gray-100
                 border-gray-300 rounded-sm outline-none"
              />
              <label
                for="default-checkbox"
                class="ms-2 cursor-pointer text-[14px]"
              >
                Keep me sign in
              </label>
            </div>
            <p className="text-[14px] cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </div>
          <button class="text-center bg-blue-500 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-600 transform hover:scale-105 transition-transform duration-200">
            Login
          </button>
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-between items-end py-6 px-10 mt-7">
        <p className="text-[12px] font-bold text-zinc-400">© Made with love by Team <span className="text-blue-400 hover:underline cursor-pointer">CodedThemes</span></p>
        <p className="text-[12px] font-bold text-zinc-400">Distributed by <span className="text-blue-400 hover:underline cursor-pointer">ThemeWagon</span></p>
      </div>
    </div>
  );
};

export default Login;
