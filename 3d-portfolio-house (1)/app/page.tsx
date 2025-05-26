"use client"

import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"
import { Experience } from "@/components/Experience"
import { Interface } from "@/components/Interface"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lenis: any = null

    const initLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 2, 10],
        }}
        shadows
      >
        <ScrollControls pages={5} damping={0.1}>
          <Experience />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
