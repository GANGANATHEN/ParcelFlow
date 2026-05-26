"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function BallsCanvas({ startFall, triggerShake, exchangeRef }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const rafRef = useRef(null);
  const hasStartedFall = useRef(false);
  const isDraggingLocked = useRef(false);

  const isMouseOverDiv = useRef(false);

  useEffect(() => {
    const div = exchangeRef.current;
    if (!div) return;

    const onMouseEnter = () => {
      isMouseOverDiv.current = true;
    };
    const onMouseLeave = () => {
      isMouseOverDiv.current = false;
    };

    div.addEventListener("mouseenter", onMouseEnter);
    div.addEventListener("mouseleave", onMouseLeave);

    return () => {
      div.removeEventListener("mouseenter", onMouseEnter);
      div.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [exchangeRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const { Engine, Bodies, Composite, Mouse, MouseConstraint, Events } =
      Matter;

    const engine = Engine.create({
      positionIterations: 20,
      velocityIterations: 20,
    });
    
    engine.world.gravity.y = 0;
    engineRef.current = engine;

    const getBallCount = () => {
      if (window.innerWidth < 640) return 36; // mobile
      if (window.innerWidth < 1024) return 36; // tab
      if (window.innerWidth < 1536) return 46;
      return 70; // desktop
    };

    const BALL_COUNT = getBallCount();

    const BALL_SIZE =
      window.innerWidth < 640 ? 34 : window.innerWidth < 1024 ? 48 : 70;
    const RADIUS = BALL_SIZE / 2;

    const imagePaths = [
      "/image/ball-1.svg",
      "/image/ball-2.svg",
      "/image/ball-3.svg",
    ];
    const images = [];

    let walls = [];
    let blockBody = null;
    const balls = [];
    let lastW = 0;
    let lastH = 0;

    const start = async () => {
      const loadedImages = await Promise.all(
        imagePaths.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve(img);
              img.onerror = () => resolve(null);
            }),
        ),
      );
      images.push(...loadedImages.filter(Boolean));

      const cols = Math.floor(canvas.offsetWidth / (BALL_SIZE + 8)) || 1;

      for (let i = 0; i < BALL_COUNT; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * (BALL_SIZE + 8) + RADIUS + (Math.random() - 0.5) * 40;
        const y = -(row * (BALL_SIZE + 2)) - RADIUS - Math.random() * 200;

        const body = Bodies.circle(x, y, RADIUS, {
          restitution: 0.7,
          friction: 0.005,
          frictionAir: 0.01,
          slop: 0.5,
          render: { imgIndex: Math.floor(Math.random() * images.length) },
        });

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: Math.random() * -2,
        });
        balls.push(body);
        Composite.add(engine.world, body);
      }
      renderLoop();
    };

    start();

    const mouse = Mouse.create(canvas);
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 1.2,
        angularStiffness: 0.5,
        render: { visible: false },
      },
      element: canvas,
      collisionFilter: { mask: 0x0001 },
    });

    Composite.add(engine.world, mouseConstraint);

    Events.on(engine, "beforeUpdate", () => {
      const MAX_SPEED = 2090;
      balls.forEach((body) => {
        if (body.speed > MAX_SPEED) {
          Matter.Body.setVelocity(body, {
            x: (body.velocity.x / body.speed) * MAX_SPEED,
            y: (body.velocity.y / body.speed) * MAX_SPEED,
          });
        }
      });

      // Check if user is clicking (button === 0 for left click)
      const isClicking = mouse.button === 0;

      if (mouseConstraint.body) {
        const ballPos = mouseConstraint.body.position;
        const mousePos = mouse.position;
        const body = mouseConstraint.body;
        const mouseSpeed = Math.hypot(
          body.position.x - mousePos.x,
          body.position.y - mousePos.y,
        );
        const edgeTol = 5;
        const isHittingWalls =
          mousePos.x <= edgeTol ||
          mousePos.x >= canvas.offsetWidth - edgeTol ||
          mousePos.y <= edgeTol ||
          mousePos.y >= canvas.offsetHeight - edgeTol;

        const dist = Math.hypot(ballPos.x - mousePos.x, ballPos.y - mousePos.y);
        const dynamicLimit = 7.5 + Math.min(mouseSpeed / 50, 7.5);

        // Force Release Condition:
        // 1. Mouse on div
        // 2. Mouse on Wall
        // 3. Distance note
        if (
          isHittingWalls ||
          isMouseOverDiv.current ||
          dist > RADIUS * dynamicLimit
        ) {
          mouseConstraint.body = null;
          if (mouseConstraint.constraint) {
            mouseConstraint.constraint.bodyB = null;
          }
          isDraggingLocked.current = true; // Block further grabbing
        }
      } else {
        // If not clicking, unlock so user can drag again
        if (!isClicking) {
          isDraggingLocked.current = false;
        }
      }

      // Prevent re-grabbing if locked
      if (isDraggingLocked.current && mouseConstraint.body) {
        mouseConstraint.body = null;
        if (mouseConstraint.constraint) {
          mouseConstraint.constraint.bodyB = null;
        }
      }
    });

    Events.on(mouseConstraint, "mousedown", (_) => {
      canvas.focus();
      isDraggingLocked.current = false;
    });

    const renderLoop = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      if (W !== lastW || H !== lastH) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        Matter.Mouse.setScale(mouse, { x: 1 / dpr, y: 1 / dpr });
        if (walls.length) Composite.remove(engine.world, walls);
        const thickness = 1000;
        const wallOptions = { isStatic: true, friction: 0, restitution: 0.4 };
        walls = [
          Bodies.rectangle(
            W / 2,
            H + thickness / 2,
            W * 2,
            thickness,
            wallOptions,
          ),
          Bodies.rectangle(
            -thickness / 2,
            H / 2,
            thickness,
            H * 2,
            wallOptions,
          ),
          Bodies.rectangle(
            W + thickness / 2,
            H / 2,
            thickness,
            H * 2,
            wallOptions,
          ),
          Bodies.rectangle(
            W / 2,
            -1000 - thickness / 2,
            W * 2,
            thickness,
            wallOptions,
          ),
        ];
        Composite.add(engine.world, walls);
        lastW = W;
        lastH = H;
      }

      if (exchangeRef?.current) {
        const blockRect = exchangeRef.current.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const bw = blockRect.width;
        const bh = blockRect.height;

        if (bw > 0 && bh > 0) {
          const bx = blockRect.left - canvasRect.left + bw / 2;
          const by = blockRect.top - canvasRect.top + bh / 2;
          if (!blockBody) {
            blockBody = Bodies.rectangle(bx, by, bw, bh, {
              isStatic: true,
              restitution: 0.4,
              friction: 0,
            });
            Composite.add(engine.world, blockBody);
          } else {
            Matter.Body.setPosition(blockBody, { x: bx, y: by });
          }
        }
      }

      Engine.update(engine, 1000 / 60);
      ctx.clearRect(0, 0, W, H);

      //   if (blockBody) {
      //     const { min, max } = blockBody.bounds;
      //     ctx.strokeStyle = "red";
      //     ctx.lineWidth = 2;
      //     ctx.strokeRect(min.x, min.y, max.x - min.x, max.y - min.y);
      //     ctx.fillStyle = "rgba(255, 0, 0, 0.9)";
      //     ctx.fillRect(min.x, min.y, max.x - min.x, max.y - min.y);
      //   }

      balls.forEach((body) => {
        const { x, y } = body.position;
        const img = images[body.render.imgIndex];
        if (img) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(body.angle);
          ctx.drawImage(img, -RADIUS, -RADIUS, RADIUS * 2, RADIUS * 2);
          ctx.restore();
        }
      });
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      Events.off(engine, "beforeUpdate");
      Matter.Mouse.clearSourceEvents(mouse);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [exchangeRef]);

  useEffect(() => {
    if (!engineRef.current) return;

    // start gravity only once
    if (startFall && !hasStartedFall.current) {
      hasStartedFall.current = true;

      engineRef.current.world.gravity.y = 1.8;

      Matter.Composite.allBodies(engineRef.current.world).forEach((body) => {
        if (body.isStatic) return;

        Matter.Sleeping.set(body, false);

        // START MOVEMENT ONLY AFTER SECTION ENTERS
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 6,
        });

        const forceMagnitude = 0.04 * body.mass;

        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: forceMagnitude * 0.2,
        });
      });
    }
  }, [startFall]);

  useEffect(() => {
    if (engineRef.current && triggerShake) {
      Matter.Composite.allBodies(engineRef.current.world).forEach((body) => {
        if (body.isStatic) return;

        Matter.Sleeping.set(body, false);

        const force = {
          x: (Math.random() - 0.3) * 0.1,
          y: -0.02,
        };

        Matter.Body.applyForce(body, body.position, force);
      });
    }
  }, [triggerShake]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        touchAction: "pan-y",
        // cursor: "grab",
        pointerEvents: "auto",
      }}
    />
  );
}
