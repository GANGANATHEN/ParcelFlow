'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // Animate each section's content
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  const sections = [
    { id: 1, content: "🔥 Welcome Section" },
    { id: 2, content: "🚀 About Us" },
    { id: 3, content: "🎯 Our Mission" },
    { id: 4, content: "📞 Contact" },
  ];

  return (
    <div ref={containerRef}>
      {sections.map((sec, i) => (
        <section
          key={sec.id}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="min-h-screen px-6 py-20 text-white flex justify-center items-center text-4xl font-bold"
        >
          {sec.content}
        </section>
      ))}
    </div>
  );
}
