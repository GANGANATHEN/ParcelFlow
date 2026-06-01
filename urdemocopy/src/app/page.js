"use client";
import React, { useState } from "react";
import Nav_Component from "./coinbarter/page";
// import LiquidGlass from "./try/glass";
import Popup from "./popup/popup";
// import CloudBackground from "./bg/cloudBg";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      <video
        // autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/image/video.mp4" type="video/mp4" />
      </video>

      {/* Floating Buttons & Nav (z-20) */}
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="hidden w-full">
          <Nav_Component />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="absolute left-10 top-10 rounded-xl bg-white px-6 py-3 text-black shadow-lg hover:bg-gray-100 transition-colors"
        >
          Open Popup
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute left-10 top-10 z-9999 flex h-12 w-12 items-center justify-center rounded-full border-4 border-red-400 bg-white text-xl font-bold text-black hover:bg-red-50 transition-all"
          >
            ✕
          </button>

          <div className="relative z-50 w-full max-w-4xl">
            <Popup />
          </div>
        </div>
      )}

      {/* Scrollable Content Layer (z-10) */}
      <div className="relative z-10 h-full w-full hidden overflow-y-auto scroll-smooth">
        {/* Section 1 */}
        <section className="flex h-dvh flex-col items-center justify-center px-5 text-center">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos laborum doloremque aliquid quod expedita id accusamus
              cum illum repudiandae amet nihil aut voluptates, neque veritatis.
              Doloribus deleniti sed veniam voluptate!
            </p>
          </div>
        </section>

        {/* Section 2 (With Background Image) */}
        <section className="flex h-dvh flex-col items-center justify-center bg-[url('/image/2.jpg')] bg-cover bg-center px-5 text-center">
          <div className="max-w-3xl rounded-xl bg-black/50 p-8 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos laborum doloremque aliquid quod expedita id accusamus
              cum illum repudiandae amet nihil aut voluptates, neque veritatis.
              Doloribus deleniti sed veniam voluptate!
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex h-dvh flex-col items-center justify-center px-5 text-center">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos laborum doloremque aliquid quod expedita id accusamus
              cum illum repudiandae amet nihil aut voluptates, neque veritatis.
              Doloribus deleniti sed veniam voluptate!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
