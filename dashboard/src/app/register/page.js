"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
// react icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);

  // error message
  const [fnerror, setFnerror] = useState("");
  const [lnerror, setLnerror] = useState("");
  const [emailError, setEmailError] = useState("");
  const [strength, setStrength] = useState("");
  const [pserror, setPserror] = useState("");

  useEffect(() => {
    if (fname == 0) {
      setFnerror("First Name is required");
    } else {
      setFnerror("");
    }
  }, [fname]);
  useEffect(() => {
    setLnerror("Last Name is required");
  }, [lname]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Must be a valid email");
      return;
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (password.length === 0) {
      setPserror("Password is required");
    } else if (password.length > 10) {
      setPserror("Password must be less than or equal to 10 characters");
    } else {
      setPserror("");
      const strengthCriteria = [
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol,
      ].filter(Boolean).length;
      if (strengthCriteria === 4 && password.length >= 8) {
        setStrength("Strong");
      } else if (strengthCriteria === 4 && password.length >= 6) {
        setStrength("Good");
      } else if (strengthCriteria >= 2 && password.length >= 6) {
        setStrength("Normal");
      } else if (strengthCriteria >= 1 && password.length >= 8) {
        setStrength("Normal");
      } else if (strengthCriteria >= 1 && password.length >= 6) {
        setStrength("week");
      } else {
        setStrength("Poor");
      }
    }
  }, [password]);

  return (
    <div className="flex flex-col gap-y-7">
      {/* header */}
      <div className="py-6 px-6 mt-2">
        <Link href="/dashboard" className="flex gap-3">
          <Image src="/logo/image.png" width={30} height={30} alt="logo" />
          <p className="font-bold text-2xl">Mantis</p>
        </Link>
      </div>
      {/* Signup box */}
      <div className="flex items-center justify-center p-2">
        <div className="bg-white shadow-sm flex flex-col gap-y-5 p-5 rounded-sm w-[35%]">
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-bold">Sign up</h1>
            <Link href="/login" className="text-blue-500 text-[14px]">
              Already have an account?
            </Link>
          </div>
          <div className="flex gap-x-6 items-center">
            <div className="flex flex-col gap-y-1">
              <label className="text-zinc-400 text-[14px]">First Name</label>
              <input
                type="text"
                placeholder="Jhon"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className={`${
                  fnerror != 0
                    ? "hover:border-red-300 border-red-500 focus:border-red-500 rounded-sm focus:ring-1 focus:ring-red-300 dark:focus:ring-red-300 hover:ring-offset-red-300 hover:focus:ring-offset-red-300"
                    : "hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300"
                } w-full border text-[14px] p-2  outline-none`}
              />
              {fnerror != 0 ? (
                <p className="text-[10px] text-red-500">{fnerror}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-zinc-400 text-[14px]">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className={`${
                  lnerror != 0
                    ? "hover:border-red-300 border-red-500 focus:border-red-500 rounded-sm focus:ring-1 focus:ring-red-300 dark:focus:ring-red-300 hover:ring-offset-red-300 hover:focus:ring-offset-red-300"
                    : "hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300"
                } w-full border text-[14px] p-2  outline-none`}
              />
              {lnerror != 0 ? (
                <p className="text-[10px] text-red-500">{lnerror}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-zinc-400 text-[14px]">Company</label>
            <input
              type="text"
              placeholder="Demo inc."
              className={`hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300 w-full border text-[14px] p-2  outline-none`}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-zinc-400 text-[14px]">Email Address</label>
            <input
              type="text"
              placeholder="demo@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${
                email == 0 || emailError != 0
                  ? "hover:border-red-300 border-red-500 focus:border-red-500 rounded-sm focus:ring-1 focus:ring-red-300 dark:focus:ring-red-300 hover:ring-offset-red-300 hover:focus:ring-offset-red-300"
                  : "hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300"
              } w-full border text-[14px] p-2  outline-none`}
            />
            {email == 0 ? (
              <p className="text-[10px] text-red-500">Email is required</p>
            ) : emailError != 0 ? (
              <p className="text-[10px] text-red-500">{emailError}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-zinc-400 text-[14px]">Password</label>

            <div className="relative">
              <input
                type={hide ? "text" : "password"}
                placeholder="****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  password == 0
                    ? "hover:border-red-300 border-red-500 focus:border-red-500 rounded-sm focus:ring-1 focus:ring-red-300 dark:focus:ring-red-300 hover:ring-offset-red-300 hover:focus:ring-offset-red-300"
                    : "hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300"
                } w-full border text-[14px] p-2  outline-none`}
              />
              {password == 0 ? (
                <p className="mt-1 text-[10px] text-red-500">Password is required</p>
              ) : pserror != 0 ? (
                <p className="mt-1 text-[10px] text-red-500">{pserror}</p>
              ) : (
                ""
              )}
              <span
                onClick={() => setHide((prev) => !prev)}
                className="absolute right-[10px] top-[50%] translate-y-[-60%] cursor-pointer"
              >
                {hide ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <div className="flex gap-x-3 text-[12px] items-center font-bold">
              <span
                className={`${
                  strength == "poor"
                    ? "bg-red-500"
                    : strength == "week"
                    ? "bg-yellow-500"
                    : strength == "Normal"
                    ? "bg-amber-800"
                    : strength == "Good"
                    ? "bg-green-400"
                    : strength == "Strong"
                    ? "bg-green-700"
                    : "bg-red-500 "
                } h-2 w-[20%] rounded-lg`}
              ></span>
              {password == 0 ? <p>poor</p> : <p>{strength}</p>}
            </div>
          </div>
          <p className="text-[12px]">
            By Signing up, you agree to our{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              Privacy Policy{" "}
            </span>
          </p>
          <button className="text-center bg-blue-500 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-600 transform hover:scale-105 transition-transform duration-200">
            Create Accoount
          </button>
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-between items-end py-6 px-10 mt-7">
        <p className="text-[12px] font-bold text-zinc-400">
          © Made with love by Team{" "}
          <span className="text-blue-400 hover:underline cursor-pointer">
            CodedThemes
          </span>
        </p>
        <p className="text-[12px] font-bold text-zinc-400">
          Distributed by{" "}
          <span className="text-blue-400 hover:underline cursor-pointer">
            ThemeWagon
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
