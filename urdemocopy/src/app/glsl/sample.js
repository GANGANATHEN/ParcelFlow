'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Basic3D() {
  return (
    <div className="h-dvh w-full bg-slate-900"> {/* Height set panniruken */}
      <Canvas camera={{ position: [2, 2, 5] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
        
        <OrbitControls /> {/* Ithu iruntha thaan mouse-la rotate panni pakalam */}
      </Canvas>
    </div>
  );
}