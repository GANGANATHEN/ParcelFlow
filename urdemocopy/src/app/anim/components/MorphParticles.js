"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 5000;

export default function MorphParticles() {
  const points = useRef();

  // Sphere
  const sphere = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 80, 80);

    return geo.attributes.position.array;
  }, []);

  // Cube
  const cube = useMemo(() => {
    const geo = new THREE.BoxGeometry(3, 3, 3, 18, 18, 18);

    return geo.attributes.position.array;
  }, []);

  // Equal Count
  const spherePositions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT * 3; i++) {
      arr[i] = sphere[i % sphere.length];
    }

    return arr;
  }, [sphere]);

  const cubePositions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT * 3; i++) {
      arr[i] = cube[i % cube.length];
    }

    return arr;
  }, [cube]);

  const current = useMemo(
    () => new Float32Array(spherePositions),
    [spherePositions]
  );

  useFrame(({ clock }) => {
    const t = (Math.sin(clock.elapsedTime) + 1) / 2;

    for (let i = 0; i < current.length; i++) {
      current[i] = THREE.MathUtils.lerp(
        spherePositions[i],
        cubePositions[i],
        t
      );
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={current}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#00d2ff"
        size={0.035}
        sizeAttenuation
      />
    </points>
  );
}