"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import bg from "../../../public/image/bgg.svg";

// Register useGSAP plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const LAYER_COUNT = 4;
const DURATION = 8;
const S_MIN = 0.52;
const RATIO = 1.45;
const S_MAX = S_MIN * Math.pow(RATIO, LAYER_COUNT); // ~2.298
const PEAK_OPACITY = 0.6;

// Exponential easing function to preserve constant apparent 3D forward velocity
const exponentialEase = (p) => {
  return (Math.pow(RATIO, p * LAYER_COUNT) - 1) / (Math.pow(RATIO, LAYER_COUNT) - 1);
};

const Page = () => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const streamLayersRef = useRef([]);

  useGSAP(
    () => {
      // Respect accessibility preferences
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      // 1. Subtle, organic camera flight sway
      if (cameraRef.current) {
        gsap.to(cameraRef.current, {
          x: 8,
          y: 4,
          duration: 6.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(cameraRef.current, {
          rotation: 0.35,
          duration: 8.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 2. Continuous forward tunnel stream layers
      streamLayersRef.current.forEach((layer, i) => {
        if (!layer) return;

        const layerTl = gsap.timeline({
          repeat: -1,
        });

        // Continuous exponential scale expansion from vanishing point
        layerTl.fromTo(
          layer,
          { scale: S_MIN },
          {
            scale: S_MAX,
            duration: DURATION,
            ease: exponentialEase,
          },
          0
        );

        // Opacity envelope:
        // Emerge smoothly from horizon glow (0 -> PEAK_OPACITY over first 25% of cycle)
        layerTl.fromTo(
          layer,
          { opacity: 0 },
          {
            opacity: PEAK_OPACITY,
            duration: DURATION * 0.25,
            ease: "sine.out",
          },
          0
        );

        // Fade out smoothly before wrapping around (PEAK_OPACITY -> 0 over final 30% of cycle)
        layerTl.to(
          layer,
          {
            opacity: 0,
            duration: DURATION * 0.3,
            ease: "sine.in",
          },
          DURATION * 0.7
        );

        // Stagger layer phase offset so tunnel is continuously populated from frame 0
        layerTl.seek(i * (DURATION / LAYER_COUNT));
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-[#0c0014] select-none"
    >
      {/* Camera Flight Viewport */}
      <div
        ref={cameraRef}
        className="relative w-full h-full scale-[1.03] origin-center will-change-transform"
      >
        {/* Layer 0: Static Vanishing-Point Base Artwork */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={bg}
            alt="Cyber Tunnel Horizon"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Dynamic Forward Tunnel Stream Layers */}
        {Array.from({ length: LAYER_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              streamLayersRef.current[index] = el;
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center will-change-transform"
            style={{
              transformOrigin: "50% 50%",
              mixBlendMode: "screen",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={bg}
                alt=""
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* Ambient Vanishing Point Core Glow */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_40%_25%_at_50%_50%,rgba(240,147,233,0.18)_0%,transparent_75%)]"
          style={{ mixBlendMode: "screen" }}
        />
      </div>
    </div>
  );
};

export default Page;
