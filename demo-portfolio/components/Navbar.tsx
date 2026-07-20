"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#hero", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#work", label: "WORK" },
  { href: "#skills", label: "SKILLS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="text-2xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors"
        >
          DEMO
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={cn(
                "text-xs tracking-widest font-medium transition-all duration-300 relative group",
                activeSection === link.href.replace("#", "")
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300",
                  activeSection === link.href.replace("#", "")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                )}
              />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleClick(e, "#contact")}
          className="hidden md:block px-5 py-2 text-xs font-bold tracking-wider border border-cyan-400/50 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300"
        >
          HIRE ME
        </a>
      </div>
    </nav>
  );
}
