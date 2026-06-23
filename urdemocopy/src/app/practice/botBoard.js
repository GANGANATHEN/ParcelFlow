"use client";
import { useEffect, useState } from "react";

export default function BotDashboard() {
  const [history, setHistory] = useState([]);
  const [config, setConfig] = useState({ isActive: false, targetPrice: 0 });

  // UI-la type panra puthu price-ah store panna
  const [newTargetPrice, setNewTargetPrice] = useState("");

  useEffect(() => {
    const fetchBotData = async () => {
      const res = await fetch("/api/bot-update");
      const json = await res.json();
      setHistory(json.history);
      setConfig(json.config);
    };

    const interval = setInterval(fetchBotData, 1000); // 1 sec updates
    return () => clearInterval(interval);
  }, []);

  // FRONTEND TO BACKEND CONTROL FUNCTION
  const updateBotConfig = async (updates) => {
    await fetch("/api/bot-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "UPDATE_CONFIG", data: updates }),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER & CONTROL PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-extrabold bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
               <span className="text-transparent">🤖 HFT Bot Controller</span>
            </h1>

            <div className="flex items-center gap-4 bg-slate-950 p-2 rounded-xl border border-slate-800">
              {/* TARGET PRICE INPUT */}
              <input
                type="number"
                placeholder={`Current Target: $${config.targetPrice}`}
                value={newTargetPrice}
                onChange={(e) => setNewTargetPrice(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition"
              />
              <button
                onClick={() =>
                  updateBotConfig({ targetPrice: parseFloat(newTargetPrice) })
                }
                className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-sm font-bold transition"
              >
                Set Price
              </button>
              <div className="w-px h-8 bg-slate-700"></div> {/* Divider */}
              {/* START/STOP BUTTON */}
              <button
                onClick={() => updateBotConfig({ isActive: !config.isActive })}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                  config.isActive
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50"
                    : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50"
                }`}
              >
                {config.isActive ? "🛑 STOP BOT" : "▶️ START BOT"}
              </button>
            </div>
          </div>
        </div>

        {/* TRADE HISTORY LIST */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            📜 Live Trade History
          </h2>

          <div className="space-y-3">
            {history.length === 0 ? (
              <p className="text-slate-500 text-center py-10">
                No trades yet. Set a target price and start the bot.
              </p>
            ) : (
              history.map((trade, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800/50 hover:border-slate-600 transition"
                >
                  <div className="flex gap-4 items-center">
                    <span className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg text-xl">
                      ✅
                    </span>
                    <div>
                      <p className="font-bold text-cyan-300">{trade.coin}</p>
                      <p className="text-xs text-slate-500">{trade.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">
                      ${trade.buyPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-amber-400 font-mono">
                      ⚡ {trade.speed}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
