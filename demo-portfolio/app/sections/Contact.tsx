"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#", color: "hover:text-white" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      color: "hover:text-sky-400",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Info */}
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-8 text-white opacity-0">
              LET&apos;S
              <br />
              <span className="text-gradient">BUILD</span>
            </h2>

            <p className="text-lg text-gray-400 mb-10 leading-relaxed opacity-0">
              Have a project in mind? Let&apos;s create something extraordinary
              together. I&apos;m always open to discussing new projects, creative
              ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 mb-10 opacity-0">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <span>demo@developer.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="flex gap-4 opacity-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 ${social.color} hover:border-current transition-all duration-300 hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="opacity-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full bg-white/5 border border-gray-800 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full bg-white/5 border border-gray-800 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-gray-800 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl font-bold text-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : submitted ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
