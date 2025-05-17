"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WindmillScroll() {
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#pin-windmill",
        scrub: 1,
        pin: true,
        start: "50% 50%",
        endTrigger: "#pin-windmill-wrap",
        end: "bottom 50%",
      },
    });

    tl.to("#pin-windmill-svg", {
      rotateZ: 900,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ height: "300vh", background: "#f0f0f0" }}>
      <div id="pin-windmill-wrap">
        <div
          id="pin-windmill"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            id="pin-windmill-svg"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "red",
              borderRadius: "10%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
