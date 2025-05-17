"use client"
import React,{useState} from "react";
import { FaQuestion } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";
import { AiTwotoneLock } from "react-icons/ai";
import { LuMessageSquareText } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";


const Setting = () => {
    const [settingCheck, setSettingCheck] = useState("active")
  return (
    <div>
      <p className={`${settingCheck === "active" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100"} p-4 flex gap-3 items-center cursor-pointer `}
      onClick={()=>setSettingCheck("active")}>
        <FaQuestion /> Support
      </p>
      <p className={`${settingCheck === "account" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100"} p-4 flex gap-3 items-center cursor-pointer `}
      onClick={()=>setSettingCheck("account")}>
        <LuUserRound /> Account Setting
      </p>
      <p className={`${settingCheck === "privacy" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100"} p-4 flex gap-3 items-center cursor-pointer `}
      onClick={()=>setSettingCheck("privacy")}>
        <AiTwotoneLock /> Privacy Center
      </p>
      <p className={`${settingCheck === "billing" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100"} p-4 flex gap-3 items-center cursor-pointer `}
      onClick={()=>setSettingCheck("billing")}>
        <LuMessageSquareText /> Billing
      </p>
      <p className={`${settingCheck === "logout" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100"} p-4 flex gap-3 items-center cursor-pointer rounded-b-lg`}
      onClick={()=>setSettingCheck("logout")}>
        <FiMenu /> History
      </p>
    </div>
  );
};

export default Setting;
