"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PerfectLiquidCursor() {
  const COLUMNS = 24;
  const ROWS = 14;
  const totalCells = COLUMNS * ROWS;

  const [activeCells, setActiveCells] = useState([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const gridRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const speedX = Math.abs(x - lastMousePos.current.x);
    lastMousePos.current = { x, y };

    const adjCount = speedX > 30 ? 1 : speedX > 10 ? 1 : 1;

    const cellWidth = rect.width / COLUMNS;
    const cellHeight = rect.height / ROWS;

    const colIndex = Math.floor(x / cellWidth);
    const rowIndex = Math.floor(y / cellHeight);

    if (
      colIndex >= 0 &&
      colIndex < COLUMNS &&
      rowIndex >= 0 &&
      rowIndex < ROWS
    ) {
      const centerCell = rowIndex * COLUMNS + colIndex;
      let currentActive = [centerCell];

      if (adjCount > 1) {
        if (colIndex > 0) currentActive.push(centerCell - 1);
        if (colIndex < COLUMNS - 1) currentActive.push(centerCell + 1);
      }
      if (adjCount > 2) {
        if (colIndex > 1) currentActive.push(centerCell - 2);
        if (colIndex < COLUMNS - 2) currentActive.push(centerCell + 2);
      }

      setActiveCells(currentActive);
    }
  };

  const handleMouseLeave = () => {
    setActiveCells([]);
  };

  const getBorderRadiusClass = (index) => {
    if (!activeCells.includes(index)) return "rounded-none";

    const hasLeft = activeCells.includes(index - 1) && index % COLUMNS !== 0;
    const hasRight =
      activeCells.includes(index + 1) && (index + 1) % COLUMNS !== 0;
    const hasTop = activeCells.includes(index - COLUMNS) && index >= COLUMNS;
    const hasBottom =
      activeCells.includes(index + COLUMNS) && index < totalCells - COLUMNS;

    if (hasLeft && hasRight) return "rounded-none";
    if (hasLeft && !hasRight) return "rounded-r-md";
    if (!hasLeft && hasRight) return "rounded-l-md";
    if (hasTop && !hasBottom) return "rounded-b-md";
    if (!hasTop && hasBottom) return "rounded-t-md";

    return "rounded-sm";
  };

  useEffect(() => {
    activeCells.forEach((cellIndex) => {
      const element = document.getElementById(`cell-${cellIndex}`);
      if (element) {
        gsap.to(element, {
          opacity: 1,
          duration: 0.05,
          ease: "power1.out",
        });
      }
    });

    return () => {
      activeCells.forEach((cellIndex) => {
        const element = document.getElementById(`cell-${cellIndex}`);
        if (element) {
          gsap.to(element, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    };
  }, [activeCells]);

  return (
    <div className="relative w-full h-screen bg-[#0d0d0d] flex items-center justify-center overflow-hidden select-none">
      {/* BACKGROUND TYPOGRAPHY */}
      <div className="absolute flex flex-col items-center pointer-events-none z-10 text-center mix-blend-difference">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight text-white uppercase leading-none">
          CREATIVE
          <br />
          DEVELOPMENT
        </h1>
        <p className="text-neutral-400 font-mono tracking-widest text-sm mt-4">
          INTERACTIVE UI // MOTION DESIGN
        </p>
      </div>

      {/* INVISIBLE MOUSE TRACKING GRID CONTAINER */}
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 grid w-full h-full cursor-default z-20"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        <svg style={{ display: "none" }}>
          <defs>
            <filter id="filter">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4.8"
                result="blur"
              />

              <feColorMatrix
                in="blur"
                type="matrix"
                values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 19 -9
        "
                result="filter"
              />

              <feComposite in="SourceGraphic" in2="filter" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid.cols}, ${SIZE}px)`,
            gridAutoRows: `${SIZE}px`,
            gap: 0,
            // THIS IS MAGIC (SVG FILTER APPLY)
            filter: "url(#gooey)",
            transform: "perspective(900px) rotateX(8deg)",
          }}
        >
          {Array.from({ length: grid.cols * grid.rows }).map((_, i) => {
            const x = i % grid.cols;
            const y = Math.floor(i / grid.cols);
            const active = isActive(x, y);
            return (
              <div
                key={i}
                style={{
                  width: SIZE,
                  height: SIZE,
                  background: active ? "white" : "transparent",
                  borderRadius: getRadius(x, y),
                  transition: "0.2s cubic-bezier(0.22,1,0.36,1)",
                  transform: active ? "scale(1.1)" : "scale(1)",
                }}
              />
            );
          })}
        </div> */}

        {Array.from({ length: totalCells }).map((_, index) => {
          {
            /* const borderRadius = getBorderRadiusClass(index); */
          }

          return (
            // eslint-disable-next-line react/jsx-key
            <div
              style={{
                filter: "url(#filter)",
                WebkitFilter: "url(#filter)",
              }}
            >
              <div
                key={index}
                id={`cell-${index}`}
                className={`w-full h-full bg-white border-none transition-all duration-23`}
                style={{
                  opacity: 0,
                  mixBlendMode: "difference",
                  willChange: "transform, opacity",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
