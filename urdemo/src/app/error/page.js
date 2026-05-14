"use client";

import { useEffect, useRef, useState } from "react";
import "./liquid-glass.css";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
];

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

export default function LiquidGlass({ status = "error", message }) {
  const glassRef = useRef(null);

  const [panelOpen, setPanelOpen] = useState(false);

  const statusConfig = {
    error: {
      innerGlow: "bg-[#FF0000]",
      outerGlow: "bg-red-500/20 blur-sm opacity-50",
      icon: "✕",
    },

    warning: {
      innerGlow: "bg-[#FF9D00]",
      outerGlow: "bg-orange-500/20 blur-sm opacity-50",
      icon: "!",
    },

    success: {
      innerGlow: "bg-[#4BC42B]",
      outerGlow: "bg-green-500/25 blur-sm opacity-50",
      icon: "✓",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.error;

  const [bgUrl, setBgUrl] = useState(BG_IMAGES[0]);

  const [glassWidth, setGlassWidth] = useState(640);
  const [glassHeight, setGlassHeight] = useState(75);
  const [borderRadius, setBorderRadius] = useState(28);

  const [glassThickness, setGlassThickness] = useState(80);
  const [bezelWidth, setBezelWidth] = useState(35); //60-36-35
  const [refractiveIndex, setRefractiveIndex] = useState(3.0);
  const [scaleRatio, setScaleRatio] = useState(0.2); //1.0-0.6-0.2

  const [blurAmount, setBlurAmount] = useState(3); //0.3
  const [specularOpacity, setSpecularOpacity] = useState(0.5);
  const [specularSaturation, setSpecularSaturation] = useState(5); //4

  const [shadowColor, setShadowColor] = useState("#ffffff");
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowSpread, setShadowSpread] = useState(-8); // -5

  const [tintColor, setTintColor] = useState("#ffffff");
  const [tintOpacity, setTintOpacity] = useState(1); //6

  const [surfaceFn, setSurfaceFn] = useState("convex_squircle");

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

  function rebuildFilter() {
    const glass = glassRef.current;

    if (!glass) return;

    const w = glass.offsetWidth;

    const h = glass.offsetHeight;

    if (w < 2 || h < 2) return;

    const heightFn = SURFACE_FNS[surfaceFn];

    const clampedBezel = Math.min(
      bezelWidth,
      borderRadius - 1,
      Math.min(w, h) / 2 - 1,
    );

    const profile = calculateRefractionProfile(
      glassThickness,
      clampedBezel,
      heightFn,
      refractiveIndex,
      128,
    );

    const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;

    const dispUrl = generateDisplacementMap(
      w,
      h,
      borderRadius,
      clampedBezel,
      profile,
      maxDisp,
    );

    const specUrl = generateSpecularMap(w, h, borderRadius, clampedBezel * 2.5);

    const scale = maxDisp * scaleRatio;

    const defs = document.getElementById("svg-defs");

    if (!defs) return;

    defs.innerHTML = `
      <filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmount}" result="blurred_source" />
        <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp_map" />
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
          values="${specularSaturation}" 
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
            slope="${specularOpacity}" 
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
  }

  useEffect(() => {
    const root = document.documentElement.style;

    root.setProperty("--glass-radius", `${borderRadius}px`);

    root.setProperty("--shadow-color", shadowColor);

    root.setProperty("--shadow-blur", `${shadowBlur}px`);

    root.setProperty("--shadow-spread", `${shadowSpread}px`);

    root.setProperty("--tint-color", hexToRgb(tintColor));

    root.setProperty("--tint-opacity", (tintOpacity / 100).toFixed(3));

    root.setProperty("--outer-glow-color", currentStatus.outerGlow);

    rebuildFilter();
  }, [
    glassWidth,
    glassHeight,
    borderRadius,
    glassThickness,
    bezelWidth,
    refractiveIndex,
    scaleRatio,
    blurAmount,
    specularOpacity,
    specularSaturation,
    shadowColor,
    shadowBlur,
    shadowSpread,
    tintColor,
    tintOpacity,
    surfaceFn,
    currentStatus.innerGlow,
  ]);

  useEffect(() => {
    const glass = glassRef.current;

    if (!glass) return;

    glass.style.left = window.innerWidth / 2 - 150 + "px";

    glass.style.top = window.innerHeight / 2 - 100 + "px";

    let sx = 0;
    let sy = 0;

    function onMove(e) {
      e.preventDefault();

      glass.style.left = glass.offsetLeft + e.clientX - sx + "px";

      glass.style.top = glass.offsetTop + e.clientY - sy + "px";

      sx = e.clientX;
      sy = e.clientY;
    }

    function onDown(e) {
      e.preventDefault();

      sx = e.clientX;
      sy = e.clientY;

      document.addEventListener("pointermove", onMove);

      document.addEventListener(
        "pointerup",
        () => {
          document.removeEventListener("pointermove", onMove);
        },
        { once: true },
      );
    }

    glass.addEventListener("pointerdown", onDown);

    return () => {
      glass.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <>
      <div
        id="bg"
        style={{
          background: `url('${bgUrl}') center/cover no-repeat`,
        }}
      />

      <button
        className={`panel-toggle ${panelOpen ? "hidden" : ""}`}
        id="panel-toggle"
        aria-label="Toggle controls"
        onClick={() => setPanelOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      </button>

      <div id="controls" className={panelOpen ? "open" : ""}>
        <div className="controls-header">
          <span className="controls-title">Controls</span>

          <button
            className="close-btn"
            id="panel-close"
            aria-label="Close"
            onClick={() => setPanelOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />

              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <div className="controls-scroll">
          <h2>Glass Shape</h2>

          <Range
            label="Width"
            min={200}
            max={700}
            value={glassWidth}
            setValue={setGlassWidth}
          />

          <Range
            label="Height"
            min={20}
            max={1800}
            value={glassHeight}
            setValue={setGlassHeight}
          />

          <Range
            label="Border Radius"
            min={20}
            max={100}
            value={borderRadius}
            setValue={setBorderRadius}
          />

          <label style={{ display: "none" }}>
            Shape:
            <select
              value={surfaceFn}
              onChange={(e) => setSurfaceFn(e.target.value)}
            >
              <option value="convex_squircle">Convex Squircle</option>

              <option value="lip">Lip</option>

              <option value="convex_circle">Convex Circle</option>

              <option value="concave">Concave</option>
            </select>
          </label>

          <h2>Refraction</h2>

          <Range
            label="Glass Thickness"
            min={10}
            max={200}
            value={glassThickness}
            setValue={setGlassThickness}
          />

          <Range
            label="Bezel Width"
            min={2}
            max={60}
            value={bezelWidth}
            setValue={setBezelWidth}
          />

          <Range
            label="Refractive Index"
            min={1}
            max={3}
            step={0.05}
            value={refractiveIndex}
            setValue={setRefractiveIndex}
          />

          <Range
            label="Scale Ratio"
            min={0}
            max={2}
            step={0.05}
            value={scaleRatio}
            setValue={setScaleRatio}
          />

          <h2>Appearance</h2>

          <Range
            label="Blur"
            min={0}
            max={8}
            step={0.1}
            value={blurAmount}
            setValue={setBlurAmount}
          />

          <Range
            label="Specular Opacity"
            min={0}
            max={1}
            step={0.05}
            value={specularOpacity}
            setValue={setSpecularOpacity}
          />

          <Range
            label="Specular Saturation"
            min={0}
            max={12}
            step={1}
            value={specularSaturation}
            setValue={setSpecularSaturation}
          />

          <h2>Inner Shadow</h2>

          <ColorPicker
            label="Color"
            value={shadowColor}
            setValue={setShadowColor}
          />

          <Range
            label="Blur"
            min={0}
            max={40}
            value={shadowBlur}
            setValue={setShadowBlur}
          />

          <Range
            label="Spread"
            min={-15}
            max={10}
            value={shadowSpread}
            setValue={setShadowSpread}
          />

          <h2>Glass Tint</h2>

          <ColorPicker
            label="Tint Color"
            value={tintColor}
            setValue={setTintColor}
          />

          <Range
            label="Tint Opacity"
            min={0}
            max={40}
            step={1}
            value={tintOpacity}
            setValue={setTintOpacity}
            suffix="%"
          />

          <h2>Background</h2>

          <div className="bg-thumbs">
            {BG_IMAGES.map((img) => (
              <img
                key={img}
                src={img}
                alt=""
                className={`bg-thumb ${bgUrl === img ? "active" : ""}`}
                onClick={() => setBgUrl(img)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={glassRef}
        className="glassDiv relative overflow-visible flex items-center px-12 justify-center"
        id="glass"
        style={{
          width: glassWidth,
          height: glassHeight,
        }}
      >
        {/* OUTER GLOW */}
        <div
          className={`absolute -inset-3 rounded-[inherit] -z-10 ${currentStatus.outerGlow}`}
        />

        {/* INNER GLOW */}
        <div className="absolute inset-0 flex items-center justify-center -z-[1]">
          <div
            className={`w-[600px] h-[50px] rounded-[38px] ${currentStatus.innerGlow}`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center gap-x-4 w-full">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-white/20 p-1.5 w-10 h-10 text-white text-2xl font-light backdrop-blur-3xl border border-white/30">
            {currentStatus.icon}
          </div>

          <p className="text-white text-lg tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] truncate">
            {message ||
              "Please agree to all the relevant terms and policies first"}
          </p>
        </div>
      </div>

      <div className="bottom-bar">
        <span className="bottom-note">
          ⚠ SVG backdrop-filter is Chrome / Chromium only
        </span>

        <a className="switch-btn" href="#">
          Switch to WebGL →
        </a>
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
    </>
  );
}

function Range({ label, value, setValue, min, max, step = 1, suffix = "" }) {
  return (
    <label>
      {label}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />

      <span className="value-display">
        {value}
        {suffix}
      </span>
    </label>
  );
}

function ColorPicker({ label, value, setValue }) {
  return (
    <label>
      {label}

      <input
        type="color"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
