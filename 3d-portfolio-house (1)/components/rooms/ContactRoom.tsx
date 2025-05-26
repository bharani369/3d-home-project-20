"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image, Sphere, Plane } from "@react-three/drei"
import * as THREE from "three"

interface ContactRoomProps {
  position: [number, number, number]
}

export function ContactRoom({ position }: ContactRoomProps) {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={position}>
      {/* Enhanced Room walls with realistic glow */}
      <EnhancedContactWalls />

      {/* Realistic Room Lighting */}
      <RealisticRoomLighting />

      {/* Contact title */}
      <Text position={[0, 4, -10]} fontSize={1} color="#000000" anchorX="center" anchorY="middle">
        Get In Touch
      </Text>

      {/* Enhanced QR Code display */}
      <EnhancedQRCodeDisplay position={[0, 2.5, -9]} />

      {/* Updated Social Media Links */}
      <UpdatedSocialMediaSection position={[-6, 2, 0]} />

      {/* Updated Contact information */}
      <UpdatedContactInfo position={[6, 2, 0]} />

      {/* Resume download */}
      <ResumeDownload position={[0, 0.5, 5]} />

      {/* Holographic elements */}
      <HolographicElements />
    </group>
  )
}

function EnhancedContactWalls() {
  const wallRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (wallRef.current) {
      wallRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        if (mesh.material && "emissiveIntensity" in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1
        }
      })
    }
  })

  return (
    <group ref={wallRef}>
      {/* Main room structure with glow */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#e8f5e8" transparent opacity={0.1} emissive="#00ff88" emissiveIntensity={0.05} />
      </Box>

      {/* Glowing wall panels */}
      <Box args={[2, 3, 0.1]} position={[-8, 2, -10]}>
        <meshStandardMaterial
          color="#2ecc71"
          emissive="#00ff44"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      <Box args={[2, 3, 0.1]} position={[8, 2, -10]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#0088ff"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      <Box args={[2, 3, 0.1]} position={[-8, 2, 10]}>
        <meshStandardMaterial
          color="#e74c3c"
          emissive="#ff4444"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      <Box args={[2, 3, 0.1]} position={[8, 2, 10]}>
        <meshStandardMaterial
          color="#f39c12"
          emissive="#ffaa00"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {/* Circuit patterns with glow */}
      <CircuitGlowPattern position={[0, 2, -10.8]} />
      <CircuitGlowPattern position={[0, 2, 10.8]} />
    </group>
  )
}

function CircuitGlowPattern({ position }: { position: [number, number, number] }) {
  const circuitRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (circuitRef.current) {
      circuitRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        if (mesh.material && "emissiveIntensity" in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.3
        }
      })
    }
  })

  return (
    <group ref={circuitRef} position={position}>
      {/* Glowing circuit lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Box key={i} args={[0.05, 2, 0.02]} position={[i * 1.5 - 7.5, 0, 0]}>
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} transparent opacity={0.9} />
        </Box>
      ))}

      {/* Pulsing circuit nodes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Sphere key={i} args={[0.08]} position={[(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 3, 0]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff0000" emissiveIntensity={1.2} transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  )
}

function RealisticRoomLighting() {
  const lightRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.children.forEach((light, i) => {
        const pointLight = light as THREE.PointLight
        pointLight.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 2 + i * 0.8) * 0.5
      })
    }
  })

  return (
    <group ref={lightRef}>
      {/* Ambient room lighting */}
      <pointLight position={[0, 4, 0]} intensity={2} color="#ffffff" distance={15} decay={1} />

      {/* Corner accent lights */}
      <pointLight position={[-8, 3, -8]} intensity={1.5} color="#2ecc71" distance={8} decay={2} />
      <pointLight position={[8, 3, -8]} intensity={1.5} color="#3498db" distance={8} decay={2} />
      <pointLight position={[-8, 3, 8]} intensity={1.5} color="#e74c3c" distance={8} decay={2} />
      <pointLight position={[8, 3, 8]} intensity={1.5} color="#f39c12" distance={8} decay={2} />

      {/* Ceiling spot lights */}
      {Array.from({ length: 4 }).map((_, i) =>
        Array.from({ length: 4 }).map((_, j) => (
          <pointLight
            key={`spot-${i}-${j}`}
            position={[-6 + i * 4, 4.5, -6 + j * 4]}
            intensity={0.8}
            color="#ffffff"
            distance={6}
            decay={2}
          />
        )),
      )}
    </group>
  )
}

function EnhancedQRCodeDisplay({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const qrRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (qrRef.current) {
      qrRef.current.rotation.y += hovered ? 0.02 : 0.005
      qrRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      const targetScale = hovered ? 1.2 : 1
      qrRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={qrRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Enhanced QR Code frame with realistic glow */}
      <Box args={[4, 4, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#2c3e50"
          emissive={hovered ? "#3498db" : "#001122"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>

      {/* QR Code image */}
      <Image url="/images/qr-code.jpeg" position={[0, 0, 0.12]} scale={[3.6, 3.6, 1]} transparent />

      {/* Realistic glowing border */}
      <Plane args={[4.4, 4.4]} position={[0, 0, -0.01]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#3498db"
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={0.4}
        />
      </Plane>

      {/* Enhanced description */}
      <Text position={[0, -2.5, 0]} fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
        Scan for Contact Info
      </Text>

      <Text position={[0, -3, 0]} fontSize={0.25} color="#666666" anchorX="center" anchorY="middle">
        Quick access to all my details
      </Text>

      {/* Floating particles around QR code */}
      {hovered && <QRParticles />}
    </group>
  )
}

function QRParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z = state.clock.elapsedTime * 0.5
      particlesRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 3 + i) * 0.2
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.08]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3,
            Math.sin((i / 8) * Math.PI * 2) * 0.5,
            Math.sin((i / 8) * Math.PI * 2) * 3,
          ]}
        >
          <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={1.2} transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  )
}

function UpdatedSocialMediaSection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Enhanced background panel with glow */}
      <Plane args={[5, 6]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#1a5490"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
        />
      </Plane>

      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Connect With Me
      </Text>

      {/* Updated GitHub */}
      <SocialMediaLink position={[0, 1.5, 0]} icon="🐙" label="GitHub" username="bharani369" color="#333333" />

      {/* Updated LinkedIn */}
      <SocialMediaLink position={[0, 0.5, 0]} icon="💼" label="LinkedIn" username="bharanidharan p" color="#0077b5" />

      {/* Instagram */}
      <SocialMediaLink position={[0, -0.5, 0]} icon="📷" label="Instagram" username="@bharani_coder" color="#e4405f" />

      {/* YouTube */}
      <SocialMediaLink position={[0, -1.5, 0]} icon="📺" label="YouTube" username="Bharani Coder" color="#ff0000" />
    </group>
  )
}

function SocialMediaLink({
  position,
  icon,
  label,
  username,
  color,
}: {
  position: [number, number, number]
  icon: string
  label: string
  username: string
  color: string
}) {
  const [hovered, setHovered] = useState(false)
  const linkRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (linkRef.current) {
      const targetScale = hovered ? 1.1 : 1
      linkRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={linkRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Icon background with glow */}
      <Box args={[0.6, 0.6, 0.1]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {/* Icon */}
      <Text position={[-1.5, 0, 0.06]} fontSize={0.3} anchorX="center" anchorY="middle">
        {icon}
      </Text>

      {/* Label and username */}
      <Text position={[-0.5, 0.1, 0]} fontSize={0.2} color="#ffffff" anchorX="left" anchorY="middle">
        {label}
      </Text>
      <Text position={[-0.5, -0.1, 0]} fontSize={0.15} color="#ffffff" anchorX="left" anchorY="middle">
        {username}
      </Text>
    </group>
  )
}

function UpdatedContactInfo({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Enhanced background panel with glow */}
      <Plane args={[5, 6]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#2ecc71"
          emissive="#006400"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
        />
      </Plane>

      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Contact Information
      </Text>

      <Text position={[0, 1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        📧 Email
      </Text>
      <Text position={[0, 1.2, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        bharani.coder@gmail.com
      </Text>

      <Text position={[0, 0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        📱 Phone
      </Text>
      <Text position={[0, 0.2, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        +91 7810051411
      </Text>

      <Text position={[0, -0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        📍 Location
      </Text>
      <Text position={[0, -0.8, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Namakkal, Tamil Nadu, India
      </Text>

      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        🎓 Education
      </Text>
      <Text position={[0, -1.8, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Information Technology
      </Text>
    </group>
  )
}

function ResumeDownload({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const resumeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (resumeRef.current) {
      const targetScale = hovered ? 1.1 : 1
      resumeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={resumeRef} position={position}>
      <Text position={[0, 1, 0]} fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
        Resume
      </Text>

      <Box
        args={[4, 1.5, 0.2]}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#3498db" : "#34495e"}
          emissive={hovered ? "#1a5490" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      <Text position={[0, 0, 0.15]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        📄 Download Resume
      </Text>
    </group>
  )
}

function HolographicElements() {
  const hologramRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (hologramRef.current) {
      hologramRef.current.rotation.y = state.clock.elapsedTime * 0.5
      hologramRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 3
      })
    }
  })

  return (
    <group ref={hologramRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.1]}
          position={[Math.cos((i / 8) * Math.PI * 2) * 4, 3, Math.sin((i / 8) * Math.PI * 2) * 4]}
        >
          <meshStandardMaterial color="#00ff88" emissive="#004422" emissiveIntensity={0.8} transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  )
}
