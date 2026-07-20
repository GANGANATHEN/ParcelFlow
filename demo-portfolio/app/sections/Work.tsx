"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with real-time inventory, Stripe payments, and admin dashboard.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
    color: "from-purple-500/20 to-purple-900/20",
    borderColor: "hover:border-purple-400",
    icon: "🛒",
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time data visualization platform with WebSocket updates and interactive charts.",
    tags: ["React", "D3.js", "WebSocket", "Node.js"],
    color: "from-cyan-500/20 to-cyan-900/20",
    borderColor: "hover:border-cyan-400",
    icon: "📊",
    github: "#",
    live: "#",
  },
  {
    title: "3D Game Portal",
    description:
      "Browser-based 3D gaming platform with multiplayer support and real-time physics.",
    tags: ["Three.js", "WebGL", "Socket.io", "Cannon.js"],
    color: "from-pink-500/20 to-pink-900/20",
    borderColor: "hover:border-pink-400",
    icon: "🎮",
    github: "#",
    live: "#",
  },
  {
    title: "AI Chat Interface",
    description:
      "Intelligent conversational UI with streaming responses and context-aware interactions.",
    tags: ["OpenAI", "FastAPI", "Redis", "React"],
    color: "from-yellow-500/20 to-yellow-900/20",
    borderColor: "hover:border-yellow-400",
    icon: "🤖",
    github: "#",
    live: "#",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        cardsRef.current?.children || [],
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 min-h-screen px-6 md:px-16 lg:px-24 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-16 md:mb-20 text-purple-400 opacity-0"
        >
          WORK
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 perspective-1000"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-3xl border border-gray-800 ${project.borderColor} transition-all duration-500 cursor-pointer preserve-3d hover:-translate-y-2`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative p-8 md:p-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-5xl">{project.icon}</span>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-5 h-5 text-gray-400" />
                    </a>
                    <a
                      href={project.live}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-400 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-colors">
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
