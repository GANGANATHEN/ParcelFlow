"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlassPanelThreeJS({ width = 6, height = 3 }) {
  const mountRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // ----------------------------
    // Create Plane Geometry
    const geometry = new THREE.PlaneGeometry(width, height, 128, 128);

    // ----------------------------
    // Shader Material mimicking your CSS Glass Layers
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;

          vec3 pos = position;

          // subtle liquid distortion (like filter + backdrop blur layers)
          pos.z += sin(uv.y * 10.0 + uTime) * 0.04;
          pos.z += cos(uv.x * 8.0 + uTime * 0.8) * 0.04;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uMouse;
        varying vec2 vUv;

        void main() {
          // Base glass color
          vec3 color = vec3(1.0) * 0.08;

          // Inner reflection / shine highlight
          float shine = smoothstep(0.35, 0.0, distance(vUv, uMouse));
          color += vec3(1.0) * shine * 0.3;

          // Edge highlight mimic (like inner shadow + edge light)
          float edge = smoothstep(0.0, 0.1, min(vUv.x, vUv.y));
          color += vec3(1.0) * edge * 0.08;

          gl_FragColor = vec4(color, 0.35);
        }
      `,
      transparent: true,
    });

    const glassMesh = new THREE.Mesh(geometry, material);
    scene.add(glassMesh);

    // ----------------------------
    // Mouse Movement
    const onMouseMove = (e) => {
      material.uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      material.uniforms.uMouse.value.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ----------------------------
    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ----------------------------
    // Handle Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
    };
  }, [width, height]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full absolute inset-0 rounded-3xl overflow-hidden"
    />
  );
}
