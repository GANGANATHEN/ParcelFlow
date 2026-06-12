"use client";

import React, { useRef, useEffect, useState, forwardRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Environment,
  PerspectiveCamera,
  SoftShadows,
  OrbitControls,
} from "@react-three/drei";

// Preload the model outside the component to prevent reloading
useGLTF.preload("/models/onepiece/snakeman_animate.glb");

const SnakemanModel = forwardRef(({ animationName }, ref) => {

  const { scene, animations } = useGLTF(
    "/models/onepiece/snakeman_animate.glb",
  );

  const { actions } = useAnimations(animations, ref);

  //   useEffect(() => {
  //     animations.forEach((clip, index) => {
  //       console.log(`Animation ${index}: ${clip.name}`);
  //     });
  //   }, [animations]);

  useEffect(() => {
    // shadow enabled for every part of the model
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    const action = actions[animationName];
    if (action) {
      action.reset().fadeIn(0.3).play();
      const isCombo = animationName.includes("combo");
      action.setLoop(
        isCombo ? THREE.LoopOnce : THREE.LoopRepeat,
        isCombo ? 1 : Infinity,
      );
      if (animationName.includes("run")) {
        action.setEffectiveTimeScale(0.4);
      } else if (animationName.includes("jump")) {
        action.setEffectiveTimeScale(0.3);
      } else {
        action.setEffectiveTimeScale(1.0);
      }
    }
    return () => action?.fadeOut(0.3);
  }, [animationName, actions]);

  //   useEffect(() => {
  //     // Ovvoru mesh-aiyum 2 second-kku hide panni paarkka
  //     scene.traverse((child) => {
  //       if (child.isMesh) {
  //         setTimeout(() => {
  //           child.visible = false;
  //           console.log("Hidden mesh:", child.name);
  //         }, 2000);

  //         setTimeout(() => {
  //           child.visible = true;
  //         }, 4000);
  //       }
  //     });
  //   }, [scene]);

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         console.log("Mesh Found:", child.name, child);
//       }
//     });
//   }, [scene]);

  useFrame(({ clock }) => {
    const lipMesh = scene.getObjectByName("Object_9");
    if (lipMesh) {
      const time = clock.getElapsedTime();
      const blink = Math.sin(time * 3) > 0.95;
      lipMesh.visible = !blink;
    }
  });

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child.isMesh && child.morphTargetDictionary) {
//         console.log(
//           "Morph Targets found in:",
//           child.name,
//           child.morphTargetDictionary,
//         );
//       }
//     });
//   }, [scene]);

  return <primitive ref={ref} object={scene} scale={90} />;

});

// Fix for ESLint display-name error
SnakemanModel.displayName = "SnakemanModel";

export default function Page() {
  const [currentAnim, setCurrentAnim] = useState("pl_luffy_snak01_idle_a");
  const luffyRef = useRef(null);

  // Categorization
  const categories = {
    MOVEMENT: [
      "pl_luffy_snak01_idle_a",
      "pl_luffy_snak01_idlehome_a",
      "pl_luffy_snak01_run",
      "pl_luffy_snak01_jump",
      "pl_luffy_snak01_jump_lp",
      "pl_luffy_snak01_jump_end",
      "pl_luffy_snak01_dodge",
      "pl_luffy_snak01_boost",
    ],
    COMBAT: [
      "pl_luffy_snak01_combo_a",
      "pl_luffy_snak01_combo_b",
      "pl_luffy_snak01_combo_c",
      "pl_luffy_snak01_skill_a",
      "pl_luffy_snak01_skill_b",
      "pl_luffy_snak01_electric_shock",
    ],
    STATUS: [
      "pl_luffy_snak01_damage",
      "pl_luffy_snak01_slammed",
      "pl_luffy_snak01_stun",
      "pl_luffy_snak01_down",
      "pl_luffy_snak01_down_end",
      "pl_luffy_snak01_blownback_lp",
      "pl_luffy_snak01_blownback_end",
      "pl_luffy_snak01_shake",
    ],
    EVENT: [
      "pl_luffy_snak01_opening",
      "pl_luffy_snak01_flagget",
      "pl_luffy_snak01_flagget_lp",
      "pl_luffy_snak01_flagget_end",
      "pl_luffy_snak01_victory",
      "pl_luffy_snak01_victory_lp",
      "pl_luffy_snak01_lose",
      "pl_luffy_snak01_lose_lp",
    ],
  };

  const categories1 = {
    MOVEMENT: [
      "pl_luffy_thou03_idle_a",
      "pl_luffy_thou03_run",
      "pl_luffy_thou03_jump",
      "pl_luffy_thou03_jump_lp",
      "pl_luffy_thou03_jump_end",
      "pl_luffy_thou03_dodge",
    ],
    COMBAT: [
      "pl_luffy_thou03_combo_a",
      "pl_luffy_thou03_combo_b",
      "pl_luffy_thou03_combo_c",
      "pl_luffy_thou03_skill_a",
      "pl_luffy_thou03_skill_a_end",
      "pl_luffy_thou03_skill_b",
      "pl_luffy_thou03_skill_b_lp",
      "pl_luffy_thou03_skill_b_end",
      "pl_luffy_thou03_electric_shock",
    ],
    STATUS: [
      "pl_luffy_thou03_damage",
      "pl_luffy_thou03_slammed",
      "pl_luffy_thou03_stun",
      "pl_luffy_thou03_down",
      "pl_luffy_thou03_down_end",
      "pl_luffy_thou03_blownback_lp",
      "pl_luffy_thou03_blownback_end",
      "pl_luffy_thou03_shake",
    ],
    EVENT: [
      "pl_luffy_thou03_flagget",
      "pl_luffy_thou03_flagget_lp",
      "pl_luffy_thou03_flagget_end",
    ],
  };

  return (
    <div className="h-screen w-screen bg-white overflow-hidden relative">
      {/* HUD Panel - Modern & Grand */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl z-10">
        <div className="bg-black/20 backdrop-blur-[1px] border border-white/10 rounded-3xl p-6 shadow-2xl">
          {Object.entries(categories).map(([category, anims]) => (
            <div key={category} className="mb-4 last:mb-0">
              <h3 className="text-pink-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {anims.map((anim) => (
                  <button
                    key={anim}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all duration-300 border ${
                      currentAnim === anim
                        ? "bg-pink-600 border-pink-400 text-white shadow-[0_0_15px_#db2777]"
                        : "bg-white/5 border-white/5 text-black hover:bg-white/10"
                    }`}
                    onClick={() => setCurrentAnim(anim)}
                  >
                    {anim.split("_").pop()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        {/* LIGHT SETUP (Ithu dhaan Shadow-vai generate pannum) */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={3}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <ambientLight intensity={0.5} />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>

        {/* MODEL */}
        <SnakemanModel ref={luffyRef} animationName={currentAnim} />

        <Environment preset="night" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
