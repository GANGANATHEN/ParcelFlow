"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Page = () => {
  const containerRef = useRef(null);
  const topContainerRef = useRef(null);

  useEffect(() => {
    // Canvas setup function
    const setupCanvas = (container) => {
      if (!container) return;
      const canvas = document.createElement("canvas");
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      canvas.className = "absolute inset-0 z-50 pointer-events-none";
      container.appendChild(canvas);
      return canvas.getContext("2d");
    };

    const ctxBottom = setupCanvas(containerRef.current);
    const ctxTop = setupCanvas(topContainerRef.current);

    const boxesBottom = [];
    const boxesTop = [];

    const draw = (ctx, boxes, container) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      boxes.forEach((box, i) => {
        box.y += box.speed;
        ctx.fillStyle = `rgba(236, 72, 153, ${box.opacity})`;
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.size, box.size / 2);
        ctx.fillRect(box.x, box.y, box.size, box.size / 2);

        if (box.y > ctx.canvas.height) boxes.splice(i, 1);
      });
      requestAnimationFrame(() => draw(ctx, boxes, container));
    };

    if (ctxBottom) draw(ctxBottom, boxesBottom, containerRef.current);
    if (ctxTop) draw(ctxTop, boxesTop, topContainerRef.current);

    const createBox = (boxes, container) => {
      boxes.push({
        x: Math.random() * container.offsetWidth - 50,
        y: -300,
        size: gsap.utils.random(100, 300),
        speed: gsap.utils.random(2, 5),
        opacity: 0.6
      });
    };

    const bottomInterval = setInterval(() => createBox(boxesBottom, containerRef.current), 60);
    const topInterval = setInterval(() => createBox(boxesTop, topContainerRef.current), 80);

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
          className="relative h-full"
          style={{
            transform: "rotateX(125deg) translateY(-25%)",
            transformOrigin: "top",
          }}
        ></div>
      </div>

      {/* BOTTOM FLOOR */}
      <div
        className="absolute inset-0 w-full h-full perspective-200 pointer-events-none"
        style={{ perspectiveOrigin: "50% 100%" }}
      >
        <div
          className="relative h-full grid-container"
          style={{ height: "calc(100% + 55px)" }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(236, 72, 153, 0.5) 2px, transparent 1px), linear-gradient(to bottom, rgba(236, 72, 153, 0.5) 2px, transparent 1px)`,
              backgroundSize: `${100 / 9}% ${100 / 8}%`,
              backgroundPosition: "0 50px",
            }}
          />
        </div>

        <div
          ref={containerRef}
          className="absolute inset-0 z-50 pointer-events-none grid-containe-d"
        />
      </div>
    </div>
  );
};

export default Page;