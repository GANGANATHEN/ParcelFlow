"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import "./liquid-glass.css";

const SURFACE_FNS = {
  convex_squircle: (x) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),

  convex_circle: (x) => Math.sqrt(1 - (1 - x) * (1 - x)),

  concave: (x) => 1 - Math.sqrt(1 - (1 - x) * (1 - x)),

  lip: (x) => {
    const convex = Math.pow(1 - Math.pow(1 - Math.min(x * 2, 1), 4), 0.25);

    const concave = 1 - Math.sqrt(1 - (1 - x) * (1 - x)) + 0.1;

    const t = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;

    return convex * (1 - t) + concave * t;
  },
};

export default function LiquidGlass({ status = "error" }) {
  const glassRef = useRef(null);

  const statusConfig = {
    error: {
      innerGlow: "bg-[#FF0000]",
      outerGlow: "bg-[#FF0000]/25 blur-sm opacity-50",
      icon: "✕",
      message: "Please agree to all the relevant terms and policies first",
    },

    warning: {
      innerGlow: "bg-[#FF9D00]",
      outerGlow: "bg-[#FF9D00]/25 blur-sm opacity-50",
      icon: "!",
      message: "Warning Message",
    },

    success: {
      innerGlow: "bg-[#4BC42B]",
      outerGlow: "bg-[#4BC42B]/25 blur-sm opacity-50",
      icon: "✓",
      message: "Success",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.error;

  // ADD THIS
  const [screenWidth, setScreenWidth] = useState(1440);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const DEVICE_CONFIG = {
    mobileS: {
      width: 300,
      height: 64,
      radius: 18,
      glassThickness: 50,
      bezelWidth: 18,
      shadowBlur: 10,
    },

    mobile: {
      width: 340,
      height: 68,
      radius: 22,
      glassThickness: 60,
      bezelWidth: 24,
      shadowBlur: 14,
    },

    tablet: {
      width: 460,
      height: 72,
      radius: 24,
      glassThickness: 70,
      bezelWidth: 28,
      shadowBlur: 16,
    },

    laptop: {
      width: 560,
      height: 74,
      radius: 26,
      glassThickness: 76,
      bezelWidth: 32,
      shadowBlur: 18,
    },

    desktop: {
      width: 640,
      height: 75,
      radius: 28,
      glassThickness: 80,
      bezelWidth: 35,
      shadowBlur: 20,
    },
  };

  const getDeviceConfig = () => {
    if (screenWidth <= 360) return DEVICE_CONFIG.mobileS;

    if (screenWidth <= 640) return DEVICE_CONFIG.mobile;

    if (screenWidth <= 768) return DEVICE_CONFIG.tablet;

    if (screenWidth <= 1280) return DEVICE_CONFIG.laptop;

    return DEVICE_CONFIG.desktop;
  };

  const device = getDeviceConfig();

  const CONFIG = {
    // responsive values
    width: device.width,
    height: device.height,
    radius: device.radius,

    glassThickness: device.glassThickness,
    bezelWidth: device.bezelWidth,

    shadowBlur: device.shadowBlur,

    // static values
    refractiveIndex: 3,

    scaleRatio: 0.2,

    blurAmount: 3,

    specularOpacity: 0.5,

    specularSaturation: 5,

    shadowColor: "#ffffff",

    shadowSpread: -8,

    tintColor: "#ffffff",

    tintOpacity: 1,

    surfaceFn: "convex_squircle",
  };

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
  }

  function calculateRefractionProfile(
    glassThickness,
    bezelWidth,
    heightFn,
    ior,
    samples = 128,
  ) {
    const eta = 1 / ior;

    function refract(nx, ny) {
      const dot = ny;

      const k = 1 - eta * eta * (1 - dot * dot);

      if (k < 0) return null;

      const sq = Math.sqrt(k);

      return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
    }

    const profile = new Float64Array(samples);

    for (let i = 0; i < samples; i++) {
      const x = i / samples;

      const y = heightFn(x);

      const dx = x < 1 ? 0.0001 : -0.0001;

      const y2 = heightFn(x + dx);

      const deriv = (y2 - y) / dx;

      const mag = Math.sqrt(deriv * deriv + 1);

      const ref = refract(-deriv / mag, -1 / mag);

      if (!ref) {
        profile[i] = 0;
        continue;
      }

      profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
    }

    return profile;
  }

  function generateDisplacementMap(w, h, radius, bezelWidth, profile, maxDisp) {
    const c = document.createElement("canvas");

    c.width = w;
    c.height = h;

    const ctx = c.getContext("2d");

    const img = ctx.createImageData(w, h);

    const d = img.data;

    for (let i = 0; i < d.length; i += 4) {
      d[i] = 128;
      d[i + 1] = 128;
      d[i + 2] = 0;
      d[i + 3] = 255;
    }

    const r = radius;

    const rSq = r * r;

    const r1Sq = (r + 1) ** 2;

    const rBSq = Math.max(r - bezelWidth, 0) ** 2;

    const wB = w - r * 2;

    const hB = h - r * 2;

    const S = profile.length;

    for (let y1 = 0; y1 < h; y1++) {
      for (let x1 = 0; x1 < w; x1++) {
        const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;

        const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;

        const dSq = x * x + y * y;

        if (dSq > r1Sq || dSq < rBSq) continue;

        const dist = Math.sqrt(dSq);

        const fromSide = r - dist;

        const op =
          dSq < rSq
            ? 1
            : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));

        if (op <= 0 || dist === 0) continue;

        const cos = x / dist;

        const sin = y / dist;

        const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);

        const disp = profile[bi] || 0;

        const dX = (-cos * disp) / maxDisp;

        const dY = (-sin * disp) / maxDisp;

        const idx = (y1 * w + x1) * 4;

        d[idx] = (128 + dX * 127 * op + 0.5) | 0;

        d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
      }
    }

    ctx.putImageData(img, 0, 0);

    return c.toDataURL();
  }

  function generateSpecularMap(w, h, radius, bezelWidth, angle = Math.PI / 3) {
    const c = document.createElement("canvas");

    c.width = w;
    c.height = h;

    const ctx = c.getContext("2d");

    const img = ctx.createImageData(w, h);

    const d = img.data;

    d.fill(0);

    const r = radius;

    const rSq = r * r;

    const r1Sq = (r + 1) ** 2;

    const rBSq = Math.max(r - bezelWidth, 0) ** 2;

    const wB = w - r * 2;

    const hB = h - r * 2;

    const sv = [Math.cos(angle), Math.sin(angle)];

    for (let y1 = 0; y1 < h; y1++) {
      for (let x1 = 0; x1 < w; x1++) {
        const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;

        const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;

        const dSq = x * x + y * y;

        if (dSq > r1Sq || dSq < rBSq) continue;

        const dist = Math.sqrt(dSq);

        const fromSide = r - dist;

        const op =
          dSq < rSq
            ? 1
            : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));

        if (op <= 0 || dist === 0) continue;

        const cos = x / dist;

        const sin = -y / dist;

        const dot = Math.abs(cos * sv[0] + sin * sv[1]);

        const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));

        const coeff = dot * edge;

        const col = (255 * coeff) | 0;

        const alpha = (col * coeff * op) | 0;

        const idx = (y1 * w + x1) * 4;

        d[idx] = col;
        d[idx + 1] = col;
        d[idx + 2] = col;
        d[idx + 3] = alpha;
      }
    }

    ctx.putImageData(img, 0, 0);

    return c.toDataURL();
  }

  const rebuildFilter = useCallback(() => {
    const glass = glassRef.current;

    if (!glass) return;

    const w = glass.offsetWidth;

    const h = glass.offsetHeight;

    if (w < 2 || h < 2) return;

    const heightFn = SURFACE_FNS[CONFIG.surfaceFn];

    const clampedBezel = Math.min(
      CONFIG.bezelWidth,
      CONFIG.radius - 1,
      Math.min(w, h) / 2 - 1,
    );

    const profile = calculateRefractionProfile(
      CONFIG.glassThickness,
      clampedBezel,
      heightFn,
      CONFIG.refractiveIndex,
      128,
    );

    const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;

    const dispUrl = generateDisplacementMap(
      w,
      h,
      CONFIG.radius,
      clampedBezel,
      profile,
      maxDisp,
    );

    const specUrl = generateSpecularMap(
      w,
      h,
      CONFIG.radius,
      clampedBezel * 2.5,
    );

    const scale = maxDisp * CONFIG.scaleRatio;

    const defs = document.getElementById("svg-defs");

    if (!defs) return;

    defs.innerHTML = `
    <filter id="liquid-glass-filter"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
    >
      <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="${CONFIG.blurAmount}"
        result="blurred_source"
      />

      <feImage
        href="${dispUrl}"
        x="0"
        y="0"
        width="${w}"
        height="${h}"
        result="disp_map"
      />

      <feDisplacementMap
        in="blurred_source"
        in2="disp_map"
        scale="${scale}"
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />

      <feColorMatrix
        in="displaced"
        type="saturate"
        values="${CONFIG.specularSaturation}"
        result="displaced_sat"
      />

      <feImage
        href="${specUrl}"
        x="0"
        y="0"
        width="${w}"
        height="${h}"
        result="spec_layer"
      />

      <feComposite
        in="displaced_sat"
        in2="spec_layer"
        operator="in"
        result="spec_masked"
      />

      <feComponentTransfer
        in="spec_layer"
        result="spec_faded"
      >
        <feFuncA
          type="linear"
          slope="${CONFIG.specularOpacity}"
        />
      </feComponentTransfer>

      <feBlend
        in="spec_masked"
        in2="displaced"
        mode="normal"
        result="with_sat"
      />

      <feBlend
        in="spec_faded"
        in2="with_sat"
        mode="normal"
      />
    </filter>
  `;
  }, [
    CONFIG.bezelWidth,
    CONFIG.blurAmount,
    CONFIG.glassThickness,
    CONFIG.radius,
    CONFIG.refractiveIndex,
    CONFIG.scaleRatio,
    CONFIG.specularOpacity,
    CONFIG.specularSaturation,
    CONFIG.surfaceFn,
  ]);

  useEffect(() => {
    const root = document.documentElement.style;

    root.setProperty("--glass-radius", `${CONFIG.radius}px`);

    root.setProperty("--shadow-color", CONFIG.shadowColor);

    root.setProperty("--shadow-blur", `${CONFIG.shadowBlur}px`);

    root.setProperty("--shadow-spread", `${CONFIG.shadowSpread}px`);

    root.setProperty("--tint-color", hexToRgb(CONFIG.tintColor));

    root.setProperty("--tint-opacity", (CONFIG.tintOpacity / 100).toFixed(3));

    root.setProperty("--outer-glow-color", currentStatus.outerGlow);

    rebuildFilter();
    window.addEventListener("resize", rebuildFilter);
    return () => {
      window.removeEventListener("resize", rebuildFilter);
    };
  }, [
    CONFIG.radius,
    CONFIG.shadowColor,
    CONFIG.shadowBlur,
    CONFIG.shadowSpread,
    CONFIG.tintColor,
    CONFIG.tintOpacity,
    currentStatus.outerGlow,
    rebuildFilter,
  ]);

  return (
    <section>
      <div
        ref={glassRef}
        className="glassDiv rounded-[28px] relative flex items-center px-5 xl:px-12 justify-center"
        id="glass"
        style={{
          width: CONFIG.width,
          height: CONFIG.height,
        }}
      >
        {/* OUTER GLOW */}
        <div
          className={`absolute -inset-3 rounded-[inherit] -z-10 ${currentStatus.outerGlow}`}
        />

        {/* INNER GLOW */}
        <div className="absolute inset-0 flex items-center justify-center -z-[1]">
          <div
            className={`w-[94%] h-[70%] rounded-[28px] ${currentStatus.innerGlow}`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center gap-x-4 w-full">
          <button
            className="
          flex shrink-0 items-center justify-center rounded-full bg-white/20 p-1.5 w-10 h-10 text-white text-2xl font-light backdrop-blur-3xl
        "
            style={{
              boxShadow: `
              inset 2px 3px 0px -3px rgba(255, 255, 255, 0.9),
            inset 3px 3px 0px -3px rgba(0, 0, 0, 0.2),          
            inset -2px -2px 1px -2px rgba(255, 255, 255, 0.9),   
            inset 2px 2px 1px -2px rgba(179, 179, 179, 0.6),   
            inset 0px 0px 0px 1px rgba(153, 153, 153, 0.2), 
            inset 0px 0px 22px 0px rgba(242, 242, 242, 0.1)
          `,
            }}
          >
            {/* {currentStatus.icon} */}X
          </button>

          <p className="text-white text-lg tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] truncate">
            {currentStatus.message ||
              "Please agree to all the relevant terms and policies first"}
          </p>
        </div>
      </div>

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
        <defs id="svg-defs" />
      </svg>
    </section>
  );
}
