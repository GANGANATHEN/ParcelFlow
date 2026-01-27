// app/page.js
"use client"
import React, { useEffect } from "react"
import { useLenisScroll } from "../utils/useLenisScroll"
import { init3DSectionAnimations } from "../utils/animation"
import Section from "./components/Section"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useLenisScroll()

  useEffect(() => {
    const ctx = gsap.context(() => {
      init3DSectionAnimations()
    })

    const handleResize = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      init3DSectionAnimations()
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      ctx.revert()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <main className="relative">
      <Section title="Welcome to SpaceCoin" index={0} />
      <Section title="Explore the Planets" index={1} />
      <Section title="Meet the Team" index={2} />
      <Section title="Connect With Us" index={3} />
    </main>
  )
}
