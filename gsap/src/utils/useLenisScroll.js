// utils/useLenisScroll.js
"use client"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}
