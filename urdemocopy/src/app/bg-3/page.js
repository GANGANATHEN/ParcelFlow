"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Page = () => {
  const containerRef = useRef(null);
  const topContainerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const createPool = (container, count) => {
      const pool = [];
      for (let i = 0; i < count; i++) {
        const box = document.createElement("div");
        box.className = "absolute z-40 border-2 border-pink-500 bg-pink-500 pointer-events-none will-change-transform";
        container.appendChild(box);
        pool.push(box);
      }
      return pool;
    };

    const runAnimation = (container, pool) => {
      pool.forEach((box) => {
        const size = gsap.utils.random(50, 150);
        
        // Initial state set to random position
        gsap.set(box, {
          width: size,
          height: size / 2,
          x: gsap.utils.random(0, container.offsetWidth),
          y: gsap.utils.random(-1000, 0), // Spread boxes vertically initially
          opacity: 0,
        });

        // Animation
        const animate = () => {
          gsap.to(box, {
            y: container.offsetHeight + 300,
            opacity: 0.6,
            duration: gsap.utils.random(3, 6),
            ease: "none",
            delay: gsap.utils.random(0, 5), // Random delay for staggered look
            onComplete: () => {
              gsap.set(box, { y: -300, x: gsap.utils.random(0, container.offsetWidth) });
              animate();
            },
          });
        };
        animate();
      });
    };

    // Grid Animation - Fixed
    gsap.to(gridRef.current, {
      backgroundPosition: "0 100px",
      duration: 2,
      ease: "none",
      repeat: -1,
    });

    const bottomPool = createPool(containerRef.current, 150);
    const topPool = createPool(topContainerRef.current, 150);

    runAnimation(containerRef.current, bottomPool);
    runAnimation(topContainerRef.current, topPool);

    return () => {
      gsap.globalTimeline.clear();
      bottomPool.forEach(b => b.remove());
      topPool.forEach(b => b.remove());
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#09111e] overflow-hidden">
      <div className="absolute top-20 w-full h-[60%] perspective-200" style={{ perspectiveOrigin: "50% 0%" }}>
        <div ref={topContainerRef} className="relative h-full" style={{ transform: "rotateX(125deg) translateY(-25%)", transformOrigin: "top" }}></div>
      </div>

      <div className="absolute inset-0 w-full h-full perspective-200 pointer-events-none">
        {/* Grid Ref here for movement */}
        <div 
          ref={gridRef}
          className="relative h-full"
          style={{ 
            height: "100%", 
            backgroundImage: "linear-gradient(to right, rgba(236, 72, 153, 0.5) 2px, transparent 1px), linear-gradient(to bottom, rgba(236, 72, 153, 0.5) 2px, transparent 1px)", 
            backgroundSize: "10% 10%",
            backgroundPosition: "0 0" 
          }} 
        />
        <div ref={containerRef} className="absolute inset-0 z-50" />
      </div>
    </div>
  );
};

export default Page;