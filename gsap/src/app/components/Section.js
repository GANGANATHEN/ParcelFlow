// components/Section3D.js
import React from "react"

const colors = ["bg-black", "bg-zinc-800", "bg-blue-950", "bg-purple-900"]

const Section = ({ title, index }) => {
  return (
    <section
      className={`section-3d h-screen w-full ${colors[index]} flex items-center justify-center`}
    >
      <div className="inner-content text-white text-5xl font-bold">
        {title}
      </div>
    </section>
  )
}

export default Section
