"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function InstancedCubes({ count = 5000 }) {
  const mesh = useRef();
  const tempObject = new THREE.Object3D();
  
  // 5000 cubes-oda position-a pre-calculate pandrom
  const positions = useMemo(() => {
    return new Array(count).fill(0).map(() => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ]);
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    positions.forEach((pos, i) => {
      // Wave effect logic
      tempObject.position.set(pos[0], pos[1] + Math.sin(time + i) * 0.5, pos[2]);
      tempObject.rotation.y = Math.sin(time + i);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(i, tempObject.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#4f46e5" />
    </instancedMesh>
  );
}

export default function Scene() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <InstancedCubes />
      </Canvas>
    </div>
  );
}