"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TimeWarpBackground() {
  const warpRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    // MAIN SVG DRIFT
    gsap.to(warpRef.current, {
      x: -120,
      y: -60,
      rotate: -4,
      scale: 1.15,
      duration: 18,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // STAR MOVEMENT
    starsRef.current.forEach((star) => {
      gsap.fromTo(
        star,
        {
          y: "120%",
          opacity: 0,
        },
        {
          y: "-120%",
          opacity: 1,
          duration: gsap.utils.random(4, 10),
          repeat: -1,
          ease: "none",
          delay: gsap.utils.random(0, 5),
        },
      );
    });

    // MOUSE PARALLAX
    const move = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.015;
      const y = (e.clientY - window.innerHeight / 2) * 0.015;

      gsap.to(warpRef.current, {
        x,
        y,
        duration: 2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* GLOW LAYER */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-[180px]" />

      {/* STAR FIELD */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (starsRef.current[i] = el)}
            className="absolute rounded-full bg-white/80"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 120 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* PERSPECTIVE WRAPPER */}
      <div
        className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        [transform:perspective(1400px)_rotateX(70deg)_scale(1.5)]
        "
      >
        {/* WARP SVG */}
        <svg
          ref={warpRef}
          viewBox="0 0 1600 900"
          className="w-[160%] h-[160%] opacity-80"
        >
          <defs>
            {/* MAIN GRADIENT */}
            <radialGradient id="core">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#7c4dff" />
              <stop offset="50%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* DISTORTION */}
            <filter id="warp">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008"
                numOctaves="3"
                seed="4"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="20s"
                  values="0.008;0.02;0.008"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" />
            </filter>
          </defs>

          {/* BIG WARP CIRCLE */}
          <circle
            cx="800"
            cy="450"
            r="340"
            fill="url(#core)"
            filter="url(#warp)"
            opacity="0.9"
          />

          {/* EXTRA RINGS */}
          <circle
            cx="800"
            cy="450"
            r="420"
            stroke="#7c4dff"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />

          <circle
            cx="800"
            cy="450"
            r="520"
            stroke="#00d2ff"
            strokeWidth="2"
            fill="none"
            opacity="0.15"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <h1 className="text-6xl font-black tracking-[0.4em] text-white">
          TIME WARP
        </h1>
      </div>
    </div>
  );
}
