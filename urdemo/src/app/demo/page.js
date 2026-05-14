"use client";

import { useEffect, useMemo } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  heartShape,
  impellerShape,
  shieldShape,
  squareShape,
  starShape,
  circleSlices,
  radii,
} from "../draw1/components/pathData";


gsap.registerPlugin(MorphSVGPlugin);

// -----------------------------------------
// bake path near target zone (NOT at far corners)
// -----------------------------------------
function offsetPath(path, dx, dy, scale = 1) {
  let count = 0;

  return path.replace(/-?\d*\.?\d+/g, (num) => {
    const n = parseFloat(num);
    const isX = count % 2 === 0;
    count++;
    return (n * scale + (isX ? dx : dy)).toFixed(2);
  });
}

export default function Home() {
  // keep source raw centers close to final triangle slices
  const starPlaced = useMemo(() => offsetPath(starShape, 88, 18, 1), []);
  const shieldPlaced = useMemo(() => offsetPath(starShape, 76, 44, 1), []);
  const squarePlaced = useMemo(() => offsetPath(squareShape, 58, 98, 1), []);

  const icons = [
    {
      shapeId: "shape1",
      shape: starPlaced,
      targetId: "slice1",
    },
    {
      shapeId: "shape2",
      shape: shieldPlaced,
      targetId: "slice2",
    },
    {
      shapeId: "shape3",
      shape: squarePlaced,
      targetId: "slice3",
    },
  ];

  useEffect(() => {
    // -----------------------------------------
    // visually scatter them outward before morph
    // -----------------------------------------
    gsap.set("#shape1", { x: -78, y: -55, rotate: -35 });
    gsap.set("#shape2", { x: 82, y: -52, rotate: 28 });
    gsap.set("#shape3", { x: -82, y: 72, rotate: -18 });

    const tl = gsap.timeline({ delay: 0.4 });

    tl.to(
      "#shape1",
      {
        duration: 1.9,
        x: 0,
        y: 0,
        rotate: 0,
        morphSVG: { shape: "#slice2", shapeIndex: -2 },
        fill: "#D3ED05",
        ease: "power3.inOut",
      },
      0,
    )
      .to(
        "#shape2",
        {
          duration: 1.9,
          x: 0,
          y: 0,
          rotate: 0,
          morphSVG: { shape: "#slice3", shapeIndex: -4 },
          fill: "#D3ED05",
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        "#shape3",
        {
          duration: 1.9,
          x: 0,
          y: 0,
          rotate: 0,
          morphSVG: { shape: "#slice1", shapeIndex: -6 },
          fill: "#D3ED05",
          ease: "power3.inOut",
        },
        0,
      );
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div
        id="iconCircleMerge"
        className="absolute top-0 left-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 200 200"
          width="120"
          height="120"
          style={{ overflow: "visible" }}
        >
          {/* -------- SOURCE SHAPES + BLAST -------- */}
          {icons.map((item, index) => (
            <g key={item.shapeId} id={`group${index + 1}`}>
              <path id={item.shapeId} d={item.shape} fill="#F0E49A" />

              {/* blast particles retain */}
              <g className="blast" id={`blast${index + 1}`}>
                {radii.map((r, i) => (
                  <circle
                    key={i}
                    className="piece"
                    cx="100"
                    cy="100"
                    r={r}
                    fill="#F0E49A"
                  />
                ))}
              </g>
            </g>
          ))}

          {/* -------- HIDDEN CIRCLE TARGETS -------- */}
          {circleSlices.map((slice) => (
            <path
              key={slice.id}
              id={slice.id}
              d={slice.d}
              visibility="hidden"
            />
          ))}

          {/* defs if needed */}
          <defs>
            <linearGradient id="squareGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff00cc" />
              <stop offset="50%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
