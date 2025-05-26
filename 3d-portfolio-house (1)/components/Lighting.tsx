"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function Lighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const ledLightsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 20
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 10
    }

    // Animate LED lights
    if (ledLightsRef.current) {
      ledLightsRef.current.children.forEach((light, i) => {
        const pointLight = light as THREE.PointLight
        pointLight.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.4
      })
    }
  })

  return (
    <>
      {/* Enhanced ambient light */}
      <ambientLight intensity={0.3} color="#f0f8ff" />

      {/* Main directional light (sun) */}
      <directionalLight
        ref={lightRef}
        position={[0, 15, 15]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        color="#ffffff"
      />

      {/* Room-specific colored lights arranged horizontally */}
      <pointLight position={[-30, 4, 0]} intensity={1.2} color="#3498db" castShadow />
      <pointLight position={[-10, 4, 0]} intensity={1.2} color="#e74c3c" castShadow />
      <pointLight position={[10, 4, 0]} intensity={1.2} color="#f39c12" castShadow />
      <pointLight position={[30, 4, 0]} intensity={1.2} color="#2ecc71" castShadow />

      {/* LED strip lights */}
      <group ref={ledLightsRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <pointLight
            key={i}
            position={[-45 + i * 5, 4.5, 0]}
            intensity={0.8}
            color={`hsl(${i * 18}, 70%, 60%)`}
            distance={12}
            decay={2}
          />
        ))}
      </group>

      {/* Accent spotlights for each room */}
      <spotLight
        position={[-30, 6, 8]}
        target-position={[-30, 0, 0]}
        intensity={1.5}
        angle={0.4}
        penumbra={0.5}
        color="#3498db"
        castShadow
      />

      <spotLight
        position={[-10, 6, 8]}
        target-position={[-10, 0, 0]}
        intensity={1.5}
        angle={0.4}
        penumbra={0.5}
        color="#e74c3c"
        castShadow
      />

      <spotLight
        position={[10, 6, 8]}
        target-position={[10, 0, 0]}
        intensity={1.5}
        angle={0.4}
        penumbra={0.5}
        color="#f39c12"
        castShadow
      />

      <spotLight
        position={[30, 6, 8]}
        target-position={[30, 0, 0]}
        intensity={1.5}
        angle={0.4}
        penumbra={0.5}
        color="#2ecc71"
        castShadow
      />

      {/* Skylights from roof for each room */}
      <rectAreaLight position={[-30, 5.2, 0]} width={8} height={8} intensity={3} color="#87ceeb" />
      <rectAreaLight position={[-10, 5.2, 0]} width={8} height={8} intensity={3} color="#ffb3ba" />
      <rectAreaLight position={[10, 5.2, 0]} width={8} height={8} intensity={3} color="#bae1ff" />
      <rectAreaLight position={[30, 5.2, 0]} width={8} height={8} intensity={3} color="#baffc9" />
    </>
  )
}
