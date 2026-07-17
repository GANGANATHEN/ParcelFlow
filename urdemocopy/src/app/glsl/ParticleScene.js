'use client'
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Particles = () => {
  const count = 100000;
  const mesh = useRef();
  
  // Particles position and speed setup
  const [particles] = useState(() => {
  const temp = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    temp[i * 3] = (Math.random() - 0.5) * 10;
    temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
    temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return temp;
});

  // Scroll animation using GSAP
  useGSAP(() => {
    gsap.to(mesh.current.rotation, {
      y: Math.PI,
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });
  });

  // Fluid movement logic
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t / 4);
    mesh.current.rotation.y = Math.cos(t / 4);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00d2ff" transparent opacity={0.8} />
    </points>
  );
};

export default function ParticlePage() {
  return (
    <div className="scroll-container h-[300vh] w-full bg-black">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Particles />
        </Canvas>
      </div>
      
      {/* Content for Scrolling */}
      <div className="relative z-10 flex h-dvh items-center justify-center text-white">
        <h1 className="text-6xl font-bold">Scroll to Ignite</h1>
      </div>
    </div>
  );
}