'use client'

import React from "react";
import Nav_Component from "./coinbarter/page";
// import GlassToast from "./border/page";
import LiquidGlass from "./try/glass";

const page = () => {

  return (
    <div className="h-dvh w-full relative overflow-y-auto inset-0 overflow-hidden bg-cover bg-center">
      {/* background video border*/}
      <video
        // autoPlay
        loop
        // onDurationChange={0.3}
        muted
        playsInline
        className=" absolute inset-0 w-full h-full object-cover
         transition-opacity duration-600"
      >
        <source src="/image/video.mp4" type="video/mp4" />
      </video>
      <div className="sticky w-full h-full top-0 ">
        <Nav_Component />
      </div>

      <div className="overflow-hidden overflow-y-auto">
        <div className="h-dvh flex flex-col justify-center items-center px-5">
          <h1 className="text-white font-bold text-2xl width-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            laborum doloremque aliquid quod expedita id accusamus cum illum
            repudiandae amet nihil aut voluptates, neque veritatis. Doloribus
            deleniti sed veniam voluptate!
          </p>
        </div>
        <div className="h-dvh flex flex-col justify-center items-center px-5 inset-0 overflow-hidden bg-[url('/image/2.jpg')] bg-cover bg-center">
          <div>
            <h1 className="text-white font-bold text-2xl width-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos laborum doloremque aliquid quod expedita id accusamus
              cum illum repudiandae amet nihil aut voluptates, neque veritatis.
              Doloribus deleniti sed veniam voluptate!
            </p>
          </div>
          <div className="fixed z-10 top-120 mr-60">
            {/* Error Mode */}
            <LiquidGlass status="error" />
          </div>
        </div>
        <div className="h-dvh flex flex-col justify-center items-center px-5">
          <h1 className="text-white font-bold text-2xl width-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            laborum doloremque aliquid quod expedita id accusamus cum illum
            repudiandae amet nihil aut voluptates, neque veritatis. Doloribus
            deleniti sed veniam voluptate!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;