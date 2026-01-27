// utils/animations.js
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const init3DSectionAnimations = () => {
  const sections = document.querySelectorAll(".section-3d")

  sections.forEach((section, index) => {
    const content = section.querySelector(".inner-content")

    gsap.fromTo(
      content,
      { opacity: 0, rotateX: -90, y: 200 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      }
    )
  })
}
