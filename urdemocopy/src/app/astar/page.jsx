"use client";

import { useState, useRef } from "react";
import { ROWS, COLS } from "./data";

const directions = [
  [-1, 0], // Up
  [1, 0], // Down
  [0, -1], // Left
  [0, 1], // Right
];

export default function Page() {
  const [tool, setTool] = useState("wall");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [walls, setWalls] = useState(new Set());
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [pathCells, setPathCells] = useState(new Set());
  const timeoutsRef = useRef([]);

  function handleClick(row, col) {
    console.log(getNeighbors(row, col));
    const key = `${row},${col}`;
    const updatedWalls = new Set(walls);

    if (tool === "start") {
      if (end?.row === row && end?.col === col) {
        return;
      }
      if (start?.row === row && start?.col === col) {
        return;
      }
      updatedWalls.delete(key);
      setWalls(updatedWalls);
      setStart({ row, col });
      return;
    }
    if (tool === "end") {
      if (start?.row === row && start?.col === col) {
        return;
      }
      if (end?.row === row && end?.col === col) {
        return;
      }
      updatedWalls.delete(key);
      setWalls(updatedWalls);
      setEnd({ row, col });
      return;
    }
    if (tool === "wall") {
      if (
        (start?.row === row && start?.col === col) ||
        (end?.row === row && end?.col === col)
      ) {
        return;
      }
      if (updatedWalls.has(key)) {
        updatedWalls.delete(key);
      } else {
        updatedWalls.add(key);
      }

      setWalls(updatedWalls);
    }
    if (tool === "eraser") {
      updatedWalls.delete(key);
      setWalls(updatedWalls);
    }
  }

  function getNeighbors(row, col) {
    const neighbors = [];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) {
        continue;
      }

      const key = `${newRow},${newCol}`;

      if (walls.has(key)) {
        continue;
      }

      neighbors.push({
        row: newRow,
        col: newCol,
      });
    }

    return neighbors;
  }

  function heuristic(current, end) {
    return Math.abs(current.row - end.row) + Math.abs(current.col - end.col);
  }

  function aStar() {
    if (!start || !end) return;

    const openList = [
      {
        row: start.row,
        col: start.col,
        g: 0,
        h: heuristic(start, end),
        f: heuristic(start, end),
      },
    ];

    const visitedOrder = [];
    const parent = new Map();

    const gScore = new Map();
    gScore.set(`${start.row},${start.col}`, 0);

    const closedSet = new Set();

    while (openList.length > 0) {
      // Lowest f first
      openList.sort((a, b) => {
        if (a.f !== b.f) return a.f - b.f;
        return a.h - b.h;
      });

      const current = openList.shift();
      const currentKey = `${current.row},${current.col}`;

      // Skip duplicates
      if (closedSet.has(currentKey)) continue;

      closedSet.add(currentKey);
      visitedOrder.push(current);

      // Goal reached
      if (current.row === end.row && current.col === end.col) {
        return {
          visitedOrder,
          parent,
        };
      }

      const neighbors = getNeighbors(current.row, current.col);

      for (const neighbor of neighbors) {
        const key = `${neighbor.row},${neighbor.col}`;

        if (closedSet.has(key)) continue;

        const tentativeG = current.g + 1;

        const oldG = gScore.get(key);

        // Already found a better path
        if (oldG !== undefined && tentativeG >= oldG) {
          continue;
        }

        const h = heuristic(neighbor, end);
        const f = tentativeG + h;

        gScore.set(key, tentativeG);
        parent.set(key, current);

        const existing = openList.find(
          (node) => node.row === neighbor.row && node.col === neighbor.col,
        );
        console.log({
          row: neighbor.row,
          col: neighbor.col,
          g: tentativeG,
          h,
          f,
        });
        if (existing) {
          existing.g = tentativeG;
          existing.h = h;
          existing.f = f;
        } else {
          openList.push({
            row: neighbor.row,
            col: neighbor.col,
            g: tentativeG,
            h,
            f,
          });
        }
      }
    }

    return null;
  }

  function animateVisited(visitedOrder) {
    setVisitedCells(new Set());

    for (let i = 0; i < visitedOrder.length; i++) {
      timeoutsRef.current.push(
        setTimeout(() => {
          const cell = visitedOrder[i];
          const key = `${cell.row},${cell.col}`;

          setVisitedCells((prev) => {
            const updated = new Set(prev);

            updated.add(key);

            return updated;
          });
        }, i * 30),
      );
    }
  }

  function getShortestPath(endNode, parent) {
    const path = [];
    let current = endNode;

    while (current) {
      path.push(current);

      const key = `${current.row},${current.col}`;
      current = parent.get(key);
    }

    return path.reverse();
  }

  function animatePath(path) {
    console.log("start", pathCells);
    setPathCells(new Set());
    console.log("end", path);

    for (let i = 0; i < path.length; i++) {
      timeoutsRef.current.push(
        setTimeout(() => {
          const cell = path[i];
          const key = `${cell.row},${cell.col}`;

          setPathCells((prev) => {
            const updated = new Set(prev);
            updated.add(key);
            return updated;
          });
        }, i * 50),
      );
    }
  }

  function resetGrid() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setStart(null);
    setEnd(null);
    setWalls(new Set());
    setVisitedCells(new Set());
    setPathCells(new Set());
  }

  return (
    <main className="min-h-screen w-full bg-slate-950 px-8 py-8">
      <div className="mx-auto flex max-w-450 gap-8">
        <div className="flex flex-1 flex-col items-center">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-4">
            {/* Tools */}
            <div className="flex flex-wrap gap-3">
              {["wall", "start", "end", "eraser"].map((value) => (
                <button
                  key={value}
                  onClick={() => setTool(value)}
                  className={`
          rounded-xl px-5 py-2 text-sm font-semibold capitalize
          transition-all duration-200 cursor-pointer
          ${
            tool === value
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }
        `}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const result = aStar();
                  animateVisited(result.visitedOrder);
                  // wait until BFS animation completes
                  setTimeout(() => {
                    const path = getShortestPath(end, result.parent);
                    animatePath(path);
                  }, result.visitedOrder.length * 30);
                }}
                className="cursor-pointer rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-emerald-500 active:scale-95"
              >
                Find Path
              </button>

              <button
                onClick={resetGrid}
                className="cursor-pointer rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-red-500 active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 40px)`,
            }}
          >
            {Array.from({ length: ROWS * COLS }).map((_, index) => {
              const row = Math.floor(index / COLS);
              const col = index % COLS;
              const key = `${row},${col}`;

              // for style calc
              const isStart = start?.row === row && start?.col === col;
              const isEnd = end?.row === row && end?.col === col;
              const isWall = walls.has(key);
              const isVisited = visitedCells.has(key);
              const isPath = pathCells.has(key);

              return (
                <div
                  key={index}
                  onClick={() => handleClick(row, col)}
                  className={`h-10 w-10 cursor-pointer flex justify-center items-center text-sm border border-slate-700
              ${isStart ? "bg-green-100 hover:bg-green-200 text-black" : ""}
              ${isEnd ? "bg-red-100 hover:bg-red-200 text-black" : ""}
              ${isWall ? "bg-slate-600 hover:bg-slate-500 font-semibold" : ""}
              ${isPath ? "bg-pink-400" : isVisited ? "bg-blue-500" : ""}`}
                >
                  {row},{col}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-72 shrink-0">
          <div className="sticky top-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
            <h2 className="mb-5 text-xl font-semibold text-white">
              Grid Legend
            </h2>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-green-100"></div>
                <span className="text-slate-300">Start Node</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-red-100"></div>
                <span className="text-slate-300">End Node</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-slate-600"></div>
                <span className="text-slate-300">Wall</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="h-4 w-4 rounded border border-slate-500 bg-slate-950"></div>
                <span className="text-slate-300">Empty Cell</span>
              </li>
            </ul>

            <div className="mt-8 border-t border-slate-700 pt-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Current Tool
              </h3>

              <div className="rounded-lg bg-blue-500 px-4 py-2 text-center font-semibold text-white">
                {tool.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
