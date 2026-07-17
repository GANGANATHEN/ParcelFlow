"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  Float,
  MeshDistortMaterial,
  Sphere,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";

// CameraPath check null
function CameraPath() {
  const scroll = useScroll();
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  // Mouse move-ah capture panna simple listener (useFrame-kku veliya)
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, 10),
    new THREE.Vector3(10, 0, 5),
    new THREE.Vector3(-10, 0, 5),
    new THREE.Vector3(0, 0, 3),
  );

  useFrame((state, delta) => {
    if (!scroll) return;

    // Scroll target position
    const p = scroll.offset;
    const point = curve.getPoint(p);

    // Target position (Scroll + Mouse sway)
    const targetX = point.x + mouse.current.x * 10.18;
    const targetY = point.y + mouse.current.y * 20.8;

    state.camera.position.lerp(
      new THREE.Vector3(targetX, targetY, point.z),
      0.1,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  const meshRef = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#00d2ff"
            distort={0.6}
            speed={2}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <DepthOfField
          focusDistance={0}
          focalLength={0.01}
          bokehScale={0.004}
          height={480}
        />
      </EffectComposer>

      <Environment preset="city" />
    </>
  );
}

export default function FuturePage() {
  return (
    <div className="h-[400vh] w-full bg-black relative">
      {/* trigger Scroll-> Canvas */}
      <div className="fixed inset-0">
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
          <ScrollControls pages={3} damping={0.2}>
            <CameraPath />
            <Scene />
          </ScrollControls>
        </Canvas>
      </div>

      <div className="absolute top-[100vh] left-10 text-white z-10">
        <h2 className="text-5xl font-bold">Cinematic Future</h2>
      </div>
    </div>
  );
}
