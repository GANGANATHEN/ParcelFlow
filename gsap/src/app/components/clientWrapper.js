"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClientWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
      easing: (t) => t * (2 - t), // expo-out
      lerp: 0.07,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
      // Debug current scroll value:
      // console.log(lenis.scroll.instance.scroll.y);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // ✅ ONLY this is needed
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
