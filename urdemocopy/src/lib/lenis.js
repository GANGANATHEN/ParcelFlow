"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    // const lenis = new Lenis({
    //   smooth: true,
    //   smoothWheel: true,
    //   smoothTouch: true,
    //   syncTouch: true,

    //   // mobile tuning
    //   touchMultiplier: 1.35,
    //   syncTouchLerp: 0.35,
    //   lerp: isTouch ? 0.1 : 0.085,
    //   duration: isTouch ? 0.6 : 1.25,

    //   wheelMultiplier: 0.95,
    //   easing: (t) => t * (2 - t),
    // });

    const lenis = new Lenis({
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,
      syncTouch: true,

      // more smooth
      lerp: isTouch ? 0.07 : 0.06, // ↓ smaller = smoother
      duration: isTouch ? 0.8 : 1.4, // ↑ higher = smoother settle

      touchMultiplier: 1.2,
      syncTouchLerp: 0.25,

      wheelMultiplier: 0.8, // slower wheel = smoother

      easing: (t) => 1 - Math.pow(1 - t, 3), // smoother easing
    });

    // GSAP ticker sync
    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger sync
    lenis.on("scroll", ScrollTrigger.update);

    // proxy (needed for scrub animations)
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.body });

    // refresh after mount
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // resize handling
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}
