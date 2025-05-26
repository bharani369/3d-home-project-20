"use client"
import { Text, Box, Plane, Image } from "@react-three/drei"
import { AboutRoom } from "./rooms/AboutRoom"
import { ProjectsRoom } from "./rooms/ProjectsRoom"
import { GalleryRoom } from "./rooms/GalleryRoom"
import { ContactRoom } from "./rooms/ContactRoom"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function House() {
  return (
    <group>
      {/* Enhanced Floor with pattern */}
      <Plane args={[200, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#f5f5f5" />
      </Plane>

      {/* Floor tiles pattern */}
      <FloorPattern />

      {/* Enhanced Walls with colorful textures - Horizontal layout */}
      <HorizontalColorfulWalls />

      {/* Roof structure */}
      <HorizontalRoofStructure />

      {/* Rooms arranged horizontally */}
      <AboutRoom position={[-30, 0, 0]} />
      <ProjectsRoom position={[-10, 0, 0]} />
      <GalleryRoom position={[10, 0, 0]} />
      <ContactRoom position={[30, 0, 0]} />

      {/* Enhanced hallway decorations */}
      <HorizontalHallwayDecorations />

      {/* LED Strip Lights */}
      <HorizontalLEDStripLights />
    </group>
  )
}

function FloorPattern() {
  return (
    <group>
      {Array.from({ length: 40 }).map((_, i) =>
        Array.from({ length: 10 }).map((_, j) => (
          <Plane
            key={`${i}-${j}`}
            args={[4.8, 4.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[(i - 20) * 5, 0.01, (j - 5) * 5]}
          >
            <meshStandardMaterial
              color={`hsl(${(i + j) * 20}, 20%, ${85 + ((i + j) % 3) * 5}%)`}
              transparent
              opacity={0.3}
            />
          </Plane>
        )),
      )}
    </group>
  )
}

function HorizontalColorfulWalls() {
  return (
    <group>
      {/* Front and back walls */}
      <WallSection args={[200, 5, 0.3]} position={[0, 2.5, 12]} color="#ff6b6b" emissive="#330000" />
      <WallSection args={[200, 5, 0.3]} position={[0, 2.5, -12]} color="#4ecdc4" emissive="#003330" />

      {/* Room divider walls */}
      <WallSection args={[0.3, 5, 24]} position={[-20, 2.5, 0]} color="#45b7d1" emissive="#001133" />
      <WallSection args={[0.3, 5, 24]} position={[0, 2.5, 0]} color="#f9ca24" emissive="#332200" />
      <WallSection args={[0.3, 5, 24]} position={[20, 2.5, 0]} color="#6c5ce7" emissive="#220033" />

      {/* End walls */}
      <WallSection args={[0.3, 5, 24]} position={[-40, 2.5, 0]} color="#fd79a8" emissive="#330011" />
      <WallSection args={[0.3, 5, 24]} position={[40, 2.5, 0]} color="#00b894" emissive="#003322" />
    </group>
  )
}

function WallSection({
  args,
  position,
  color,
  emissive,
}: {
  args: [number, number, number]
  position: [number, number, number]
  color: string
  emissive: string
}) {
  const wallRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (wallRef.current) {
      const material = wallRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <Box ref={wallRef} args={args} position={position} castShadow receiveShadow>
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.1} roughness={0.3} metalness={0.1} />
    </Box>
  )
}

function HorizontalRoofStructure() {
  return (
    <group>
      {/* Main roof */}
      <Box args={[200, 0.3, 26]} position={[0, 5.5, 0]} castShadow>
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </Box>

      {/* Roof beams */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Box key={i} args={[0.3, 0.5, 26]} position={[-95 + i * 10, 5.3, 0]} castShadow>
          <meshStandardMaterial color="#34495e" />
        </Box>
      ))}

      {/* Skylights for each room */}
      <Box args={[8, 0.1, 8]} position={[-30, 5.4, 0]}>
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} emissive="#001122" emissiveIntensity={0.2} />
      </Box>
      <Box args={[8, 0.1, 8]} position={[-10, 5.4, 0]}>
        <meshStandardMaterial color="#ffb3ba" transparent opacity={0.3} emissive="#220011" emissiveIntensity={0.2} />
      </Box>
      <Box args={[8, 0.1, 8]} position={[10, 5.4, 0]}>
        <meshStandardMaterial color="#bae1ff" transparent opacity={0.3} emissive="#001122" emissiveIntensity={0.2} />
      </Box>
      <Box args={[8, 0.1, 8]} position={[30, 5.4, 0]}>
        <meshStandardMaterial color="#baffc9" transparent opacity={0.3} emissive="#001100" emissiveIntensity={0.2} />
      </Box>
    </group>
  )
}

function HorizontalLEDStripLights() {
  return (
    <group>
      {/* Ceiling LED strips running horizontally */}
      {Array.from({ length: 40 }).map((_, i) => (
        <LEDStrip
          key={`ceiling-${i}`}
          position={[-95 + i * 5, 4.8, 0]}
          color={`hsl(${i * 9}, 70%, 60%)`}
          orientation="vertical"
        />
      ))}

      {/* Wall LED strips */}
      {Array.from({ length: 20 }).map((_, i) => (
        <LEDStrip
          key={`wall-front-${i}`}
          position={[-95 + i * 10, 2, 11.8]}
          color={`hsl(${i * 18 + 180}, 80%, 50%)`}
          orientation="horizontal"
        />
      ))}

      {Array.from({ length: 20 }).map((_, i) => (
        <LEDStrip
          key={`wall-back-${i}`}
          position={[-95 + i * 10, 2, -11.8]}
          color={`hsl(${i * 18 + 90}, 80%, 50%)`}
          orientation="horizontal"
        />
      ))}

      {/* Floor LED strips */}
      {Array.from({ length: 30 }).map((_, i) => (
        <LEDStrip
          key={`floor-${i}`}
          position={[-75 + i * 5, 0.1, 0]}
          color={`hsl(${i * 12}, 60%, 70%)`}
          orientation="horizontal"
        />
      ))}
    </group>
  )
}

function LEDStrip({
  position,
  color,
  orientation,
}: {
  position: [number, number, number]
  color: string
  orientation: "horizontal" | "vertical"
}) {
  const ledRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ledRef.current) {
      const material = ledRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3 + position[0] + position[2]) * 0.3
    }
  })

  const args: [number, number, number] = orientation === "horizontal" ? [2, 0.1, 0.1] : [0.1, 2, 0.1]

  return (
    <Box ref={ledRef} args={args} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
    </Box>
  )
}

function HorizontalHallwayDecorations() {
  return (
    <group>
      {/* BIG "WEB DEVELOPER" TEXT AT ENTRANCE */}
      <WebDeveloperEntrance position={[-50, 3, 0]} />

      {/* Logo display with enhanced frame */}
      <Box args={[0.2, 2.5, 2.5]} position={[-48, 2.5, 0]}>
        <meshStandardMaterial color="#2c3e50" emissive="#000033" emissiveIntensity={0.1} />
      </Box>
      <Image url="/images/logo-b.png" position={[-47.8, 2.5, 0]} scale={[1, 2, 2]} transparent />

      {/* Room labels */}
      <AnimatedSign position={[-30, 3, 8]} text="About Me" rotation={[0, 0, 0]} />
      <AnimatedSign position={[-10, 3, 8]} text="Projects" rotation={[0, 0, 0]} />
      <AnimatedSign position={[10, 3, 8]} text="Skills" rotation={[0, 0, 0]} />
      <AnimatedSign position={[30, 3, 8]} text="Contact" rotation={[0, 0, 0]} />

      {/* Navigation arrows */}
      <AnimatedSign position={[-40, 1.5, 0]} text="→ Start Here" rotation={[0, 0, 0]} />
      <AnimatedSign position={[40, 1.5, 0]} text="End ←" rotation={[0, 0, 0]} />
    </group>
  )
}

function WebDeveloperEntrance({ position }: { position: [number, number, number] }) {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      // Floating animation
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      // Subtle rotation
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={textRef} position={position}>
      {/* Glowing background panel */}
      <Plane args={[12, 4]} position={[0, 0, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#3498db" emissive="#1a5490" emissiveIntensity={0.4} transparent opacity={0.8} />
      </Plane>

      {/* Main "WEB DEVELOPER" text */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={1.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        letterSpacing={0.1}
      >
        WEB DEVELOPER
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.6}
        color="#ecf0f1"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        Bharanidharan P
      </Text>

      {/* Decorative elements */}
      <FloatingDecorations />
    </group>
  )
}

function FloatingDecorations() {
  const decorationsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (decorationsRef.current) {
      decorationsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.2
        child.rotation.z = state.clock.elapsedTime * 0.5 + i
      })
    }
  })

  return (
    <group ref={decorationsRef}>
      {/* Floating code symbols */}
      <Text position={[-4, 2, 0]} fontSize={0.8} color="#f39c12" rotation={[0, Math.PI / 2, 0]}>
        {"</>"}
      </Text>
      <Text position={[4, 2, 0]} fontSize={0.8} color="#e74c3c" rotation={[0, Math.PI / 2, 0]}>
        {"{}"}
      </Text>
      <Text position={[-4, -2, 0]} fontSize={0.8} color="#2ecc71" rotation={[0, Math.PI / 2, 0]}>
        {"()"}
      </Text>
      <Text position={[4, -2, 0]} fontSize={0.8} color="#9b59b6" rotation={[0, Math.PI / 2, 0]}>
        {"[]"}
      </Text>
    </group>
  )
}

function AnimatedSign({
  position,
  text,
  rotation,
}: {
  position: [number, number, number]
  text: string
  rotation: [number, number, number]
}) {
  const signRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (signRef.current) {
      signRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={signRef} position={position} rotation={rotation}>
      <Plane args={[3, 0.8]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#34495e" emissive="#001122" emissiveIntensity={0.2} transparent opacity={0.9} />
      </Plane>
      <Text fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}
