import { useRef, memo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Memoized shapes — only re-render when Three.js state changes inside useFrame
const FloatingShapes = memo(() => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      // Transform-only mutations (no layout) — keep rotation slow to reduce GPU pushes
      groupRef.current.rotation.y = elapsed * 0.06;  // slightly slower = less GPU
      groupRef.current.rotation.x = elapsed * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sphere 1 — 12,12 segments (was 16,16) */}
      <Float speed={1.0} rotationIntensity={0.6} floatIntensity={0.6}>
        <Sphere args={[1, 12, 12]} position={[-4, 2, -5]} scale={1.4}>
          <MeshDistortMaterial
            color="#8c33ff"
            attach="material"
            distort={0.2}
            speed={1.0}
            transmission={0.8}
            roughness={0.25}
            thickness={1}
          />
        </Sphere>
      </Float>

      {/* Torus — 14,40 (was 16,48) */}
      <Float speed={0.7} rotationIntensity={1.2} floatIntensity={0.6}>
        <Torus args={[1.2, 0.4, 14, 40]} position={[4, -1, -3]} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.4}>
          <meshPhysicalMaterial
            color="#00f5ff"
            transmission={0.9}
            roughness={0.15}
            thickness={1}
            clearcoat={0.3}
          />
        </Torus>
      </Float>

      {/* Sphere 2 — small accent */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.6}>
        <Sphere args={[0.5, 12, 12]} position={[0, -3, -6]}>
          <MeshDistortMaterial color="#ff2a7e" attach="material" distort={0.25} speed={1.2} transmission={0.8} roughness={0.2} thickness={1} />
        </Sphere>
      </Float>

      {/* Deep background ring — minimal geometry */}
      <Float speed={0.6} rotationIntensity={1.2} floatIntensity={0.3}>
        <Torus args={[2, 0.08, 10, 36]} position={[-6, 8, -15]} rotation={[0, Math.PI / 3, 0]} scale={2}>
          <meshPhysicalMaterial color="#8c33ff" transmission={0.9} roughness={0.1} thickness={1} />
        </Torus>
      </Float>

      {/* Deep background sphere */}
      <Float speed={1.2} rotationIntensity={1.0} floatIntensity={0.6}>
        <Sphere args={[1.5, 12, 12]} position={[6, -5, -20]}>
          <MeshDistortMaterial color="#00f5ff" attach="material" distort={0.3} speed={1.0} transmission={0.8} roughness={0.2} thickness={1} />
        </Sphere>
      </Float>
    </group>
  );
});

FloatingShapes.displayName = 'FloatingShapes';

const Background3D = memo(() => {
  // Detect mobile — skip 3D canvas entirely to save GPU and prevent scroll jank
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Pause rendering when tab is hidden — massive battery + GPU saving
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (isMobile) return;
    const onVisibility = () => setIsVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [isMobile]);

  if (isMobile) {
    // Static CSS gradient — zero GPU cost
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, hsl(260 100% 65% / 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, hsl(330 100% 60% / 0.08) 0%, transparent 60%)',
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.25]}              // max 1.25× (was 1.5) — reduces raster pixels
        gl={{
          antialias: false,           // saves ~30% GPU fill rate
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.4 }}   // drop resolution if FPS < 24
        frameloop={isVisible ? 'always' : 'never'}  // pause when tab hidden
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.7} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.35} color="#00e5ff" />
        {/* Stars: 1500 → 1200 */}
        <Stars radius={100} depth={50} count={1200} factor={4} saturation={1} fade speed={0.6} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
});

Background3D.displayName = 'Background3D';

export default Background3D;
