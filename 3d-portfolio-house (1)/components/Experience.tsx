"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"
import { House } from "./House"
import { Lighting } from "./Lighting"

export function Experience() {
  const { camera } = useThree()
  const scroll = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(camera as THREE.PerspectiveCamera)

  // Enhanced camera path points with closer zoom and smooth in/out animations
  const cameraPositions = [
    // Entrance - 3 zoom steps with "Web Developer" focus
    { position: [-60, 4, 12], target: [-50, 3, 0], zoom: 0.8 }, // Far entrance view
    { position: [-50, 3, 8], target: [-50, 3, 0], zoom: 1.2 }, // Medium zoom on "Web Developer"
    { position: [-45, 3, 5], target: [-50, 3, 0], zoom: 1.8 }, // Close zoom on text

    // About Me - 3 zoom steps with close focus
    { position: [-35, 4, 10], target: [-30, 2, 0], zoom: 0.9 }, // Room overview
    { position: [-30, 3, 6], target: [-30, 2, -3], zoom: 1.5 }, // Profile focus
    { position: [-28, 2.5, 3], target: [-30, 2, -8], zoom: 2.2 }, // Very close detail

    // Projects - 3 zoom steps with project focus
    { position: [-15, 4, 10], target: [-10, 2, 0], zoom: 0.9 }, // Room overview
    { position: [-10, 3, 6], target: [-10, 2, -6], zoom: 1.6 }, // Project gallery focus
    { position: [-8, 2.5, 3], target: [-10, 2, -8], zoom: 2.4 }, // Individual project detail

    // Skills - 3 zoom steps with card focus
    { position: [5, 4, 10], target: [10, 2, 0], zoom: 0.9 }, // Room overview
    { position: [6, 3, 5], target: [6, 2, -6], zoom: 1.8 }, // Frontend card close
    { position: [14, 3, 5], target: [14, 2, -6], zoom: 1.8 }, // Backend card close

    // Contact - 3 zoom steps with QR code focus
    { position: [25, 4, 10], target: [30, 2, 0], zoom: 0.9 }, // Room overview
    { position: [30, 3, 6], target: [30, 2, -4], zoom: 1.7 }, // QR code focus
    { position: [32, 2.5, 3], target: [30, 2, -8], zoom: 2.5 }, // Very close QR detail
  ]

  useFrame(() => {
    const scrollOffset = scroll.offset
    const totalSections = cameraPositions.length - 1
    const currentSection = Math.floor(scrollOffset * totalSections)
    const sectionProgress = (scrollOffset * totalSections) % 1

    // Ultra smooth easing function for cinematic zoom
    const easeInOutExpo = (t: number) => {
      return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
    }

    const easedProgress = easeInOutExpo(sectionProgress)

    if (currentSection < cameraPositions.length - 1) {
      const current = cameraPositions[currentSection]
      const next = cameraPositions[currentSection + 1]

      // Ultra smooth camera interpolation
      const newPosition = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...current.position),
        new THREE.Vector3(...next.position),
        easedProgress,
      )

      const newTarget = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...current.target),
        new THREE.Vector3(...next.target),
        easedProgress,
      )

      // Smooth zoom interpolation with enhanced range
      const newZoom = THREE.MathUtils.lerp(current.zoom, next.zoom, easedProgress)

      // Subtle breathing effect for immersion
      const breathingEffect = Math.sin(Date.now() * 0.001) * 0.02
      newPosition.y += breathingEffect
      newPosition.z += breathingEffect * 0.5

      camera.position.copy(newPosition)
      camera.lookAt(newTarget)
      camera.zoom = newZoom
      camera.updateProjectionMatrix()
    }
  })

  return (
    <>
      <Lighting />
      <House />
    </>
  )
}
