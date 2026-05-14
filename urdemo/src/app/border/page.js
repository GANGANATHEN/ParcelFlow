import React from "react";
import { HREF } from "../data/data";

export default function GlassToast({ status = "error", message }) {
  const statusConfig = {
    error: {
      innerGlow: "rgba(255, 10, 10, 0.7)",
      outerGlow: "bg-red-500/70 blur-sm opacity-50",
      icon: "✕",
    },
    warning: {
      innerGlow: "rgba(255, 165, 0, 0.9)",
      outerGlow: "bg-orange-500/20 blur-xl opacity-50",
      icon: "!",
    },
    success: {
      innerGlow: "rgba(10, 255, 10, 0.9)",
      outerGlow: "bg-green-500/20 blur-xl opacity-50",
      icon: "✓",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.error;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* SVG Filter */}
      <svg style={{ display: "none" }}>
        <filter id="lg-dist1" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="90"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
        colorInterpolationFilters="sRGB"
      >
        <defs>
          <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2.3"
              result="blurred_source"
            />

            <feImage
              href={HREF}
              x="0"
              y="0"
              width="579"
              height="80"
              preserveAspectRatio="none"
              result="disp_map"
            />

            <feDisplacementMap
              in="blurred_source"
              in2="disp_map"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative group w-full">
        {/* ADAPTIVE OUTER GLOW */}
        <div
          className={`absolute -inset-2 rounded-full opacity-10 blur-xl ${currentStatus.outerGlow}`}
        />

        {/* MAIN GLASS CONTAINER */}
        <div className="relative overflow-hidden rounded-[32px] p-2 border border-white/20 bg-white/5 backdrop-blur-[6px] shadow-2xl">
          {/* LAYER: RED COLOR (LAST LAYER) */}
          <div
            className="absolute inset-2 rounded-full transition-all duration-300 opacity-80"
            style={{ background: currentStatus.innerGlow }}
          />

          {/* LAYER: LIQUID EFFECT (LAST -1 / TOP OF RED LAYER) */}
          <div
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              filter: "url(#lg-dist)",
              backdropFilter: "blur(9px) saturate(1.5)",
              isolation: "isolate",
            }}
          />

          {/* CONTENT (Icon & Text) */}
          <div className="relative z-10 flex items-center gap-x-4 px-6 py-1">
            <div className="flex shrink-0 items-center justify-center rounded-full bg-white/20 p-1.5 w-10 h-10 text-white text-2xl font-light backdrop-blur-3xl border border-white/30">
              {currentStatus.icon}
            </div>

            <p className="text-white text-lg font-medium tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] truncate">
              {message || "Please agree to all the relevant terms first"}
            </p>
          </div>

          {/* BEZEL REFLECTION */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none opacity-50" />
        </div>
      </div>
    </div>
  );
}
