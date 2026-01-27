// components/Section1.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const anim = gsap.fromTo(
      sectionRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reset", // plays every scroll in
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-red-100 flex items-center justify-center text-4xl"
    >
      Section 2
    </section>
  );
}
