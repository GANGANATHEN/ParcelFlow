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

    /* ================================================= */
    /* CONFIG                                            */
    /* ================================================= */

    const BALL_COUNT = 40;

    const GRAVITY = 0.75;

    const AIR = 0.992;

    const FLOOR_FRICTION = 0.82;

    const BOUNCE = 0.38;

    const REST_THRESHOLD = 8;

    const DRAG_STIFFNESS = 0.22;

    const DRAG_DAMPING = 0.08;

    const MAX_DRAG_SPEED = 32;

    const SUBSTEPS = 0.7;

    const BALL_SIZE =
      window.innerWidth < 640
        ? 34
        : window.innerWidth < 1024
          ? 48
          : 60;

    /* ================================================= */
    /* RESIZE                                            */
    /* ================================================= */

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    /* ================================================= */
    /* LOAD IMAGES                                       */
    /* ================================================= */

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

    /* ================================================= */
    /* CREATE BALL                                       */
    /* ================================================= */

    const createBall = (img, i) => {
      const cols = Math.floor(canvas.offsetWidth / (BALL_SIZE + 8));

      const col = i % cols;

      const row = Math.floor(i / cols);

      return {
        img,

        radius: BALL_SIZE / 2,

        x:
          col * (BALL_SIZE + 8) +
          BALL_SIZE / 2 +
          Math.random() * 5,

        y: -(row * (BALL_SIZE + 10)) - BALL_SIZE,

        vx: 0,
        vy: 0,

        rotation: 0,

        angularVelocity: 0,

        sleeping: false,

        dragging: false,

        lastPointerX: 0,
        lastPointerY: 0,

        targetX: 0,
        targetY: 0,
      };
    };

    /* ================================================= */
    /* POINTER                                           */
    /* ================================================= */

    const getPointer = (e) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

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

    const pointerMove = (e) => {
      const ball = activeBallRef.current;

      if (!ball) return;

      const { x, y } = getPointer(e);

      const dx = x - ball.lastPointerX;
      const dy = y - ball.lastPointerY;

      ball.lastPointerX = x;
      ball.lastPointerY = y;

      /* target only */

      ball.targetX = x;
      ball.targetY = y;

      /* velocity */

      ball.vx += dx * 0.22;
      ball.vy += dy * 0.22;

      /* clamp */

      ball.vx = Math.max(
        -MAX_DRAG_SPEED,
        Math.min(MAX_DRAG_SPEED, ball.vx),
      );

      ball.vy = Math.max(
        -MAX_DRAG_SPEED,
        Math.min(MAX_DRAG_SPEED, ball.vy),
      );
    };

    const pointerUp = () => {
      const ball = activeBallRef.current;

      if (!ball) return;

      ball.dragging = false;

      activeBallRef.current = null;
    };

    canvas.addEventListener("pointerdown", pointerDown);

    window.addEventListener("pointermove", pointerMove);

    window.addEventListener("pointerup", pointerUp);

    /* ================================================= */
    /* COLLISION                                         */
    /* ================================================= */

    const solveBallCollision = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;

      const dist = Math.hypot(dx, dy);

      const minDist = a.radius + b.radius;

      if (dist >= minDist || dist === 0) return;

      const nx = dx / dist;
      const ny = dy / dist;

      /* ----------------------------------------- */
      /* PUSH APART                                */
      /* ----------------------------------------- */

      const overlap = minDist - dist;

      const push = overlap * 0.5;

      a.x -= nx * push;
      a.y -= ny * push;

      b.x += nx * push;
      b.y += ny * push;

      /* ----------------------------------------- */
      /* RELATIVE VELOCITY                         */
      /* ----------------------------------------- */

      const rvx = b.vx - a.vx;
      const rvy = b.vy - a.vy;

      const velAlongNormal = rvx * nx + rvy * ny;

      if (velAlongNormal > 0) return;

      /* ----------------------------------------- */
      /* IMPULSE                                   */
      /* ----------------------------------------- */

      const impulse =
        -(1 + 0.35) * velAlongNormal * 0.5;

      const ix = impulse * nx;
      const iy = impulse * ny;

      a.vx -= ix;
      a.vy -= iy;

      b.vx += ix;
      b.vy += iy;

      a.sleeping = false;
      b.sleeping = false;
    };

    /* ================================================= */
    /* BLOCK COLLISION                                  */
    /* ================================================= */

    const solveBlockCollision = (b) => {
      if (!exchangeRef?.current) return;

      const blockRect =
        exchangeRef.current.getBoundingClientRect();

      const canvasRect =
        canvas.getBoundingClientRect();

      const bx = blockRect.left - canvasRect.left;
      const by = blockRect.top - canvasRect.top;

      const bw = blockRect.width;
      const bh = blockRect.height;

      const nearestX = Math.max(
        bx,
        Math.min(b.x, bx + bw),
      );

      const nearestY = Math.max(
        by,
        Math.min(b.y, by + bh),
      );

      const dx = b.x - nearestX;
      const dy = b.y - nearestY;

      const dist = Math.hypot(dx, dy);

      if (dist < b.radius) {
        const nx = dx / (dist || 1);
        const ny = dy / (dist || 1);

        const overlap = b.radius - dist;

        /* -------------------------------- */
        /* IMPORTANT                        */
        /* instantly release while dragging */
        /* -------------------------------- */

        if (b.dragging) {
          b.dragging = false;

          activeBallRef.current = null;
        }

        b.x += nx * overlap;
        b.y += ny * overlap;

        const dot = b.vx * nx + b.vy * ny;

        b.vx -= 2 * dot * nx;
        b.vy -= 2 * dot * ny;

        b.vx *= 0.7;
        b.vy *= 0.7;
      }
    };

    /* ================================================= */
    /* ANIMATE                                           */
    /* ================================================= */

    const animate = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      const balls = ballsRef.current;

      /* ============================================= */
      /* SUBSTEPS                                      */
      /* ============================================= */

      for (let step = 0; step < SUBSTEPS; step++) {
        /* ----------------------------------------- */
        /* BALL COLLISION                            */
        /* ----------------------------------------- */

        for (let k = 0; k < 2; k++) {
          for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
              solveBallCollision(
                balls[i],
                balls[j],
              );
            }
          }
        }

        /* ----------------------------------------- */
        /* UPDATE                                    */
        /* ----------------------------------------- */

        for (const b of balls) {
          if (b.sleeping && !b.dragging) continue;

          /* ===================================== */
          /* DRAGGING                              */
          /* ===================================== */

          if (b.dragging) {
            const dx = b.targetX - b.x;
            const dy = b.targetY - b.y;

            b.vx += dx * DRAG_STIFFNESS;
            b.vy += dy * DRAG_STIFFNESS;

            b.vx *= DRAG_DAMPING;
            b.vy *= DRAG_DAMPING;

            b.x += b.vx;
            b.y += b.vy;

            /* real rolling */

            b.angularVelocity =
              b.vx * 0.035;

            b.rotation += b.angularVelocity;

            solveBlockCollision(b);

            continue;
          }

          /* ===================================== */
          /* PHYSICS                               */
          /* ===================================== */

          if (startFall) {
            b.vy += GRAVITY;
          }

          b.vx *= AIR;
          b.vy *= AIR;

          b.x += b.vx;
          b.y += b.vy;

          /* ===================================== */
          /* REAL ROLL                             */
          /* ===================================== */

          if (Math.abs(b.vx) > 0.01) {
            b.angularVelocity =
              b.vx * 0.03;
          } else {
            b.angularVelocity *= 0.9;
          }

          b.rotation += b.angularVelocity;

          /* ===================================== */
          /* WALLS                                 */
          /* ===================================== */

          if (b.x < b.radius) {
            b.x = b.radius;
            b.vx *= -0.7;
          }

          if (b.x > W - b.radius) {
            b.x = W - b.radius;
            b.vx *= -0.7;
          }

          /* ===================================== */
          /* FLOOR                                 */
          /* ===================================== */

          if (b.y > H - b.radius) {
            b.y = H - b.radius;

            if (Math.abs(b.vy) < 0.35) {
              b.vy = 0;
            } else {
              b.vy *= -BOUNCE;
            }

            b.vx *= FLOOR_FRICTION;

            if (Math.abs(b.vx) < 0.03) {
              b.vx = 0;
            }

            if (
              Math.abs(b.vx) <
                REST_THRESHOLD &&
              Math.abs(b.vy) <
                REST_THRESHOLD
            ) {
              b.vx = 0;
              b.vy = 0;

              b.angularVelocity = 0;

              b.sleeping = true;
            }
          }

          /* ===================================== */
          /* BLOCK                                 */
          /* ===================================== */

          solveBlockCollision(b);
        }
      }

      /* ============================================= */
      /* DRAW                                           */
      /* ============================================= */

      for (const b of balls) {
        ctx.save();

        ctx.translate(b.x, b.y);

        ctx.rotate(b.rotation);

        ctx.drawImage(
          b.img,
          -b.radius,
          -b.radius,
          b.radius * 2,
          b.radius * 2,
        );

        ctx.restore();
      }

      rafRef.current =
        requestAnimationFrame(animate);
    };

    /* ================================================= */
    /* START                                             */
    /* ================================================= */

    const start = async () => {
      const images = await Promise.all(
        imagePaths.map(loadImage),
      );

      ballsRef.current = Array.from(
        { length: BALL_COUNT },
        (_, i) =>
          createBall(
            images[
              Math.floor(
                Math.random() * images.length,
              )
            ],
            i,
          ),
      );

      animate();
    };

    start();

    /* ================================================= */
    /* CLEANUP                                           */
    /* ================================================= */

    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener(
        "resize",
        resize,
      );

      canvas.removeEventListener(
        "pointerdown",
        pointerDown,
      );

      window.removeEventListener(
        "pointermove",
        pointerMove,
      );

      window.removeEventListener(
        "pointerup",
        pointerUp,
      );
    };
  }, [startFall, exchangeRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
    />
  );
}