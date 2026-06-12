"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useAnimations,
  Html,
  useProgress,
  Stars,
  Float,
} from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="text-white font-light text-xl tracking-[0.5em]">
      {progress.toFixed(0)}%
    </Html>
  );
}

function ModelLoader({ animationName, setAnimNames }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF("/models/girls/grlmoonsword.glb");
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (animations) setAnimNames(animations.map((a) => a.name));
  }, [animations, setAnimNames]);

  useEffect(() => {
    const action = actions[animationName];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
    return () => action?.fadeOut(0.5);
  }, [animationName, actions]);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={2}
        position={[0, -2.5, 0]}
      />
    </Float>
  );
}

export default function Page() {
  const [currentAnim, setCurrentAnim] = useState(null);
  const [animNames, setAnimNames] = useState([]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />

      {/* Grand Header */}
      <div className="absolute top-10 text-center z-10 pointer-events-none">
        <h1 className="text-5xl font-black text-white uppercase tracking-[0.3em]">
          Celestial
        </h1>
        <p className="text-pink-500/50 tracking-[0.5em] text-xs mt-2">
          MOON SWORD ARCHIVE
        </p>
      </div>

      {/* Bottom Floating UI Panel */}
      <div className="absolute bottom-10 z-10 w-[80vw] max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex gap-4 overflow-x-auto scrollbar-hide">
        {animNames.map((name) => (
          <button
            key={name}
            className={`px-6 py-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${
              currentAnim === name
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                : "bg-white/5 text-white/40 border border-white/5 hover:bg-white/10"
            }`}
            onClick={() => setCurrentAnim(name)}
          >
            {name.split("|").pop()}
          </button>
        ))}
      </div>

      {/* Main Scene */}
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
        <ambientLight intensity={0.9} />
        <spotLight position={[0, 10, 5]} intensity={1.5} color="#c084fc" />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Suspense fallback={<Loader />}>
          <ModelLoader
            animationName={currentAnim}
            setAnimNames={setAnimNames}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
