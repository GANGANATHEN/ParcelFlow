"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MultiShapeMorph = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const numParticles = 2200;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = this.x;
        this.targetY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 1.4;
        this.friction = 0.91;
        this.spring = 0.06;
      }

      update() {
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          let force = (100 - distance) / 100;
          this.vx -= dx * force * 0.4;
          this.vy -= dy * force * 0.4;
        }

        this.vx += (this.targetX - this.x) * this.spring;
        this.vy += (this.targetY - this.y) * this.spring;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.fillStyle = "#60a5fa";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- Shape Generators ---

    const getCirclePoints = () =>
      Array.from({ length: numParticles }, (_, i) => {
        const angle = (i / numParticles) * Math.PI * 2;
        const r = 250;
        return {
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
        };
      });

    const getSquarePoints = () =>
      Array.from({ length: numParticles }, () => ({
        x: centerX - 250 + Math.random() * 500,
        y: centerY - 250 + Math.random() * 500,
      }));

    const getTrianglePoints = () =>
      Array.from({ length: numParticles }, () => {
        const x = (Math.random() - 0.5) * 600;
        const y = Math.random() * 500 - 250;
        // Basic triangle bounds check
        if (Math.abs(x) < (y + 250) * 0.6) {
          return { x: centerX + x, y: centerY + y };
        }
        return { x: centerX, y: centerY - 250 };
      });

    // New: SVG Brain Sampling Logic
    const getSVGPoints = (pathData, numPoints) => {
      const points = [];
      const svgNS = "http://www.w3.org/2000/svg";
      const pathElement = document.createElementNS(svgNS, "path");
      pathElement.setAttribute("d", pathData);
      const totalLength = pathElement.getTotalLength();

      for (let i = 0; i < numPoints; i++) {
        const distance = (i / numPoints) * totalLength;
        const point = pathElement.getPointAtLength(distance);
        // Scaling and Centering the Brain
        points.push({
          x: centerX + (point.x - 250) * 1.8,
          y: centerY + (point.y - 250) * 1.8,
        });
      }
      return points;
    };

    // Simplified Brain Path
    const brainPath =
      "M250,150 C180,150 150,200 150,250 C150,320 200,350 250,400 C300,350 350,320 350,250 C350,200 320,150 250,150 M250,180 C280,180 300,200 300,230 M200,230 C200,200 220,180 250,180 M250,400 V250";
    const brainPath1 =
      "M250,150 C180,150 150,200 150,250 C350,200 320,150 250,150 M250,180 C280,180 300,200 300,230 M200,230 C200,200 220,180 250,180 M250,400 V250";

    const s1 = getCirclePoints();
    const s2 = getSquarePoints();
    const s3 = getTrianglePoints();
    const s4 = getSVGPoints(brainPath, numParticles);
    const s5 = getSVGPoints(brainPath1, numParticles);

    // Init Particles
    for (let i = 0; i < numParticles; i++) {
      const p = new Particle();
      p.targetX = s1[i].x;
      p.targetY = s1[i].y;
      particles.current.push(p);
    }

    // GSAP Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    particles.current.forEach((p, i) => {
      // Stage 1: Circle to Square
      tl.to(p, { targetX: s2[i].x, targetY: s2[i].y, duration: 1 }, 0);
      // Stage 2: Square to Triangle
      tl.to(p, { targetX: s3[i].x, targetY: s3[i].y, duration: 1 }, 1);
      // Stage 3: Triangle to BRAIN
      tl.to(p, { targetX: s4[i].x, targetY: s4[i].y, duration: 1 }, 2);
      // Stage 4: Triangle to BRAIN
      //   tl.to(p, { targetX: s5[i].x, targetY: s5[i].y, duration: 1 }, 3);
    });

    particles.current.forEach((p, i) => {
      tl.to(
        p,
        {
          targetX: s5[i].x,
          targetY: s5[i].y,
          duration: 1.5, // Path konjam slow-ah iruntha nalla irukum
          // Inga thaan magic! Ovvoru particle-kum random delay/offset tharrom
          delay: Math.random() * 0.5,
          ease: "power2.inOut",
        },
        3,
      ); // Start at Phase 4 (index 3)
    });

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="scroll-wrapper bg-black">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      />

      <section className="h-screen flex items-center px-20">
        <h2 className="text-white text-6xl font-black opacity-20">
          PHASE 01: CIRCLE
        </h2>
      </section>

      <section className="h-screen flex items-center justify-end px-20">
        <h2 className="text-white text-6xl font-black opacity-20">
          PHASE 02: SQUARE
        </h2>
      </section>

      <section className="h-screen flex items-center px-20">
        <h2 className="text-white text-6xl font-black opacity-20">
          PHASE 03: TRIANGLE
        </h2>
      </section>

      <section className="h-screen flex items-center justify-end px-20">
        <h2 className="text-blue-400 text-6xl font-black opacity-50">
          PHASE 04: BRAIN
        </h2>
      </section>
      <section className="h-screen flex items-center justify-end px-20">
        <h2 className="text-blue-400 text-6xl font-black opacity-50">
          PHASE 05: Also BRAIN
        </h2>
      </section>
    </div>
  );
};

export default MultiShapeMorph;
