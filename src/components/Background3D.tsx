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
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-4, 2, -5]} scale={1.5}>
          <MeshDistortMaterial
            color="#8c33ff"
            attach="material"
            distort={0.4}
            speed={2}
            transmission={0.9}
            roughness={0.1}
            thickness={2}
            envMapIntensity={1}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={3} floatIntensity={2}>
        <Torus args={[1.2, 0.4, 64, 100]} position={[4, -1, -3]} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.5}>
          <meshPhysicalMaterial
            color="#00f5ff"
            transmission={0.95}
            roughness={0.05}
            thickness={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1}
          />
        </Torus>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.5, 64, 64]} position={[0, -3, -6]}>
          <MeshDistortMaterial
            color="#ff2a7e"
            attach="material"
            distort={0.5}
            speed={3}
            transmission={0.9}
            roughness={0.1}
            thickness={2}
            envMapIntensity={1}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default Background3D;
