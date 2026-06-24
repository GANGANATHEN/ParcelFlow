"use client";

import { PLAYERS } from "../data/data";

function isBetter(a, b) {
  // Score
  if (a.score !== b.score) {
    return a.score > b.score;
  }

  // Wins
  if (a.wins !== b.wins) {
    return a.wins > b.wins;
  }

  // Kills
  if (a.kills !== b.kills) {
    return a.kills > b.kills;
  }

  // Achieved Time
  const timeA = new Date(a.achievedAt).getTime();
  const timeB = new Date(b.achievedAt).getTime();

  return timeA < timeB;
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(player) {
    this.heap.push(player);

    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (isBetter(this.heap[parentIndex], this.heap[index])) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }


  }

  extractMax() {
    if (this.heap.length === 0) return null;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];

    this.heap[0] = this.heap.pop();
    // console.log(this.heap)
    this.heapifyDown();

    return max;
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      let largest = index;

      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (
        left < this.heap.length &&
        isBetter(this.heap[left], this.heap[largest])
      ) {
        largest = left;
      }

      if (
        right < this.heap.length &&
        isBetter(this.heap[right], this.heap[largest])
      ) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  }
}

export default function Page() {
  const heap = new MaxHeap();

  for (const player of PLAYERS) {
    heap.insert(player);
  }

  const rankedPlayers = [];

  while (heap.heap.length > 0) {
    rankedPlayers.push(heap.extractMax());
  }

  const topThree = rankedPlayers.slice(0, 3);

  const podium = [topThree[1], topThree[0], topThree[2]];

  const podiumConfig = [
    {
      title: "2nd Place",
      border: "border-slate-400",
      cardHeight: "md:mt-10",
    },
    {
      title: "1st Place",
      border: "border-yellow-500",
      cardHeight: "",
    },
    {
      title: "3rd Place",
      border: "border-orange-500",
      cardHeight: "md:mt-16",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-12 text-center text-4xl font-bold md:text-5xl">
          Leaderboard
        </h1>

        {/* Podium */}
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {podium.map((player, index) => (
            <div
              key={player.id}
              className={`
                ${podiumConfig[index].cardHeight}
                rounded-3xl
                border
                ${podiumConfig[index].border}
                bg-slate-900
                p-6
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
              `}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                {podiumConfig[index].title}
              </p>

              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-3xl font-bold">
                {player.name[0].toUpperCase()}
              </div>

              <h2 className="text-2xl font-bold">{player.name}</h2>

              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p>
                  Score:
                  <span className="ml-2 text-green-400">{player.score}</span>
                </p>

                <p>
                  Wins:
                  <span className="ml-2">{player.wins}</span>
                </p>

                <p>
                  Kills:
                  <span className="ml-2">{player.kills}</span>
                </p>

                <p>
                  Achieved:
                  <span className="ml-2">{player.achievedAt}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 md:block">
          <div className="grid grid-cols-6 border-b border-slate-800 bg-slate-950 px-6 py-4 font-semibold text-slate-400">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">Score</span>
            <span className="text-right">Wins</span>
            <span className="text-right">Kills</span>
            <span className="text-right">Achieved</span>
          </div>

          {rankedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="grid grid-cols-6 items-center border-b border-slate-800 px-6 py-4 hover:bg-slate-800/40"
            >
              <span className="font-bold">#{index + 1}</span>

              <span>{player.name}</span>

              <span className="text-right text-green-400">{player.score}</span>

              <span className="text-right">{player.wins}</span>

              <span className="text-right">{player.kills}</span>

              <span className="text-right text-slate-400">
                {player.achievedAt}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {rankedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-bold">#{index + 1}</span>

                <span className="text-lg font-bold">{player.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <p>Score: {player.score}</p>
                <p>Wins: {player.wins}</p>
                <p>Kills: {player.kills}</p>
                <p>{player.achievedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
