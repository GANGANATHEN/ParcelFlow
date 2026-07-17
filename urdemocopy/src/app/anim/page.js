"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MorphParticles from "./components/MorphParticles";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1} />

        <MorphParticles />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}