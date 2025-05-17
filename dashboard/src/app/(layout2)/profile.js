"use client"
import React from 'react'
import { LuPenLine } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";
import { TiClipboard } from "react-icons/ti";
import { CiWallet } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

const Profile = () => {

  return (
    <div>
       <p className='p-4 flex gap-3 items-center cursor-pointer hover:bg-gray-100'><LuPenLine />{' '}Edit Profile</p>
       <p className='p-4 flex gap-3 items-center cursor-pointer hover:bg-gray-100'><LuUserRound />{' '}View Profile</p>
       <p className='p-4 flex gap-3 items-center cursor-pointer hover:bg-gray-100'><TiClipboard />{' '}Social Profile</p>
       <p className='p-4 flex gap-3 items-center cursor-pointer hover:bg-gray-100'><CiWallet />{' '}Billing</p>
       <p className='p-4 flex gap-3 items-center cursor-pointer hover:bg-gray-100 rounded-b-lg'><AiOutlineLogout />{' '}Logout</p>
    </div>
  )
}

export default Profile
