"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Users, Rocket, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Delivered", color: "cyan" },
  { icon: Code2, value: "5+", label: "Years Experience", color: "purple" },
  { icon: Users, value: "30+", label: "Happy Clients", color: "pink" },
  { icon: Award, value: "15+", label: "Awards Won", color: "yellow" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-12 md:mb-16 text-cyan-400 opacity-0"
        >
          ABOUT
        </h2>

        <div ref={textRef} className="mb-16 md:mb-20">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-gray-200 mb-8">
            I craft digital experiences that live at the intersection of{" "}
            <span className="text-purple-400">design</span> and{" "}
            <span className="text-pink-400">technology</span>.
          </p>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl">
            With 5+ years of experience building scalable web applications, I
            specialize in React ecosystems, Node.js backends, and immersive 3D
            web experiences. Currently pushing pixels at the edge of what&apos;s
            possible on the web. I believe in clean code, pixel-perfect design,
            and performance that never compromises.
          </p>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group glass-card rounded-2xl p-6 md:p-8 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer hover:-translate-y-2"
            >
              <stat.icon
                className={`w-8 h-8 mb-4 text-${stat.color}-400 group-hover:scale-110 transition-transform`}
              />
              <div className="text-3xl md:text-4xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
