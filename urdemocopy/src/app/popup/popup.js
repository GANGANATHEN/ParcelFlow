import React from "react";
import { createPortal } from "react-dom";
import GlassSurface from "@/components/GlassSurface";

const Popup = () => {
  // Modal content ah thaniya oru variable la vachukonga
  const popupContent = (
    <div className="fixed inset-0 h-100dvh z-10">
      {/* <div className="absolute inset-0 bg-black/20 backdrop-blur-[7px]" /> */}

      <GlassSurface
        width="100vw"
        height="100dvh"
        borderRadius={0}
        borderWidth={0}
        brightness={30}
        opacity={0.93}
        blur={0}
        displace={10}
        backgroundOpacity={0}
        saturation={1.2}
        distortionScale={0}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        className="absolute border-none inset-0 brightness-120"
      ></GlassSurface>
    </div>
  );

  // Hydration errors thadukka, document define aagiruka nu check pannikalam
  if (typeof document === "undefined") return null;

  // Ithu unga popup-ah direct ah body tag-kulla render pannidum
  return createPortal(popupContent, document.body);
};

export default Popup;
