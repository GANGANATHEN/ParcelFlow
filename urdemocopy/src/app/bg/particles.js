"use client";
import React, { useRef, useEffect, memo } from "react";

const RotatingParticleRing = memo(function RotatingParticleRing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Color values
    const colorStart = [22, 87, 151]; // Blue
    const colorMid = [156, 168, 94]; // Green/Yellow
    const colorEnd = [225, 231, 130]; // Light Yellow

    const particleCount = 1200;
    const particles = Array.from({ length: particleCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      startRadius: Math.random() * 50,
      speed: 0.0015 + Math.random() * 0.0005,
      life: Math.random(),
    }));

    function animate() {
      ctx.clearRect(0, 0, 210, 210);

      particles.forEach((p) => {
        p.life += p.speed;
        if (p.life > 1) p.life = 0;

        const radius = p.startRadius + p.life * 150;
        const x = 105 + Math.cos(p.angle) * radius;
        const y = 105 + Math.sin(p.angle) * radius;

        // Color & Opacity Logic
        let r, g, b, alpha;

        if (p.life < 0.2) {
          alpha = p.life * 3;
          [r, g, b] = colorStart;
        } else if (p.life < 0.7) {
          alpha = 0.8;
          const t = (p.life - 0.25) / 0.4;
          // Smooth blending
          r = colorStart[0] + (colorMid[0] - colorStart[0]) * t;
          g = colorStart[1] + (colorMid[1] - colorStart[1]) * t;
          b = colorStart[2] + (colorMid[2] - colorStart[2]) * t;
        } else {
          alpha = 1 - (p.life - 0.7) * 3;
          [r, g, b] = colorEnd;
        }

        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
        ctx.fillRect(x, y, 1.2, 1.2);
      });

      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div
      className="absolute rotate-90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:size-[210px] size-[150px] pointer-events-none"
      style={{
        WebkitMaskImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 210 210'><path d='M 105, 105 m -96, 0 a 95,101 0 1,0 191,0 a 95,105 0 1,0 -190,0 M 110, 105 m -65, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'/></svg>\")",
        maskImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 210 210'><path d='M 105, 105 m -96, 0 a 95,101 0 1,0 191,0 a 95,105 0 1,0 -190,0 M 110, 105 m -65, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'/></svg>\")",
      }}
    >
      <canvas
        ref={canvasRef}
        width={210}
        height={210}
        className="w-full h-full"
      />
    </div>
  );
});

export default RotatingParticleRing;
