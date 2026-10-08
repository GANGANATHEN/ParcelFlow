"use client";
import { useState } from "react";

export default function MapComponent() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div>
      {/* MAIN WRAPPER */}
      <div
        className="2xl:mt-[69px] relative mt-6 md:mt-10 xl:mt-12 overflow-hidden map-section z-20 cursor-pointer group"
        onClick={() => setIsFullscreen(true)}
      >
        {/* Overlay Hover Effect */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center text-white font-semibold z-10 transition-all 3xl:rounded-[40px] rounded-[14px] md:rounded-[20px]">
          <span className="bg-black/70 px-5 py-2.5 rounded-lg text-sm backdrop-blur-sm shadow-lg transform group-hover:scale-105 transition-transform">
            Click to View Fullscreen Map
          </span>
        </div>

        {/* Normal Page View Iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.977342259324!2d80.2528158289275!3d13.05193902097606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab159f64e9%3A0xb7743db9d152516b!2sIMUII%20TECHNOLOGY%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1778840228585!5m2!1sen!2sin%22"
          width="100%"
          className="2xl:h-[400px] max-xs:h-[170px] xs:h-[180px] sm:h-[230px] lg:h-[280px] xl:h-[300px] 3xl:rounded-[40px] rounded-[14px] md:rounded-[20px] pointer-events-none"
          loading="lazy"
        ></iframe>
      </div>

      {/* full screen map */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-100 flex items-center justify-center p-4 md:p-10">
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close (X) Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl z-50 transition-colors shadow-md"
              aria-label="Close map"
            >
              ✕
            </button>

            {/* Actual Interactive Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.977342259324!2d80.2528158289275!3d13.05193902097606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab159f64e9%3A0xb7743db9d152516b!2sIMUII%20TECHNOLOGY%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1778840228585!5m2!1sen!2sin%22"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
