"use client";

import { Suspense, lazy } from "react";
import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";

const Canvas3D = lazy(() => import("@/components/Canvas3D"));
const Hero = lazy(() => import("./sections/Hero"));
const About = lazy(() => import("./sections/About"));
const Work = lazy(() => import("./sections/Work"));
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

function LoadingFallback() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Suspense fallback={null}>
        <Canvas3D />
      </Suspense>
      <FloatingParticles />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}
