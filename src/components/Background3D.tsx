import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[-4, 2, -5]} scale={1.5}>
          <MeshDistortMaterial
            color="#8c33ff"
            attach="material"
            distort={0.3}
            speed={1.5}
            transmission={0.8}
            roughness={0.2}
            thickness={1}
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[1.2, 0.4, 32, 64]} position={[4, -1, -3]} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.5}>
          <meshPhysicalMaterial
            color="#00f5ff"
            transmission={0.9}
            roughness={0.1}
            thickness={1}
            clearcoat={0.5}
          />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[0, -3, -6]}>
          <MeshDistortMaterial color="#ff2a7e" attach="material" distort={0.4} speed={2} transmission={0.8} roughness={0.2} thickness={1} />
        </Sphere>
      </Float>

      {/* Deeper shapes for scrolling parallax fly-through - Optimized */}
      <Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
        <Torus args={[2, 0.1, 32, 64]} position={[-6, 8, -15]} rotation={[0, Math.PI / 3, 0]} scale={2}>
          <meshPhysicalMaterial color="#8c33ff" transmission={0.9} roughness={0.1} thickness={1} />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]} position={[6, -5, -20]}>
          <MeshDistortMaterial color="#00f5ff" attach="material" distort={0.5} speed={1.5} transmission={0.8} roughness={0.2} thickness={1} />
        </Sphere>
      </Float>
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Limits pixel ratio for performance
        gl={{ 
          antialias: false, // Performance boost
          powerPreference: "high-performance",
          alpha: true 
        }}
        performance={{ min: 0.5 }} // Adaptive performance
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default Background3D;
