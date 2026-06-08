"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useAnimations,
  Html,
  useProgress,
} from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="text-white font-bold">
      {progress.toFixed(0)}% Loading...
    </Html>
  );
}

function ModelLoader({ animationName, setAnimNames }) {
  const modelRef = useRef();
 
  const { scene, animations } = useGLTF("/models/girls/grlmoonsword.glb");
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    // Animation name move to parent component
    console.log(animations);
    if (animations) {
      setAnimNames(animations.map((a) => a.name));
    }
  }, [animations, setAnimNames]);

  useEffect(() => {
    const action = actions[animationName];
    if (action) {
      action.reset().fadeIn(0.3).play();
      action.setLoop(THREE.LoopRepeat);
    }
    return () => action?.fadeOut(0.3);
  }, [animationName, actions]);

  return (
    <primitive ref={modelRef} object={scene} scale={2} position={[0, -3, 0]} />
  );
}

export default function Page() {
  const [currentAnim, setCurrentAnim] = useState(null);
  const [animNames, setAnimNames] = useState([]);

  return (
    <div className="h-screen w-screen bg-neutral-900">
      {/* UI Sidebar */}
      <div className="absolute top-5 right-5 z-10 w-64 h-[80vh] overflow-y-auto bg-black/40 p-4 rounded-xl text-white">
        <h2 className="text-lg font-bold mb-4">Animations</h2>
        <div className="flex flex-col gap-2">
          {animNames.map((name) => (
            <button
              key={name}
              className={`p-2 text-sm rounded ${currentAnim === name ? "bg-indigo-600" : "bg-white/10"}`}
              onClick={() => setCurrentAnim(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <Canvas camera={{ position: [0, 1.5, 4], fov: 105 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={<Loader />}>
          <ModelLoader
            animationName={currentAnim}
            setAnimNames={setAnimNames}
          />
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
