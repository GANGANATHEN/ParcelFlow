"use client";
import React, { useEffect } from "react";
import Image from "next/image";
// import { Contact_Us_Data } from "../data/data";
import Link from "next/link";
// import Contact_Form from "./form";
import { ChevronRight } from "lucide-react";

const Contact_Us = () => {
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshedOnce");

    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshedOnce", "true");
      window.location.reload();
    }
    return () => {
      sessionStorage.removeItem("hasRefreshedOnce");
    };
  }, []);

  return (
    // container mx-auto px-5 py-20 md:px-10 md:py-33
    <main className="gutter-space relative z-10 w-full h-auto">
      <div className="flex gap-1.5">
        <Link
          href="/"
          className="font-archivo font-normal text-[16px] text-[#e6e6e6]"
        >
          Home
        </Link>
        <ChevronRight className="font-archivo font-normal text-[14px] w-[18px] text-[#e6e6e6]" />

        <button className="font-archivo font-normal text-[16px] text-[#e6e6e6]">
          Contact Support
        </button>
      </div>
      <div className="h-screen">hello</div>

      <main className="w-full grid grid-cols-1 md:grid-cols-3 xl:gap-9.5 max-xs:gap-4 xs:gap-5 sm:gap-6 md:gap-3 mt-6 md:mt-10 xl:mt-12">
        {/* {Contact_Us_Data.map((items) => (
          <div
            key={items.id}
            className="bg-[#1a1a1a] w-full h-auto border border-[#ddd] rounded-[15px] 2xl:rounded-[42px] px-5 pt-5 xl:px-6 xl:pt-6 xl:pb-5 md:px-4 md:pt-4 pb-4 3xl:px-7 3xl:pt-7 3xl:pb-5 flex flex-col max-xs:gap-2.5 xs:gap-3 sm:gap-4 md:gap-3 2xl:gap-5.5"
          >
            <div className="flex justify-between items-center">
              <p className="font-gothic font-normal text-white text-[16px] sm:text-[22px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
                {items.title}
              </p>
              <div className="max-sm:size-11 sm:size-13 md:size-10 lg:size-[50px] 3xl:size-[60px]! rounded-[50%] bg-[#d3ed05] flex items-center justify-center">
                <p className="3xl:size-8.5! size-5 min-[400px]:size-6 md:size-5.5  lg:size-7 relative">
                  <Image
                    src={items.defaultImg}
                    alt={`items-${items.id}`}
                    fill
                    priority={true}
                    className="object-cover"
                  />
                </p>
              </div>
            </div>

            <p className="w-full h-px 2xl:h-[1.3px] bg-[#e0e0e0]"></p>

            <div className="flex flex-col gap-4 md:gap-2 xl:gap-4">
              <div>
                <p
                  className={`font-archivo font-light text-white max-xs:text-[14px] xs:text-[16px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] ${items.id === 0 ? "leading-[175%] min-[500px]:w-1/2 md:w-full lg:w-[90%]" : ""
                    }`}
                >
                  {items.content}
                </p>
                <p
                  className={`font-archivo font-light text-white max-xs:text-[14px] xs:text-[16px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] leading-[200%] ${items.id === 0 ? "hidden" : "block"
                    }`}
                >
                  {items.content}
                </p>
              </div>
              <div className="w-full max-xs:h-[120px] xs:h-[130px] min-[400px]:h-[150px] sm:h-[190px] md:h-25 lg:h-[140px] xl:h-[150px] 2xl:h-[190px]">
                <Image
                  src={items.userImg}
                  alt="img"
                  priority={true}
                  className="rounded-[14px] 2xl:rounded-[30px] object-cover size-full"
                />
              </div>
            </div>
          </div>
        ))} */}
        <div className="h-screen">hi</div>
      </main>
      {/* <Contact_Form /> */}
    </main>
  );
};

export default Contact_Us;
