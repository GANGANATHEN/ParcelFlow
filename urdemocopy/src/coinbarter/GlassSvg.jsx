import React from "react";

export default function GlassSVG() {
  return (
    <svg
      width="647"
      height="283"
      viewBox="0 0 647 283"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        maskUnits="userSpaceOnUse"
        x="-30"
        y="-37"
        width="713"
        height="320"
      >
        <rect
          width="713"
          height="320"
          transform="translate(-30 -37)"
          fill="white"
        />
        <rect x="40" y="39" width="561" height="218" rx="18" fill="black" />
      </mask>

      <g mask="url(#mask0)">
        <foreignObject x="-40" y="-40" width="727" height="377">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              height: "100%",
              width: "100%",
            }}
          />
        </foreignObject>

        <g filter="url(#blurFilter)">
          <path
            d="M40 94.4C40 75.3582 40 65.8373 43.7058 58.5643C46.9655 52.1668 52.1668 46.9655 58.5643 43.7058C65.8373 40 75.3582 40 94.4 40H552.6C571.642 40 581.163 40 588.436 43.7058C594.833 46.9655 600.035 52.1668 603.294 58.5643C607 65.8373 607 75.3582 607 94.4V202.6C607 221.642 607 231.163 603.294 238.436C600.035 244.833 594.833 250.035 588.436 253.294C581.163 257 571.642 257 552.6 257H94.4C75.3582 257 65.8373 257 58.5643 253.294C52.1668 250.035 46.9655 244.833 43.7058 238.436C40 231.163 40 221.642 40 202.6V94.4Z"
            fill="black"
            fillOpacity="0.08"
            style={{ mixBlendMode: "hard-light" }}
          />
        </g>
      </g>

      <rect
        x="40"
        y="38"
        width="561"
        height="219"
        rx="18"
        fill="#0F0F0F"
        style={{ mixBlendMode: "color-dodge" }}
      />
      <rect
        x="40"
        y="38"
        width="561"
        height="219"
        rx="18"
        fill="#F5F5F5"
        fillOpacity="0.4"
      />
      <rect
        x="40"
        y="38"
        width="561"
        height="219"
        rx="18"
        fill="black"
        fillOpacity="0.01"
      />

      <defs>
        <filter
          id="blurFilter"
          x="-40"
          y="-40"
          width="727"
          height="377"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
    </svg>
  );
}
