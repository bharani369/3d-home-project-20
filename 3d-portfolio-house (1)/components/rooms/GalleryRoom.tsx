"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Plane } from "@react-three/drei"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"

interface GalleryRoomProps {
  position: [number, number, number]
}

export function GalleryRoom({ position }: GalleryRoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()
  const [animationStage, setAnimationStage] = useState(0)

  useFrame(() => {
    const scrollOffset = scroll.offset
    const skillsSectionStart = 0.6 // Skills section starts at 60% scroll
    const skillsSectionEnd = 0.8 // Skills section ends at 80% scroll

    if (scrollOffset >= skillsSectionStart && scrollOffset <= skillsSectionEnd) {
      const sectionProgress = (scrollOffset - skillsSectionStart) / (skillsSectionEnd - skillsSectionStart)

      // Determine animation stage based on scroll progress
      if (sectionProgress < 0.33) {
        setAnimationStage(0) // Room overview
      } else if (sectionProgress < 0.66) {
        setAnimationStage(1) // Frontend card zoom
      } else {
        setAnimationStage(2) // Backend card zoom
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Room walls */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#fdf6e3" transparent opacity={0.1} />
      </Box>

      {/* Skills title */}
      <Text position={[0, 4, -10]} fontSize={1} color="#000000" anchorX="center" anchorY="middle">
        Skills Section
      </Text>

      {/* Frontend Skills */}
      <FrontendSkills position={[-6, 2, -8]} animationStage={animationStage} />

      {/* Backend Skills */}
      <BackendSkills position={[6, 2, -8]} animationStage={animationStage} />

      {/* Additional Skills */}
      <AdditionalSkills position={[0, 0.5, 5]} />

      {/* Floating skill elements */}
      <FloatingSkillElements />

      {/* Interactive pedestals */}
      <Pedestal position={[-2, 0, 2]} />
      <Pedestal position={[2, 0, 2]} />
    </group>
  )
}

function FrontendSkills({ position, animationStage }: { position: [number, number, number]; animationStage: number }) {
  const skills = ["HTML", "CSS", "Javascript", "REACT JS", "J-Query"]
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Zoom animation for frontend card
      const targetScale = animationStage === 1 ? 1.3 : 1
      const currentScale = groupRef.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
      groupRef.current.scale.setScalar(newScale)

      // Glow effect when focused
      if (animationStage === 1) {
        groupRef.current.position.z = position[2] + Math.sin(Date.now() * 0.003) * 0.2
      } else {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2], 0.1)
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Background panel with enhanced glow */}
      <Plane args={[5, 6]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#1a5490"
          emissiveIntensity={animationStage === 1 ? 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </Plane>

      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        FRONTEND TECHNOLOGY
      </Text>

      {skills.map((skill, index) => (
        <SkillItem
          key={skill}
          skill={skill}
          position={[0, 1.5 - index * 0.6, 0]}
          isActive={animationStage === 1}
          delay={index * 0.1}
        />
      ))}
    </group>
  )
}

function BackendSkills({ position, animationStage }: { position: [number, number, number]; animationStage: number }) {
  const skills = ["EXPRESS JS", "NODE JS", "MONGO-DB"]
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Zoom animation for backend card
      const targetScale = animationStage === 2 ? 1.3 : 1
      const currentScale = groupRef.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
      groupRef.current.scale.setScalar(newScale)

      // Glow effect when focused
      if (animationStage === 2) {
        groupRef.current.position.z = position[2] + Math.sin(Date.now() * 0.003) * 0.2
      } else {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2], 0.1)
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Background panel with enhanced glow */}
      <Plane args={[5, 6]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#e74c3c"
          emissive="#8b0000"
          emissiveIntensity={animationStage === 2 ? 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </Plane>

      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        BACK-END TECHNOLOGY
      </Text>

      {skills.map((skill, index) => (
        <SkillItem
          key={skill}
          skill={skill}
          position={[0, 1.5 - index * 0.6, 0]}
          isActive={animationStage === 2}
          delay={index * 0.1}
        />
      ))}
    </group>
  )
}

function AdditionalSkills({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Background panel */}
      <Plane args={[12, 3]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#2ecc71" emissive="#006400" emissiveIntensity={0.1} transparent opacity={0.8} />
      </Plane>

      <Text position={[0, 1, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Additional Skills
      </Text>

      <Text position={[0, 0.2, 0]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
        Problem Solving • Version Control (Git) • Responsive Design
      </Text>

      <Text position={[0, -0.3, 0]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
        API Integration • Database Design • Web Development
      </Text>

      <Text position={[0, -0.8, 0]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
        Team Collaboration • Project Management • Debugging
      </Text>
    </group>
  )
}

function SkillItem({
  skill,
  position,
  isActive,
  delay,
}: {
  skill: string
  position: [number, number, number]
  isActive: boolean
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const skillRef = useRef<THREE.Group>(null)
  const [animationTime, setAnimationTime] = useState(0)

  useFrame((state) => {
    if (skillRef.current) {
      // Update animation time
      setAnimationTime(state.clock.elapsedTime)

      // Scale animation with staggered delay
      const delayedActive = isActive && state.clock.elapsedTime - delay > 0
      const targetScale = hovered || delayedActive ? 1.2 : 1
      const currentScale = skillRef.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15)
      skillRef.current.scale.setScalar(newScale)

      // Floating animation when active
      if (delayedActive) {
        skillRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1
      } else {
        skillRef.current.position.y = THREE.MathUtils.lerp(skillRef.current.position.y, position[1], 0.1)
      }
    }
  })

  return (
    <group
      ref={skillRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Skill background with enhanced effects */}
      <Plane args={[4, 0.4]} position={[0, 0, 0.01]}>
        <meshStandardMaterial
          color={hovered || isActive ? "#ffffff" : "rgba(255,255,255,0.2)"}
          transparent
          opacity={hovered || isActive ? 0.9 : 0.3}
          emissive={isActive ? "#ffffff" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
        />
      </Plane>

      <Text
        position={[0, 0, 0.02]}
        fontSize={0.2}
        color={hovered || isActive ? "#000000" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </group>
  )
}

function FloatingSkillElements() {
  const elementsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (elementsRef.current) {
      elementsRef.current.rotation.y = state.clock.elapsedTime * 0.2
      elementsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i * 0.5) * 0.3 + 2
      })
    }
  })

  const skillIcons = ["⚛️", "🌐", "💻", "🎨", "📱", "🔧"]

  return (
    <group ref={elementsRef}>
      {skillIcons.map((icon, i) => (
        <Text
          key={i}
          position={[Math.cos((i / 6) * Math.PI * 2) * 4, 2, Math.sin((i / 6) * Math.PI * 2) * 4]}
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      ))}
    </group>
  )
}

function Pedestal({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[1, 1.5, 1]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#bdc3c7" />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[0, 1.65, 0]}>
        <meshStandardMaterial color="#3498db" emissive="#1a5490" />
      </Box>
    </group>
  )
}
