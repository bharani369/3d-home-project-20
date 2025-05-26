"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image, Sphere, Plane } from "@react-three/drei"
import type * as THREE from "three"

interface AboutRoomProps {
  position: [number, number, number]
}

export function AboutRoom({ position }: AboutRoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Enhanced Room walls with realistic glow */}
      <EnhancedWalls />

      {/* Realistic Neon LED Lighting */}
      <RealisticNeonLEDLights />

      {/* Profile picture on back wall with glow frame */}
      <ProfileWithGlow position={[0, 3, -10]} />

      {/* Main title */}
      <Text position={[0, 4.5, -9.8]} fontSize={0.6} color="#2c3e50" anchorX="center" anchorY="middle">
        Hi, I'm Bharanidharan P
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 1.8, -9.8]}
        fontSize={0.35}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={12}
        textAlign="center"
        font="/fonts/Geist-Bold.ttf"
      >
        Aspiring Full Stack Developer
      </Text>

      {/* About description */}
      <Text
        position={[0, 1, -9.8]}
        fontSize={0.25}
        color="#34495e"
        anchorX="center"
        anchorY="middle"
        maxWidth={14}
        textAlign="center"
      >
        I'm passionate about building innovative solutions and currently focusing on developing my skills as a Full
        Stack Developer.
      </Text>

      {/* Enhanced sections with glow */}
      <EnhancedObjectiveSection position={[-7, 2.5, 0]} />
      <EnhancedTechnicalSkillsSection position={[7, 2.5, 0]} />
      <EnhancedSoftSkillsSection position={[0, 0.5, 8]} />

      {/* 3D Laptop Setup in corner with glow */}
      <EnhancedLaptopSetup position={[7, 0.5, 8]} />

      {/* Tech stack display with glow frame */}
      <TechStackWithGlow position={[8.5, 2.5, -5]} />

      {/* Interactive glowing elements */}
      <GlowingSphere
        args={[0.4]}
        position={[-6, 1.5, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        hovered={hovered}
      />

      {/* Enhanced floating particles */}
      <EnhancedFloatingParticles />
    </group>
  )
}

function ProfileWithGlow({ position }: { position: [number, number, number] }) {
  const frameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (frameRef.current) {
      const material = frameRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position}>
      {/* Glowing frame around profile */}
      <Plane ref={frameRef} args={[4.4, 4.4]} position={[0, 0, -0.01]}>
        <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={0.3} transparent opacity={0.4} />
      </Plane>
      <Image url="/images/profile.png" position={[0, 0, 0]} scale={[4, 4, 1]} transparent />
    </group>
  )
}

function TechStackWithGlow({ position }: { position: [number, number, number] }) {
  const frameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (frameRef.current) {
      const material = frameRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
    }
  })

  return (
    <group position={position}>
      {/* Glowing frame */}
      <Plane ref={frameRef} args={[3.4, 3.4]} position={[0, 0, -0.01]}>
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.2} transparent opacity={0.3} />
      </Plane>
      <Image url="/images/tech-stack.png" position={[0, 0, 0]} scale={[3, 3, 1]} transparent />
    </group>
  )
}

function GlowingSphere({
  args,
  position,
  onPointerEnter,
  onPointerLeave,
  hovered,
}: {
  args: [number]
  position: [number, number, number]
  onPointerEnter: () => void
  onPointerLeave: () => void
  hovered: boolean
}) {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      const material = sphereRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = hovered ? 0.8 : 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <Sphere
      ref={sphereRef}
      args={args}
      position={position}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <meshStandardMaterial
        color={hovered ? "#3498db" : "#e74c3c"}
        emissive={hovered ? "#1a5490" : "#8b0000"}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

function EnhancedWalls() {
  const wallRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (wallRef.current) {
      wallRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        if (mesh.material && "emissiveIntensity" in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.1
        }
      })
    }
  })

  return (
    <group ref={wallRef}>
      {/* Main room structure with subtle glow */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#f8f9fa" transparent opacity={0.1} emissive="#ffffff" emissiveIntensity={0.05} />
      </Box>

      {/* Enhanced decorative wall panels */}
      <Box args={[1, 3, 0.1]} position={[-8.5, 2, -10]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#3498db"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>

      <Box args={[1, 3, 0.1]} position={[8.5, 2, -10]}>
        <meshStandardMaterial
          color="#e74c3c"
          emissive="#e74c3c"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>

      {/* Geometric wall art with glow */}
      <EnhancedGeometricWallArt position={[-8, 3, -5]} />
      <EnhancedGeometricWallArt position={[8, 3, -5]} />

      {/* Circuit patterns with realistic glow */}
      <RealisticCircuitPattern position={[0, 2, -10.8]} rotation={[0, 0, 0]} />
      <RealisticCircuitPattern position={[0, 2, 10.8]} rotation={[0, Math.PI, 0]} />
    </group>
  )
}

function EnhancedGeometricWallArt({ position }: { position: [number, number, number] }) {
  const artRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (artRef.current) {
      artRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        if (mesh.material && "emissiveIntensity" in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + i * 0.3) * 0.2
        }
      })
    }
  })

  return (
    <group ref={artRef} position={position}>
      {Array.from({ length: 3 }).map((_, i) =>
        Array.from({ length: 2 }).map((_, j) => (
          <Box
            key={`${i}-${j}`}
            args={[0.3, 0.3, 0.05]}
            position={[i * 0.4 - 0.4, j * 0.4 - 0.2, 0]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <meshStandardMaterial
              color={`hsl(${(i + j) * 60}, 70%, 60%)`}
              emissive={`hsl(${(i + j) * 60}, 70%, 30%)`}
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        )),
      )}
    </group>
  )
}

function RealisticCircuitPattern({
  position,
  rotation,
}: { position: [number, number, number]; rotation: [number, number, number] }) {
  const circuitRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (circuitRef.current) {
      circuitRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        if (mesh.material && "emissiveIntensity" in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 3 + i * 0.2) * 0.3
        }
      })
    }
  })

  return (
    <group ref={circuitRef} position={position} rotation={rotation}>
      {/* Circuit lines with realistic glow */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Box key={i} args={[0.05, 2, 0.01]} position={[i * 1.5 - 7.5, 0, 0]}>
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} transparent opacity={0.9} />
        </Box>
      ))}

      {/* Pulsing circuit nodes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere key={i} args={[0.05]} position={[(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 3, 0]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff0000" emissiveIntensity={1.0} transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  )
}

function RealisticNeonLEDLights() {
  const neonRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (neonRef.current) {
      neonRef.current.children.forEach((light, i) => {
        const pointLight = light as THREE.PointLight
        pointLight.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.6
      })
    }
  })

  return (
    <group ref={neonRef}>
      {/* Enhanced neon strip lights */}
      {Array.from({ length: 20 }).map((_, i) => (
        <pointLight
          key={`neon-${i}`}
          position={[-8 + i * 0.8, 4, -10]}
          intensity={1.2}
          color={`hsl(${i * 18}, 100%, 50%)`}
          distance={4}
          decay={2}
        />
      ))}

      {/* Realistic ambient lighting */}
      <pointLight position={[0, 4, 0]} intensity={1.8} color="#ffffff" distance={20} decay={1} />

      {/* Corner accent lights with realistic intensity */}
      <pointLight position={[-8, 3, -10]} intensity={2.5} color="#ff0080" distance={6} decay={1.5} />
      <pointLight position={[8, 3, -10]} intensity={2.5} color="#00ff80" distance={6} decay={1.5} />
      <pointLight position={[-8, 3, 10]} intensity={2.5} color="#8000ff" distance={6} decay={1.5} />
      <pointLight position={[8, 3, 10]} intensity={2.5} color="#ff8000" distance={6} decay={1.5} />
    </group>
  )
}

function EnhancedObjectiveSection({ position }: { position: [number, number, number] }) {
  const sectionRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sectionRef.current) {
      const material = sectionRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <group position={position}>
      <Plane ref={sectionRef} args={[6, 4]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#1a5490"
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
        />
      </Plane>

      <Text position={[0, 1.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Objective
      </Text>

      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        To secure a challenging and rewarding role as a Full Stack Developer in a reputable organization, where I can
        apply my skills and knowledge to contribute to the growth and success of the company.
      </Text>
    </group>
  )
}

function EnhancedTechnicalSkillsSection({ position }: { position: [number, number, number] }) {
  const sectionRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sectionRef.current) {
      const material = sectionRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.8) * 0.1
    }
  })

  return (
    <group position={position}>
      <Plane ref={sectionRef} args={[6, 4]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#e74c3c"
          emissive="#8b0000"
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
        />
      </Plane>

      <Text position={[0, 1.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Technical Skills
      </Text>

      <Text
        position={[0, 0.8, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Programming Languages: Python, JavaScript
      </Text>

      <Text
        position={[0, 0.3, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Frontend: HTML, CSS, JavaScript, React JS
      </Text>

      <Text
        position={[0, -0.2, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Backend: Node.js, Express.js
      </Text>

      <Text
        position={[0, -0.7, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Database: MongoDB
      </Text>
    </group>
  )
}

function EnhancedSoftSkillsSection({ position }: { position: [number, number, number] }) {
  const sectionRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sectionRef.current) {
      const material = sectionRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2.2) * 0.1
    }
  })

  return (
    <group position={position}>
      <Plane ref={sectionRef} args={[12, 2]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#2ecc71"
          emissive="#006400"
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
        />
      </Plane>

      <Text position={[0, 0.6, 0]} fontSize={0.35} color="#ffffff" anchorX="center" anchorY="middle">
        Soft Skills
      </Text>

      <Text
        position={[0, -0.2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={11}
        textAlign="center"
      >
        Strong problem-solving skills • Effective communication and teamwork • Adaptability and willingness to learn •
        Time management and organization
      </Text>
    </group>
  )
}

function EnhancedFloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01
        particle.rotation.z += 0.01
        const mesh = particle as THREE.Mesh
        if (mesh.material && "emissiveIntensity" in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.1, 0.1]}
          position={[(Math.random() - 0.5) * 16, Math.random() * 4, (Math.random() - 0.5) * 20]}
        >
          <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={0.6} transparent opacity={0.8} />
        </Box>
      ))}
    </group>
  )
}

function EnhancedLaptopSetup({ position }: { position: [number, number, number] }) {
  const laptopRef = useRef<THREE.Group>(null)
  const mouseRef = useRef<THREE.Group>(null)
  const keyboardRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (mouseRef.current) {
      mouseRef.current.position.y = position[1] + 0.25 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
    if (keyboardRef.current) {
      keyboardRef.current.position.y = position[1] + 0.15 + Math.sin(state.clock.elapsedTime * 1.5 + 1) * 0.03
    }
  })

  return (
    <group position={position}>
      {/* Desk surface with glow */}
      <Box args={[4, 0.2, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#8b4513"
          emissive="#2a1408"
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.1}
        />
      </Box>

      {/* Enhanced Laptop with screen glow */}
      <group ref={laptopRef} position={[0, 0.5, -0.5]}>
        {/* Laptop base */}
        <Box args={[2, 0.15, 1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#2c3e50"
            emissive="#0a0f14"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.8}
          />
        </Box>

        {/* Laptop screen with enhanced glow */}
        <Box args={[2, 1.5, 0.1]} position={[0, 1, -0.7]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#000033"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </Box>

        {/* Screen display with realistic glow */}
        <Box args={[1.8, 1.3, 0.05]} position={[0, 1, -0.65]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#000000" emissive="#003366" emissiveIntensity={0.5} transparent opacity={0.9} />
        </Box>

        {/* Code on screen */}
        <Text
          position={[0, 1, -0.6]}
          rotation={[-0.2, 0, 0]}
          fontSize={0.08}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          textAlign="left"
        >
          {`function developer() {
  return "Full Stack";
}`}
        </Text>
      </group>

      {/* Enhanced Wireless Mouse */}
      <group ref={mouseRef} position={[1.2, 0.25, 0.3]}>
        <Box args={[0.5, 0.2, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#34495e"
            emissive="#0a0f14"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.7}
          />
        </Box>

        {/* Mouse LED indicator */}
        <Sphere args={[0.02]} position={[0, 0.12, 0.3]}>
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
        </Sphere>
      </group>

      {/* Enhanced Compact Keyboard */}
      <group ref={keyboardRef} position={[-0.8, 0.15, 0.8]}>
        <Box args={[2.5, 0.2, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#2c3e50"
            emissive="#0a0f14"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.6}
          />
        </Box>

        {/* Keyboard keys with RGB glow */}
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <Box key={`${row}-${col}`} args={[0.15, 0.1, 0.15]} position={[-1 + row * 0.2, 0.15, -0.3 + col * 0.2]}>
              <meshStandardMaterial
                color={Math.random() > 0.9 ? "#3498db" : "#ecf0f1"}
                emissive={Math.random() > 0.9 ? "#3498db" : "#000000"}
                emissiveIntensity={Math.random() > 0.9 ? 0.6 : 0}
                roughness={0.1}
                metalness={0.2}
              />
            </Box>
          )),
        )}
      </group>
    </group>
  )
}
