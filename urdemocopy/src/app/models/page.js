"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import gsap from "gsap";

function SnakemanModel() {
  const { scene, animations } = useGLTF(
    "/models/onepiece/snakeman_animate.glb",
  );
  console.log(animations); // Ithu console-la array of animations-a show pannum
  const modelRef = useRef();
                                              
  // Animation logic
  useFrame((state) => {                                                                                                         
    const t = state.clock.getElapsedTime();
    // Idle Breathing animation
    modelRef.current.position.y = Math.sin(t) * 0.2;
    modelRef.current.rotation.y = Math.sin(t / 4) * 0.2;
  });

  return <primitive ref={modelRef} object={scene} scale={2} />;
}

export default function Page() {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 120 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <SnakemanModel />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
