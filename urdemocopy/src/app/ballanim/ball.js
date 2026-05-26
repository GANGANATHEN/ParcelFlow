"use client";

import { useEffect, useRef } from "react";

export default function BallsCanvas({ startFall, exchangeRef }) {
  const canvasRef = useRef(null);

  const rafRef = useRef(null);

  const ballsRef = useRef([]);

  const activeBallRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    //    CONFIG
    const BALL_COUNT = 70;

    const GRAVITY = 0.15;

    const AIR = 0.992;

    const FLOOR_FRICTION = 0.82;

    const BOUNCE = 0.8;

    const DRAG_STIFFNESS = 0.22;

    const DRAG_DAMPING = 0.78;

    const MAX_DRAG_SPEED = 32;

    const SUBSTEPS = 2;

    const BALL_SIZE =
      window.innerWidth < 640 ? 34 : window.innerWidth < 1024 ? 48 : 60;

    //    RESIZE
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvas.offsetWidth * dpr;

      canvas.height = canvas.offsetHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* WAKE UP BALLS ON RESIZE TO FIX BOUNDARIES */
      ballsRef.current.forEach((b) => {
        b.sleeping = false;
      });
    };

    resize();

    window.addEventListener("resize", resize);

    // IMAGES
    const imagePaths = [
      "/image/ball-1.svg",
      "/image/ball-2.svg",
      "/image/ball-3.svg",
    ];

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();

        img.src = src;

        img.onload = () => resolve(img);

        img.onerror = () => resolve(null);
      });

    // CREATE BALL
    const createBall = (img, i) => {
      const cols = Math.floor(canvas.offsetWidth / (BALL_SIZE + 8));

      const col = i % cols;

      const row = Math.floor(i / cols);

      return {
        img,

        radius: BALL_SIZE / 2,

        x: col * (BALL_SIZE + 8) + BALL_SIZE / 2 + (Math.random() - 0.5) * 40,

        y: -(row * (BALL_SIZE + 15)) - BALL_SIZE - Math.random() * 200,

        vx: (Math.random() - 0.5) * 4,

        vy: Math.random() * 12,

        rotation: Math.random() * Math.PI * 2,

        angularVelocity: 0,

        sleeping: false,

        dragging: false,

        lastPointerX: 0,

        lastPointerY: 0,

        targetX: 0,

        targetY: 0,
      };
    };

    // POINTER
    const getPointer = (e) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: e.clientX - rect.left,

        y: e.clientY - rect.top,
      };
    };

    //  POINTER DOWN
    const pointerDown = (e) => {
      const { x, y } = getPointer(e);

      const balls = ballsRef.current;

      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];

        const dx = x - b.x;

        const dy = y - b.y;

        if (Math.hypot(dx, dy) < b.radius) {
          activeBallRef.current = b;

          b.dragging = true;

          b.sleeping = false;

          b.lastPointerX = x;

          b.lastPointerY = y;

          b.targetX = b.x;

          b.targetY = b.y;

          b.vx = 0;

          b.vy = 0;

          break;
        }
      }
    };

    //  POINTER MOVE
    const pointerMove = (e) => {
      const ball = activeBallRef.current;

      if (!ball) return;

      const { x, y } = getPointer(e);

      const dx = x - ball.lastPointerX;

      const dy = y - ball.lastPointerY;

      ball.lastPointerX = x;

      ball.lastPointerY = y;

      ball.targetX = Math.max(
        ball.radius,
        Math.min(canvas.offsetWidth - ball.radius, x),
      );

      ball.targetY = Math.max(
        -ball.radius,
        Math.min(canvas.offsetHeight - ball.radius, y),
      );

      ball.vx += dx * 0.22;

      ball.vy += dy * 0.22;

      ball.vx = Math.max(-MAX_DRAG_SPEED, Math.min(MAX_DRAG_SPEED, ball.vx));

      ball.vy = Math.max(-MAX_DRAG_SPEED, Math.min(MAX_DRAG_SPEED, ball.vy));
    };

    //  POINTER UP
    const pointerUp = () => {
      const ball = activeBallRef.current;

      if (!ball) return;

      ball.dragging = false;

      activeBallRef.current = null;
    };

    canvas.addEventListener("pointerdown", pointerDown);

    window.addEventListener("pointermove", pointerMove);

    window.addEventListener("pointerup", pointerUp);

    //  BALL COLLISION
    const solveBallCollision = (a, b) => {
      const dx = b.x - a.x;

      const dy = b.y - a.y;

      const dist = Math.hypot(dx, dy);

      const minDist = a.radius + b.radius;

      if (dist >= minDist || dist === 0) return;

      const nx = dx / dist;

      const ny = dy / dist;

      const overlap = minDist - dist;

      const push = overlap * 0.45;

      a.x -= nx * push;

      a.y -= ny * push;

      b.x += nx * push;

      b.y += ny * push;

      const rvx = b.vx - a.vx;

      const rvy = b.vy - a.vy;

      const velAlongNormal = rvx * nx + rvy * ny;

      if (velAlongNormal > 0) return;

      const currentBounce = Math.abs(velAlongNormal) < 1.0 ? 0 : 0.9;

      const impulse = -(1 + currentBounce) * velAlongNormal * 0.5;

      const ix = impulse * nx;

      const iy = impulse * ny;

      a.vx -= ix;

      a.vy -= iy;

      b.vx += ix;

      b.vy += iy;

      const tx = -ny;

      const ty = nx;

      const tangentVel = rvx * tx + rvy * ty;

      const frictionImpulse = -tangentVel * 0.05;

      a.vx -= tx * frictionImpulse;

      a.vy -= ty * frictionImpulse;

      b.vx += tx * frictionImpulse;

      b.vy += ty * frictionImpulse;

      /* Wake up balls easily if they intersect too much to prevent sinking */
      if (Math.abs(velAlongNormal) > 0.1 || overlap > 0.1) {
        a.sleeping = false;

        b.sleeping = false;
      }
    };

    //  BLOCK COLLISION
    const solveBlockCollision = (b) => {
      if (!exchangeRef?.current) return;

      const blockRect = exchangeRef.current.getBoundingClientRect();

      const canvasRect = canvas.getBoundingClientRect();

      const left = blockRect.left - canvasRect.left;

      const top = blockRect.top - canvasRect.top;

      const right = left + blockRect.width;

      const bottom = top + blockRect.height;

      const expandedLeft = left - b.radius;

      const expandedRight = right + b.radius;

      const expandedTop = top - b.radius;

      const expandedBottom = bottom + b.radius;

      if (
        b.x > expandedLeft &&
        b.x < expandedRight &&
        b.y > expandedTop &&
        b.y < expandedBottom
      ) {
        const fromLeft = Math.abs(b.x - expandedLeft);

        const fromRight = Math.abs(expandedRight - b.x);

        const fromTop = Math.abs(b.y - expandedTop);

        const fromBottom = Math.abs(expandedBottom - b.y);

        const min = Math.min(fromLeft, fromRight, fromTop, fromBottom);

        if (min === fromTop) {
          b.y = expandedTop;

          if (b.vy > 0) {
            if (b.vy < 0.5) {
              b.vy = 0;
            } else {
              b.vy *= -0.8;
            }
          }

          b.vx *= 0.98;

          if (Math.abs(b.vx) < 0.1) {
            b.vx = 0;
          }

          if (b.vx === 0 && b.vy === 0) {
            b.sleeping = true;
          }

          if (Math.abs(b.vx) > 0.15) {
            b.rotation += b.vx * 0.015;
          }
        } else if (min === fromBottom) {
          b.y = expandedBottom;

          if (b.dragging) {
            b.dragging = false;

            activeBallRef.current = null;

            b.vy = 6;
          }

          if (b.vy < 0) {
            b.vy *= -0.45;
          }
        } else if (min === fromLeft) {
          b.x = expandedLeft;

          if (b.dragging) {
            b.dragging = false;

            activeBallRef.current = null;

            b.vy = 6;
          }

          if (b.vx > 0) {
            b.vx *= -0.7;
          }
        } else {
          b.x = expandedRight;

          if (b.dragging) {
            b.dragging = false;

            activeBallRef.current = null;

            b.vy = 6;
          }

          if (b.vx < 0) {
            b.vx *= -0.7;
          }
        }

        b.sleeping = false;
      }
    };

    //  ANIMATE
    const animate = () => {
      const W = canvas.offsetWidth;

      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      const balls = ballsRef.current;

      for (let step = 0; step < SUBSTEPS; step++) {
        /* collisions */
        for (let k = 0; k < 2; k++) {
          for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
              solveBallCollision(balls[i], balls[j]);
            }
          }
        }

        /* update */
        for (const b of balls) {
          /* dragging */
          if (b.dragging) {
            const dx = b.targetX - b.x;

            const dy = b.targetY - b.y;

            b.vx += dx * DRAG_STIFFNESS;

            b.vy += dy * DRAG_STIFFNESS;

            b.vx *= DRAG_DAMPING;

            b.vy *= DRAG_DAMPING;

            b.x += b.vx;

            b.y += b.vy;

            if (b.y < -b.radius) {
              b.y = -b.radius;
            }

            if (b.x <= b.radius) {
              b.x = b.radius;

              b.dragging = false;

              activeBallRef.current = null;
            }

            if (b.x >= W - b.radius) {
              b.x = W - b.radius;

              b.dragging = false;

              activeBallRef.current = null;
            }

            const touchingFloor = b.y >= H - b.radius - 1;

            if (touchingFloor && Math.abs(b.vx) > 0.15) {
              b.rotation += b.vx * 0.015;
            }

            solveBlockCollision(b);

            continue;
          }

          /* physics (Only apply if NOT sleeping) */
          if (!b.sleeping) {
            if (startFall) {
              b.vy += GRAVITY;
            }

            b.vx *= AIR;

            b.vy *= AIR;

            b.x += b.vx;

            b.y += b.vy;
          }

          /* 
             BOUNDARIES - Apply strictly for ALL balls 
             (Sleeping or not) to prevent overflow 
          */

          const touchingFloor = b.y >= H - b.radius - 1;

          if (touchingFloor && Math.abs(b.vx) > 0.15) {
            b.rotation += b.vx * 0.015;
          }

          /* walls */
          if (b.x < b.radius) {
            b.x = b.radius;

            b.vx *= -0.7;
          }

          if (b.x > W - b.radius) {
            b.x = W - b.radius;

            b.vx *= -0.7;
          }

          /* top limit */
          if (b.y < -b.radius) {
            b.y = -b.radius;

            if (b.vy < 0) {
              b.vy *= -0.3;
            }
          }

          /* floor STRICT CLAMP */
          if (b.y >= H - b.radius) {
            b.y = H - b.radius;

            if (Math.abs(b.vy) < 0.5) {
              b.vy = 0;
            } else {
              b.vy *= -BOUNCE;
            }

            b.vx *= FLOOR_FRICTION;

            if (Math.abs(b.vx) < 0.1) {
              b.vx = 0;
            }

            if (b.vx === 0 && b.vy === 0) {
              b.sleeping = true;
            } else {
              b.sleeping = false;
            }
          }

          /* block */
          solveBlockCollision(b);
        }
      }

      /* draw */
      for (const b of balls) {
        ctx.save();

        ctx.translate(b.x, b.y);

        ctx.rotate(b.rotation);

        ctx.drawImage(b.img, -b.radius, -b.radius, b.radius * 2, b.radius * 2);

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // START
    const start = async () => {
      const images = await Promise.all(imagePaths.map(loadImage));

      ballsRef.current = Array.from({ length: BALL_COUNT }, (_, i) =>
        createBall(images[Math.floor(Math.random() * images.length)], i),
      );

      animate();
    };

    start();

    // CLEANUP
    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener("resize", resize);

      canvas.removeEventListener("pointerdown", pointerDown);

      window.removeEventListener("pointermove", pointerMove);

      window.removeEventListener("pointerup", pointerUp);
    };
  }, [startFall, exchangeRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
    />
  );
}
