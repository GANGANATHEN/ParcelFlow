"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: "Frontend",
    color: "cyan",
    skills: [
      { name: "React / Next.js", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 90, icon: "📘" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "Three.js / R3F", level: 85, icon: "🧊" },
      { name: "GSAP", level: 88, icon: "🎬" },
    ],
  },
  {
    category: "Backend",
    color: "purple",
    skills: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "PostgreSQL", level: 88, icon: "🐘" },
      { name: "GraphQL", level: 82, icon: "◈" },
      { name: "Redis", level: 80, icon: "🔴" },
    ],
  },
  {
    category: "DevOps",
    color: "pink",
    skills: [
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "AWS / GCP", level: 80, icon: "☁️" },
      { name: "CI/CD", level: 82, icon: "🔄" },
      { name: "Kubernetes", level: 75, icon: "☸️" },
      { name: "Terraform", level: 70, icon: "🏗️" },
    ],
  },
  {
    category: "Tools",
    color: "yellow",
    skills: [
      { name: "Git / GitHub", level: 92, icon: "🐙" },
      { name: "Figma", level: 85, icon: "🎭" },
      { name: "VS Code", level: 95, icon: "📝" },
      { name: "Postman", level: 88, icon: "🚀" },
      { name: "Vercel", level: 90, icon: "▲" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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
        categoriesRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate progress bars
      gsap.utils.toArray<HTMLElement>(".skill-bar").forEach((bar) => {
        const level = parseInt(bar.dataset.level || "0");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      cyan: "bg-cyan-400",
      purple: "bg-purple-400",
      pink: "bg-pink-400",
      yellow: "bg-yellow-400",
    };
    return colors[color] || "bg-gray-400";
  };

  const getBorderClass = (color: string) => {
    const colors: Record<string, string> = {
      cyan: "hover:border-cyan-400/50",
      purple: "hover:border-purple-400/50",
      pink: "hover:border-pink-400/50",
      yellow: "hover:border-yellow-400/50",
    };
    return colors[color] || "hover:border-gray-400/50";
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 min-h-screen px-6 md:px-16 lg:px-24 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-16 md:mb-20 text-pink-400 opacity-0"
        >
          SKILLS
        </h2>

        <div
          ref={categoriesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className={`glass-card rounded-3xl p-6 md:p-8 border border-gray-800 ${getBorderClass(
                cat.color
              )} transition-all duration-500 hover:-translate-y-1`}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${getColorClass(cat.color)}`}
                />
                {cat.category}
              </h3>

              <div className="space-y-5">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="text-sm text-gray-300 font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar h-full rounded-full ${getColorClass(
                          cat.color
                        )} opacity-80`}
                        data-level={skill.level}
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
