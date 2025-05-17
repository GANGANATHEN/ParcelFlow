"use client";
import { dashBoard, Orders } from "../../constants/index.jsx";
import { useState } from "react";
import Image from "next/image.js";
// react icons start
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
// react icons start
import "../../globals.css";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("month");
  const [arrowContol, setarrowContol] = useState(true);

  return (
    <div className="flex flex-col gap-y-6">
      {/* dashboard */}
      <section>
        <h1 className="text-black">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4 mt-3">
          {dashBoard.map((data, index) => (
            <div
              key={index.id}
              className="p-3 bg-white rounded-lg border-1 border-gray-200"
            >
              <p className="text-gray-400">{data.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-black text-[18px]">{data.total}</span>
                {data.rate <= "50.0%" ? (
                  <span className="flex items-center rounded-sm bg-yellow-50 px-2 gap-2 text-[12px] border-1 border-yellow-400 text-yellow-500">
                    {data.icon} <span>{data.rate}</span>
                  </span>
                ) : (
                  <span className="flex items-center rounded-sm bg-blue-50 px-2 gap-2 text-[12px] border-1 border-blue-400 text-blue-500">
                    {data.icon} <span>{data.rate}</span>
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-[12px] mt-3">
                {data.para1}{" "}
                {data.rate <= "50.0%" ? (
                  <span className="text-yellow-500">{data.number}</span>
                ) : (
                  <span className="text-blue-500">{data.number}</span>
                )}{" "}
                {data.para2}
                <span className="block">{data.para3}</span>{" "}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* dashboard contents */}
      <section className="flex flex-col gap-y-6">
        {/* Unique Visitor box */}
        <div className="flex justify-between gap-4">
          <div className="w-[70%] flex flex-col gap-y-5">
            <div className="flex justify-between">
              <h1 className="font-bold">Unique Visitor</h1>
              <div className="flex gap-x-2 text-[14px] items-center">
                <button
                  className={`px-2 py-1 rounded-sm cursor-pointer ${
                    activeView === "month"
                      ? "border border-blue-500 text-blue-500 hover:text-blue-600"
                      : "hover:bg-zinc-100"
                  }`}
                  onClick={() => setActiveView("month")}
                >
                  Month
                </button>
                <button
                  className={`px-2 py-1 rounded-sm cursor-pointer ${
                    activeView === "week"
                      ? "border border-blue-500 text-blue-500 hover:text-blue-600"
                      : "hover:bg-zinc-100"
                  }`}
                  onClick={() => setActiveView("week")}
                >
                  Week
                </button>
              </div>
            </div>
            <div className="border-1 border-gray-200 p-5 rounded-sm bg-white">chart</div>
          </div>
          {/* Income Overview chart */}
          <div className="w-[30%] flex flex-col gap-y-5">
            <h1 className="font-bold">Income Overview</h1>
            <div className="border-1 border-gray-200 p-5 rounded-sm">chart</div>
          </div>
        </div>
        {/* Recent Orders box */}
        <div className="flex justify-between gap-4">
          <div className="w-[70%] flex flex-col gap-y-5">
            <h1 className="font-bold">Recent Orders</h1>
            <div className="border border-gray-200 rounded-sm bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="min-w-full table-auto text-sm text-left rtl:text-right">
                <thead className="text-xs font-bold uppercase bg-zinc-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-2 whitespace-nowrap">
                      TRACKING NO.
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      PRODUCT NAME
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">TOTAL ORDER</th>
                    <th className="px-6 py-3 whitespace-nowrap">STATUS</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      TOTAL AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Orders.map((data, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 border-gray-200 hover:bg-zinc-100 dark:hover:bg-zinc-600"
                    >
                      <td className="px-6 py-3 text-zinc-400 hover:underline whitespace-nowrap">
                        {data.tracking}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {data.product}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right">
                        {data.order}
                      </td>
                      <td className="px-6 py-3 flex items-center whitespace-nowrap">
                        <FaCircle
                          className={`mr-2 text-[10px] ${
                            data.status === "Approved"
                              ? "text-lime-500"
                              : data.status === "Pending"
                              ? "text-yellow-400"
                              : "text-red-500"
                          }`}
                        />
                        {data.status}
                      </td>
                      <td className="p-2 whitespace-nowrap">{data.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Analytics Report box */}
          <div className="w-[30%] flex flex-col gap-y-5">
            <div className="font-bold">Analytics Report</div>
            <div className="border-1 border-gray-200 p-5 rounded-sm">chart</div>
          </div>
        </div>
        {/* Sales Report box */}
        <div className="flex justify-between gap-4">
          <div className="w-[70%] flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">Sales Report</h1>
              <button
                className="flex gap-x-3 items-center px-2 py-1 bg-gray-50 border-1 border-gray-200 rounded-sm hover:border-blue-500"
                onClick={() => {
                  setarrowContol((prev) => !prev);
                }}
              >
                Today{" "}
                {arrowContol ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
              </button>
            </div>
            <div className="border-1 border-gray-200 p-5 rounded-sm">
              content
            </div>
          </div>
          {/* Transaction History box */}
          <div className="w-[30%] flex flex-col gap-y-5">
            <div className="font-bold">Transaction History</div>
            <div className="text-[14px] flex flex-col border-1 border-gray-100 bg-white shadow-sm rounded-lg">
              <div className="flex items-center gap-x-5 p-3 cursor-pointer border-t-1 border-gray-100 hover:bg-gray-100">
                <div className="w-[10%] text-center flex justify-center">
                  <p className="text-[16px] p-2 text-lime-500 rounded-[50%] border-0 bg-lime-50">
                    <GoGift />
                  </p>{" "}
                </div>
                <div className="w-[90%] flex justify-between gap-3">
                  <p className="font-bold">
                    Order #002434
                    <span className="block text-zinc-400 text-[10px] font-normal">
                      Today, 2:00 AM
                    </span>
                  </p>
                  <p className="text-[12px] text-right font-bold">
                    + $1,430
                    <span className="block text-zinc-400 text-[10px] font-normal text-right">
                      78%
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-5 p-3 border-t-1 cursor-pointer border-gray-100 hover:bg-gray-100">
                <div className="w-[10%] text-center flex justify-center">
                  <p className="text-[16px] p-2 bg-blue-50 text-blue-400 rounded-[50%]">
                    <AiOutlineMessage />{" "}
                  </p>
                </div>
                <div className="w-[90%] flex justify-between">
                  <p className="font-bold">
                    Order #984947
                    <span className="block text-zinc-400 text-[10px] font-normal">
                      5 August, 1:45 PM
                    </span>
                  </p>
                  <p className="text-[12px] font-bold text-right">
                    + $302
                    <span className="block text-zinc-400 text-[10px] font-normal">
                      8%
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-5 p-3 border-t-1 border-gray-100 cursor-pointer hover:bg-gray-100">
                <div className="w-[10%] text-center flex justify-center">
                  <p className="text-[16px] bg-red-50 text-red-500 p-2 rounded-[50%]">
                    <IoSettingsOutline />
                  </p>
                </div>
                <div className="w-[90%] flex justify-between">
                  <p className="font-bold">
                    Order #988784
                    <span className="block text-zinc-400 text-[10px] font-normal">
                      7 hours ago
                    </span>
                  </p>
                  <p className="text-[12px] text-right font-bold">
                    + $682
                    <span className="block text-zinc-400 text-[10px] font-normal">
                      16%
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-1 border-gray-200 p-5 flex flex-col gap-y-5 rounded-sm bg-white">
              <div className="flex flex-col gap-y-1">
                <p className="font-bold">
                  Help & Support Chat{" "}
                  <span className="block text-[12px] text-zinc-400 font-normal">
                    Typical replay within 5 min
                  </span>
                </p>
                <div className="relative flex items-center">
                  <Image
                    className="z-4 rounded-[50%] border-r-2 border-white"
                    src={"/profile/1.png"}
                    alt="1"
                    width={35}
                    height={35}
                  />
                  <Image
                    className="z-3 absolute left-[13%] rounded-[50%] border-r-2 border-white"
                    src={"/profile/2.png"}
                    alt="2"
                    width={35}
                    height={35}
                  />
                  <Image
                    className="z-2 absolute left-[25%] rounded-[50%] border-r-2 border-white"
                    src={"/profile/3.png"}
                    alt="3"
                    width={35}
                    height={35}
                  />
                  <Image
                    className="z-1 absolute left-[38%] rounded-[50%] border-r-2 border-white"
                    src={"/profile/4.png"}
                    alt="4"
                    width={35}
                    height={35}
                  />
                </div>
              </div>
              <button className="bg-blue-500 text-white rounded-lg p-2 text-[12px] cursor-pointer hover:bg-blue-600 duration-200">Need Help?</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
