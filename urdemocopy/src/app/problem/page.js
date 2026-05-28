"use client";
import React, { useState } from "react";
import Problem from "./popup";

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
        <button
          onClick={() => setOpen(true)}
          className="absolute left-10 top-10 rounded-xl bg-white px-6 py-3 text-black shadow-lg hover:bg-gray-100 transition-colors"
        >
          Open Popup
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute left-10 top-10 z-9999 flex h-12 w-12 items-center justify-center rounded-full border-4 border-red-400 bg-white text-xl font-bold text-black hover:bg-red-50 transition-all"
          >
            ✕
          </button>

          <div className="relative z-50 h-full w-full">
            <Problem />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
