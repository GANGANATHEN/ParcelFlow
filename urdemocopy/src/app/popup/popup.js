import React from "react";
import GlassSurface from "@/components/GlassSurface";

const Popup = () => {
  return (
    <div>
      {/* <div
        className="relative h-screen overflow-hidden bg-black/20 backdrop-blur-md 
      z-100 border border-white/20"
      
      ></div> */}

      {/* <GlassSurface /> */}
      <div className="fixed inset-0 h-screen z-100 ">
        {/* blur */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[7px]" />

        <GlassSurface
          width="100vw"
          height="100vh"
          borderRadius={0}
          borderWidth={0.02}
          brightness={30}
          opacity={0.93}
          blur={0}
          displace={10}
          backgroundOpacity={0}
          saturation={1.2}
          distortionScale={50}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          className="absolute inset-0 brightness-100"
        >
          {/* content */}
          <div className="flex h-full w-full items-center justify-center">
            <h2 className="text-5xl text-white"></h2>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};

export default Popup;
