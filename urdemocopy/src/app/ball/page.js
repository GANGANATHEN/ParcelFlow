"use client";

import React, { useEffect, useRef, useState } from "react";
import BallsCanvas from "./ball";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ballanim = () => {
  const [ballSectionVisible, setBallSectionVisible] = useState(false);
  const [triggerShake, setTriggerShake] = useState(false);
  const exchangeRef = useRef(null);

  useEffect(() => {
    const section = document.querySelector(".ball-section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBallSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.8 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.querySelector(".ball-section");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // only AFTER first animation started
        if (entry.isIntersecting && ballSectionVisible) {
          setTriggerShake((prev) => !prev);
        }
      },
      {
        threshold: 0.6,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [ballSectionVisible]);

  return (
    <>
      {/* NEXT SECTION */}
      <section className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-5">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-black/40">
            Scroll Section
          </p>

          <h2 className="text-5xl font-semibold tracking-tight text-black md:text-7xl">
            Smooth Physics
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/60">
            The floating balls continue naturally with collision detection, drag
            interactions, gravity simulation, and optimized rendering for smooth
            animation performance.
          </p>
        </div>
      </section>
      {/* HERO SECTION */}
      <section className="ball-section relative min-h-screen w-full overflow-hidden bg-[#050816] text-white">
        {/* BALL CANVAS */}
        <div className="absolute inset-0 z-10 ">
          <BallsCanvas
            startFall={ballSectionVisible}
            exchangeRef={exchangeRef}
            triggerShake={triggerShake}
            className="h-full w-full"
          />
        </div>

        {/* GRADIENT OVERLAY */}
        <div
          className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent 
        to-black/70 z-0"
        />

        {/* CONTENT */}
        <div className="relative flex min-h-screen flex-col items-center justify-center px-5">
          {/* TITLE */}
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/50">
              Live Currency Exchange
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Currency
              <span className="bg-linear-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                Flow
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              Interactive floating currency balls with collision physics and
              real-time exchange visualization.
            </p>
          </div>

          {/* EXCHANGE CARD */}
          <div
            ref={exchangeRef}
            className="z-10 relative flex w-[70vw] max-w-md flex-col items-center gap-4 sm:gap-5 
  rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-2xl"
          >
            {/* TOP */}
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs sm:text-sm text-white/50">From</span>
                <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white/60">
                  INR
                </div>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                ₹12.5
              </h2>
            </div>

            {/* SWAP BUTTON*/}
            <button className="group flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20">
              <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:rotate-180">
                ↓
              </span>
            </button>

            {/* BOTTOM */}
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs sm:text-sm text-white/50">To</span>
                <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white/60">
                  USD
                </div>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                $0.15
              </h2>
            </div>

            {/* GLOW */}
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_80px_rgba(168,85,247,0.1)] sm:shadow-[0_0_120px_rgba(168,85,247,0.15)]" />
          </div>
        </div>
      </section>

      {/* NEXT SECTION */}
      <section className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-5">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-black/40">
            Scroll Section
          </p>

          <h2 className="text-5xl font-semibold tracking-tight text-black md:text-7xl">
            Smooth Physics
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/60">
            The floating balls continue naturally with collision detection, drag
            interactions, gravity simulation, and optimized rendering for smooth
            animation performance.
          </p>
        </div>
      </section>
    </>
  );
};

export default Ballanim;
