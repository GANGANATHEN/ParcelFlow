"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, Navbar } from "../constants/index.jsx";
import "../globals.css";
import Profile from "./profile.js";
import Setting from "./setting.js";
// import react-icons start
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
// import react-icons end

const Dashboard = ({ children }) => {
  const [sidbarControll, setsidbarControll] = useState(true);
  // console.log(sidbarControll);

  const [active, setActive] = useState("");
  const [notification, setNotification] = useState(false);
  const [markasRead, setMarkasRead] = useState(true);
  const [profile, setProfile] = useState(false);
  const [profileDetail, setProfileDetail] = useState("profile");

  // useEffect(() => {
  //   console.log("click");

  // }, [active])

  return (
    <div lang="en">
      {/* navbar and sidebar contents */}
      <section className="flex">
        {/* sidebar */}
        <section
          className={`sticky p-b-4 top-0 z-50 h-screen bg-white border border-gray-100 flex flex-col pb-4 transition-all duration-700 ease-in-out ${
            sidbarControll ? "w-[20%]" : "w-[5%] gap-y-3 items-center"
          }`}
        >
          <Link href="/dashboard" className="flex gap-3 px-[10%] py-[5%] mt-2">
            <Image src="/logo/image.png" width={30} height={30} alt="logo" />
            {sidbarControll && <p className="font-bold text-2xl">Mantis</p>}
          </Link>
          {/* className={`${sidbarControll ? null : "flex flex-col gap-y-2"}`} */}

          {navLinks.map((data, index) => (
            <div key={index.id}>
              {data.p ? (
                <p
                  className={`text-stone-400 text-[12px] px-[10%] ${
                    sidbarControll ? "mb-3 mt-4" : null
                  }`}
                >
                  {sidbarControll ? `${data.p}` : null}
                </p>
              ) : null}
              <Link
                href={data.link}
                target={
                  data.link === "/login" ||
                  data.link === "/register" ||
                  data.link === "https://codedthemes.gitbook.io/mantis"
                    ? "_blank"
                    : "_self"
                }
                className={`flex items-center hover:bg-blue-100 hover:text-blue-500 
                ${
                  sidbarControll
                    ? "gap-3 text-[16px] px-[10%]"
                    : "justify-center p-2  text-[25px] rounded-lg"
                }
                ${
                  active === data.link_p &&
                  data.link_p !== "Login" &&
                  data.link_p !== "Register" &&
                  data.link_p !== "Documentation"
                    ? `bg-blue-100 text-blue-500 ${
                        sidbarControll ? "border-r-2 border-blue-500" : ""
                      }`
                    : ""
                }`}
                onClick={() => setActive(data.link_p)}
              >
                {data.icon}
                {sidbarControll && <p className="py-3 text-[14px]">{data.link_p}</p>}
              </Link>
            </div>
          ))}
        </section>

        {/* navbar and main contents */}
        <section
          className={` ${
            sidbarControll ? "w-[80%] flex flex-col" : "w-[95%] flex flex-col"
          }`}
        >
          {/* navbar */}
          <div className="relative">
            <div className="sticky top-0 z-50 bg-white border-1 border-l-0 border-gray-100 px-[2%] py-[1%] flex justify-between items-center">
              <div className="flex gap-x-4">
                <button
                  className={`text-[16px] cursor-pointer p-2 rounded-sm ${
                    sidbarControll ? "hover:bg-gray-200 " : "bg-gray-200"
                  }`}
                  onClick={() => setsidbarControll((prev) => !prev)}
                >
                  {sidbarControll ? (
                    <AiOutlineMenuFold />
                  ) : (
                    <AiOutlineMenuUnfold />
                  )}
                </button>
                <div className="relative flex items-center text-zinc-400">
                  <input
                    type="text"
                    placeholder="Ctrl + K"
                    className="border text-[14px] placeholder:font-bold pl-[15%] py-2 hover:border-blue-300 border-gray-300 focus:border-blue-300 rounded-sm focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-300 hover:ring-offset-blue-300 hover:focus:ring-offset-blue-300 outline-none"
                  />
                  <IoIosSearch className="absolute top-1 left-0 translate-x-[50%] translate-y-[50%]" />
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <Link
                  href="https://github.com/codedthemes/mantis-free-react-admin-template"
                  target="blank"
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  <SiGithub className="text-[18px]" />
                </Link>
                {/* notification */}
                <div
                  className={`${
                    notification ? "bg-gray-100 rounded-lg" : "rounded-lg"
                  } relative p-2 cursor-pointer hover:bg-gray-100 rounded-lg"`}
                  onClick={() => {
                    setNotification((prev) => !prev);
                    setProfile(false);
                  }}
                >
                  <IoNotificationsOutline className="text-[18px]" />
                  {markasRead && (
                    <p className="absolute top-0 w-3.5 h-3.5 flex justify-center items-center translate-x-[60%] translate-y-[15%] p-1 text-[10px] font-black text-white rounded-[50%] bg-blue-500">
                      <span>2</span>
                    </p>
                  )}
                </div>
                {/* profile */}
                <div
                  className={`${
                    profile ? "bg-gray-100" : "hover:bg-gray-100"
                  } flex gap-x-2 cursor-pointer rounded-lg p-2`}
                  onClick={() => {
                    setProfile((prev) => !prev);
                    setNotification(false);
                  }}
                >
                  <Image
                    src="/profile/1.svg"
                    width={25}
                    height={25}
                    alt="profile"
                  />
                  <p className="text-[14px] font-bold">John Doe</p>
                </div>
              </div>
            </div>
            {/* notification contents */}
            {notification && (
              <div className="absolute w-[40%] z-51 top-[100%] right-[10%] text-[14px] flex flex-col border-1 border-gray-100 bg-white shadow-sm rounded-lg">
                <div className="flex items-center justify-between p-3">
                  <h1 className="font-bold">Notification</h1>
                  <IoCheckmarkCircleOutline
                    className="text-lime-500 text-[18px]"
                    onClick={() => setMarkasRead(false)}
                  />
                </div>
                <div className="flex items-center gap-x-3 p-3 cursor-pointer border-t-1 border-gray-100 bg-gray-50 hover:bg-blue-50">
                  <p className="w-[10%] text-[16px] p-2 text-lime-500 rounded-[50%] border-0 bg-lime-50">
                    <GoGift />
                  </p>{" "}
                  <div className="w-[90%] flex justify-between gap-3">
                    <p>
                      It&apos;s{" "}
                      <span className="font-bold">Cristina danny&apos;s </span>
                      birthday today.
                      <span className="block text-zinc-400 text-[10px]">
                        2 min ago
                      </span>
                    </p>
                    <p className="text-[12px]">3:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 p-3 border-t-1 cursor-pointer border-gray-100 hover:bg-gray-50">
                  <p className="w-[10%] text-[16px] p-2 bg-blue-50 text-blue-400 rounded-[50%]">
                    <AiOutlineMessage />{" "}
                  </p>

                  <div className="w-[90%] flex justify-between">
                    <p>
                      <span className="font-bold">Aida Burg</span> commented
                      your post.
                      <span className="block text-zinc-400 text-[10px]">
                        5 August
                      </span>
                    </p>
                    <p className="text-[12px]">6:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 p-3 border-t-1 border-gray-100 cursor-pointer bg-gray-50 hover:bg-blue-50">
                  <p className="w-[10%] text-[16px] bg-red-50 text-red-500 p-2 rounded-[50%]">
                    <IoSettingsOutline />
                  </p>
                  <div className="w-[90%] flex justify-between">
                    <p>
                      Your Profile is Complete{" "}
                      <span className="font-bold">60%</span>
                      <span className="block text-zinc-400 text-[10px]">
                        7 hours ago
                      </span>
                    </p>
                    <p className="text-[12px]">2:45 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 p-3 border-t-1 border-gray-100 cursor-pointer hover:bg-gray-50">
                  <div className="w-[10%] flex items-center p-2 bg-blue-50 rounded-[50%] text-[14px] text-blue-500">
                    <svg
                      className="fill-blue-500 stroke-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M329.1 142.9c-62.5-62.5-155.8-62.5-218.3 0s-62.5 163.8 0 226.3s155.8 62.5 218.3 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3c-87.5 87.5-221.3 87.5-308.8 0s-87.5-229.3 0-316.8s221.3-87.5 308.8 0c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
                    </svg>
                  </div>{" "}
                  <div className="w-[90%] flex justify-between">
                    <p>
                      <span className="font-bold">Cristina Danny</span> invited
                      to join <span className="font-bold">Meeting</span>.
                      <span className="block text-zinc-400 text-[10px]">
                        Daily scrum meeting time
                      </span>
                    </p>
                    <p className="text-[12px]">9:10 PM</p>
                  </div>
                </div>
                <div className="p-3 border-t-1 border-gray-100 text-center hover:bg-gray-50 cursor-pointer">
                  <p className="text-blue-400">View All</p>
                </div>
              </div>
            )}
            {/* profile contents */}
            {profile && (
              <div className="absolute w-[30%] z-51 top-[100%] right-[5%] text-[14px] flex flex-col border-1 border-gray-100 bg-white shadow-sm rounded-lg">
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/profile/1.svg"
                      width={25}
                      height={25}
                      alt="profile pic"
                    />
                    <p className="text-[14px] ">
                      John Doe{" "}
                      <span className="block text-[12px] font-normal text-zinc-400">
                        UI/UX Designer
                      </span>
                    </p>
                  </div>
                  <p className="text-[22px] p-2 hover:bg-blue-50 hover:text-blue-500 rounded-lg cursor-pointer">
                    <AiOutlineLogout />
                  </p>
                </div>
                <div className="w-full flex">
                  <div
                    className={`${
                      profileDetail === "profile" && " text-blue-500"
                    } w-[50%] p-5 hover:bg-blue-50 text-center rounded-lg flex items-center justify-center gap-2 cursor-pointer`}
                    onClick={() => setProfileDetail("profile")}
                  >
                    <LuUserRound className="text-[16px]" />
                    Profile
                  </div>
                  <div
                    className={`${
                      profileDetail === "setting" && " text-blue-500"
                    } w-[50%] p-5 hover:bg-blue-50 text-center rounded-lg flex justify-center items-center gap-2`}
                    onClick={() => setProfileDetail("setting")}
                  >
                    <IoSettingsOutline className="text-[16px]" />
                    Settings
                  </div>
                </div>
                <div className="relative h-0.5 w-full overflow-hidden">
                  <div
                    className={`absolute h-full bg-blue-500 transition-transform duration-500 ease-out ${
                      profileDetail === "profile"
                        ? "transform translate-x-0"
                        : "transform translate-x-full"
                    }`}
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <div className="contents">
                  {profileDetail === "profile" ? <Profile /> : <Setting />}
                </div>
              </div>
            )}
          </div>
          {/* main contents */}
          <div className="h-screen px-[5%] py-[2%] bg-gray-50 overflow-y-auto">
            {children}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
