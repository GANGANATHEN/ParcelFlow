"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Page = () => {
  const containerRef = useRef(null);
  const topContainerRef = useRef(null);

  // fallback --> random duration for box moving, remove random duration to avoid overlap issue
  useEffect(() => {
    // Box creation function that accepts a container
    const createBox = (container) => {
      if (!container) return;
      const box = document.createElement("div");
      box.className =
        "absolute z-40 border-2 border-pink-500 bg-pink-500 pointer-events-none";
      const size = gsap.utils.random(100, 300);
      const containerWidth = container.offsetWidth;
      // const containerWidth = window.innerWidth * 3;
      const startX = gsap.utils.random(0, containerWidth);

      gsap.set(box, {
        width: size,
        height: size / 2,
        left: startX,
        top: -300,
        opacity: 0,
        xPercent: -50,
        transform: "rotateX(0deg) translateZ(20px)",
      });

      container.appendChild(box);
      gsap.to(box, {
        top: "110%",
        opacity: 0.6,
        duration: gsap.utils.random(3, 6),
        ease: "none",
        onComplete: () => box.remove(),
      });
    };

    // Bottom Floor Interval
    const bottomInterval = setInterval(() => {
      createBox(containerRef.current);
    }, 60); // Bottom timing

    // Top Floor Interval
    const topInterval = setInterval(() => {
      createBox(topContainerRef.current);
    }, 80); // Top timing

    return () => {
      clearInterval(bottomInterval);
      clearInterval(topInterval);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#09111e] overflow-hidden">
      {/* TOP FLOOR */}
      <div
        className="absolute top-20 w-full h-[60%] perspective-200"
        style={{ perspectiveOrigin: "50% 0%" }}
      >
        <div
          ref={topContainerRef}
          className="relative h-full "
          style={{
            transform: "rotateX(125deg) translateY(-25%)", // translateY control
            transformOrigin: "top", // control front tilt
          }}
        ></div>
      </div>

      {/* BOTTOM FLOOR (Original) */}
      <div
        className="absolute inset-0 w-full h-full perspective-200 pointer-events-none"
        style={{ perspectiveOrigin: "50% 100%" }}
      >
        {/* Layer 1: Grid Lines (Only visual) */}
        <div
          className="relative h-full grid-container"
          style={{ height: "calc(100% + 55px)" }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
          linear-gradient(to right, rgba(236, 72, 153, 0.5) 2px, transparent 1px),
          linear-gradient(to bottom, rgba(236, 72, 153, 0.5) 2px, transparent 1px)
        `,
              backgroundSize: `${100 / 9}% ${100 / 8}%`,
              backgroundPosition: "0 50px",
            }}
          />
        </div>

        {/* Layer 2: Box Container */}
        <div
          ref={containerRef}
          className="absolute inset-0 z-50 pointer-events-none grid-containe-d"
        />
      </div>
    </div>
  );
};

export default Page;
