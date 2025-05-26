"use client"

import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"

export function Interface() {
  const scroll = useScroll()
  const [currentSection, setCurrentSection] = useState(0)
  const [zoomStage, setZoomStage] = useState(0)

  useFrame(() => {
    const scrollOffset = scroll.offset
    const totalSteps = 15 // 5 sections × 3 zoom steps each
    const currentStep = Math.floor(scrollOffset * totalSteps)
    const newSection = Math.floor(currentStep / 3)
    const newZoomStage = currentStep % 3

    if (newSection !== currentSection) {
      setCurrentSection(newSection)
    }
    if (newZoomStage !== zoomStage) {
      setZoomStage(newZoomStage)
    }
  })

  const sections = [
    { title: "Welcome", description: "Start your journey" },
    { title: "About Me", description: "Learn about my background" },
    { title: "Projects", description: "Explore my work" },
    { title: "Skills", description: "View my technical skills" },
    { title: "Contact", description: "Get in touch" },
  ]

  const zoomStages = ["Overview", "Focus", "Detail"]

  const handleNavClick = (index: number) => {
    const targetScroll = (index * 3) / 15 // Jump to start of section
    scroll.el.scrollTop = targetScroll * scroll.el.scrollHeight
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {/* Enhanced navigation dots with zoom indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-auto">
        <div className="flex space-x-6">
          {sections.map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 mb-2 ${
                  currentSection === index ? "bg-blue-500 scale-125" : "bg-gray-400 hover:bg-gray-600"
                }`}
                onClick={() => handleNavClick(index)}
              />
              {/* Zoom stage indicators */}
              {currentSection === index && (
                <div className="flex space-x-1">
                  {[0, 1, 2].map((stage) => (
                    <div
                      key={stage}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        zoomStage === stage ? "bg-blue-300" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced section indicator */}
      <div className="fixed top-8 left-8 z-10 bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold">{sections[currentSection]?.title}</h3>
        <p className="text-sm opacity-80">{sections[currentSection]?.description}</p>
        <div className="text-xs mt-2 opacity-60">
          Stage: {zoomStages[zoomStage]} ({zoomStage + 1}/3)
        </div>
      </div>

      {/* Enhanced progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-200 z-10">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
          style={{ width: `${scroll.offset * 100}%` }}
        />
      </div>

      {/* Section-specific instructions */}
      <div className="fixed bottom-24 right-8 z-10 bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        {currentSection === 2 && zoomStage === 1 && "Frontend Skills Focused"}
        {currentSection === 2 && zoomStage === 2 && "Backend Skills Focused"}
        {currentSection !== 2 && "Scroll to explore →"}
      </div>

      {/* Room navigation arrows */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-10 pointer-events-auto">
        {currentSection > 0 && (
          <button
            onClick={() => handleNavClick(currentSection - 1)}
            className="bg-black/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/40 transition-all"
          >
            ← Previous
          </button>
        )}
      </div>

      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-10 pointer-events-auto">
        {currentSection < sections.length - 1 && (
          <button
            onClick={() => handleNavClick(currentSection + 1)}
            className="bg-black/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/40 transition-all"
          >
            Next →
          </button>
        )}
      </div>

      {/* Enhanced room indicator */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center pointer-events-none">
        {currentSection === 0 && zoomStage === 0 && (
          <div className="animate-bounce">
            <div className="text-2xl mb-2">→</div>
            <div className="text-lg">Scroll to explore rooms</div>
            <div className="text-sm opacity-70">3 zoom levels per section</div>
          </div>
        )}
      </div>
    </div>
  )
}
