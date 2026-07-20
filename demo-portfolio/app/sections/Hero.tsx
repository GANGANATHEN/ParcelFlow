"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-10 h-screen flex items-center justify-center perspective-1000"
    >
      <div className="text-center px-4">
        <h1
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter mb-6 preserve-3d opacity-0"
        >
          <span className="text-gradient">DEMO</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 tracking-[0.3em] uppercase font-light opacity-0"
        >
          Fullstack Developer
        </p>

        <div
          ref={scrollIndicatorRef}
          className="mt-16 flex flex-col items-center gap-3 opacity-0"
        >
          <span className="text-xs text-gray-600 tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
