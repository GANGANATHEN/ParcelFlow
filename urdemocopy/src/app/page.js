"use client";
import React from "react";
import Nav_Component from "./coinbarter/page";
// import GlassToast from "./border/page";
import LiquidGlass from "./try/glass";
import Popup from "./popup/popup";

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
         transition-opacity duration-600 -z-1"
      >
        <source src="/image/video.mp4" type="video/mp4" />
      </video>
      <Popup />
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
          {/* <div className="fixed z-10 top-120 mr-60">
            <LiquidGlass status="error" />
          </div> */}
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
        {/* <div>
          <div className="2xl:mt-[69px] relative mt-6 md:mt-10 xl:mt-12 overflow-hidden map-section z-20">
             onClick={() => setActiveMap(true)} onMouseLeave={() => setActiveMap(false)}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.977342259324!2d80.2528158289275!3d13.05193902097606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab159f64e9%3A0xb7743db9d152516b!2sIMUII%20TECHNOLOGY%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1778840228585!5m2!1sen!2sin%22"
              width="100%"
              className={`2xl:h-[400px] max-xs:h-[170px] xs:h-[180px] sm:h-[230px] lg:h-[280px] xl:h-[300px]  3xl:rounded-[40px] rounded-[14px] md:rounded-[20px]
            }`}
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default page;
