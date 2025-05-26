"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image, Html } from "@react-three/drei"
import * as THREE from "three"

interface ProjectsRoomProps {
  position: [number, number, number]
}

export function ProjectsRoom({ position }: ProjectsRoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const projects = [
    {
      title: "Text to Speech App",
      description:
        "Convert text to natural speech with 3D interface. This application uses the Web Speech API to provide high-quality text-to-speech conversion with multiple voice options and speed controls.",
      tech: "JavaScript, Web Speech API, CSS3",
      features: ["Multiple Voice Options", "Speed Control", "Text Highlighting", "Download Audio"],
      image: "/images/projects/text-to-speech.jpeg",
      github: "https://github.com/bharani-coder/text-to-speech",
      demo: "https://bharani-text-to-speech.netlify.app",
      category: "Web Application",
      status: "Completed",
    },
    {
      title: "Notes Taking App",
      description:
        "Digital notepad with rich text editing features. A comprehensive note-taking application with local storage, search functionality, and export options for better productivity.",
      tech: "React JS, Local Storage, CSS",
      features: ["Rich Text Editor", "Local Storage", "Search Notes", "Export to PDF"],
      image: "/images/projects/notes-taking.jpeg",
      github: "https://github.com/bharani-coder/notes-app",
      demo: "https://bharani-notes-app.netlify.app",
      category: "Productivity App",
      status: "Completed",
    },
    {
      title: "Character Counter",
      description:
        "Real-time input character counting utility. A simple yet powerful tool for writers and developers to track character, word, and paragraph counts in real-time.",
      tech: "JavaScript, HTML, CSS",
      features: ["Real-time Counting", "Word Analysis", "Character Limits", "Copy to Clipboard"],
      image: "/images/projects/character-counter.jpeg",
      github: "https://github.com/bharani-coder/character-counter",
      demo: "https://bharani-character-counter.netlify.app",
      category: "Utility Tool",
      status: "Completed",
    },
    {
      title: "Age Calculator",
      description:
        "Calculate age with precision and visual feedback. An advanced age calculator that provides detailed age information including years, months, days, and even hours lived.",
      tech: "JavaScript, Date API, CSS3",
      features: ["Precise Calculations", "Visual Timeline", "Multiple Formats", "Birthday Countdown"],
      image: "/images/projects/age-calculator.jpeg",
      github: "https://github.com/bharani-coder/age-calculator",
      demo: "https://bharani-age-calculator.netlify.app",
      category: "Calculator",
      status: "Completed",
    },
  ]

  return (
    <group ref={groupRef} position={position}>
      {/* Room walls */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#ecf0f1" transparent opacity={0.1} />
      </Box>

      {/* Room title */}
      <Text position={[0, 4, -10]} fontSize={1} color="#2c3e50" anchorX="center" anchorY="middle">
        My Projects
      </Text>

      {/* Project gallery - simplified to 4 projects */}
      <ProjectGallery projects={projects} onProjectClick={setSelectedProject} />

      {/* Interactive computer setup */}
      <ComputerSetup position={[0, 0, 5]} />

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </group>
  )
}

function ProjectGallery({ projects, onProjectClick }: { projects: any[]; onProjectClick: (project: any) => void }) {
  return (
    <group>
      {/* Single row of projects */}
      {projects.map((project, index) => (
        <ProjectDisplay key={index} project={project} position={[-6 + index * 4, 2, -8]} onClick={onProjectClick} />
      ))}
    </group>
  )
}

interface ProjectDisplayProps {
  project: {
    title: string
    description: string
    tech: string
    image: string
    github: string
    demo: string
  }
  position: [number, number, number]
  onClick: (project: any) => void
}

function ProjectDisplay({ project, position, onClick }: ProjectDisplayProps) {
  const [hovered, setHovered] = useState(false)
  const projectRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (projectRef.current) {
      projectRef.current.rotation.y = hovered ? 0.1 : 0
      const targetScale = hovered ? 1.1 : 1
      projectRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={projectRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Project frame */}
      <Box args={[3, 2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#2c3e50"
          emissive={hovered ? "#3498db" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Box>

      {/* Project image */}
      <Image url={project.image} position={[0, 0.2, 0.06]} scale={[2.8, 1.5, 1]} transparent />

      {/* Project title */}
      <Text
        position={[0, -0.7, 0.06]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
      >
        {project.title}
      </Text>

      {/* Click indicator */}
      {hovered && (
        <Text
          position={[0, -1.2, 0.06]}
          fontSize={0.15}
          color="#3498db"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
          textAlign="center"
        >
          Click to view details
        </Text>
      )}
    </group>
  )
}

function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  return (
    <Html
      position={[0, 2, 5]}
      transform
      occlude={false}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.3s ease-out",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "800px",
            width: "90%",
            maxHeight: "90%",
            overflow: "auto",
            position: "relative",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            animation: "slideIn 0.4s ease-out",
            color: "white",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.3)")}
            onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
          >
            ×
          </button>

          {/* Project Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", fontWeight: "bold" }}>{project.title}</h1>
            <div
              style={{
                display: "inline-block",
                background: "rgba(255, 255, 255, 0.2)",
                padding: "5px 15px",
                borderRadius: "20px",
                fontSize: "0.9rem",
              }}
            >
              {project.category} • {project.status}
            </div>
          </div>

          {/* Project Image */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              style={{
                maxWidth: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>

          {/* Project Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
            {/* Description */}
            <div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#fff" }}>📝 Description</h3>
              <p style={{ lineHeight: "1.6", opacity: 0.9 }}>{project.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#fff" }}>✨ Features</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {project.features?.map((feature: string, index: number) => (
                  <li
                    key={index}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      opacity: 0.9,
                    }}
                  >
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technology Stack */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#fff" }}>🛠️ Technology Stack</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {project.tech.split(", ").map((tech: string, index: number) => (
                <span
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <button
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                border: "none",
                padding: "15px 30px",
                borderRadius: "25px",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              🔗 Live Demo
            </button>
            <button
              style={{
                background: "linear-gradient(45deg, #333, #555)",
                border: "none",
                padding: "15px 30px",
                borderRadius: "25px",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              📂 GitHub
            </button>
          </div>
        </div>

        {/* 3D Butterflies */}
        <ButterflyContainer />

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes butterfly {
            0% {
              transform: translateX(-100px) translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateX(25vw) translateY(-50px) rotate(10deg);
            }
            50% {
              transform: translateX(50vw) translateY(50px) rotate(-10deg);
            }
            75% {
              transform: translateX(75vw) translateY(-25px) rotate(5deg);
            }
            100% {
              transform: translateX(100vw) translateY(0px) rotate(0deg);
            }
          }

          @keyframes flutter {
            0%,
            100% {
              transform: scaleY(1);
            }
            50% {
              transform: scaleY(0.8);
            }
          }

          .butterfly {
            position: absolute;
            font-size: 2rem;
            animation: butterfly 8s linear infinite, flutter 0.3s ease-in-out infinite;
            pointer-events: none;
            z-index: 1001;
          }

          .butterfly:nth-child(1) {
            top: 10%;
            animation-delay: 0s;
            color: #ff6b6b;
          }

          .butterfly:nth-child(2) {
            top: 20%;
            animation-delay: -2s;
            color: #4ecdc4;
          }

          .butterfly:nth-child(3) {
            top: 30%;
            animation-delay: -4s;
            color: #45b7d1;
          }

          .butterfly:nth-child(4) {
            top: 40%;
            animation-delay: -6s;
            color: #f9ca24;
          }

          .butterfly:nth-child(5) {
            top: 50%;
            animation-delay: -1s;
            color: #6c5ce7;
          }

          .butterfly:nth-child(6) {
            top: 60%;
            animation-delay: -3s;
            color: #fd79a8;
          }

          .butterfly:nth-child(7) {
            top: 70%;
            animation-delay: -5s;
            color: #00b894;
          }

          .butterfly:nth-child(8) {
            top: 80%;
            animation-delay: -7s;
            color: #e17055;
          }
        `}</style>
      </div>
    </Html>
  )
}

function ButterflyContainer() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="butterfly">
          🦋
        </div>
      ))}
    </div>
  )
}

function ComputerSetup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desk */}
      <Box args={[6, 0.2, 3]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>

      {/* Monitor */}
      <Box args={[2.5, 1.5, 0.1]} position={[0, 1.8, -1]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>

      {/* Keyboard */}
      <Box args={[1.5, 0.1, 0.5]} position={[0, 0.9, 0.5]}>
        <meshStandardMaterial color="#34495e" />
      </Box>
    </group>
  )
}
