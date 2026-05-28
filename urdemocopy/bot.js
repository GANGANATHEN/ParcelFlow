const WebSocket = require("ws");

let currentTarget = 0;
let isBotActive = false;
let lastTradeTime = 0; // Cooldown-ku thevai

// 1. UI-la irunthu varra Config-ah check panra function
async function syncWithFrontend() {
  try {
    const res = await fetch("http://localhost:3000/api/bot-update");
    const json = await res.json();
    currentTarget = json.config.targetPrice;
    isBotActive = json.config.isActive;
  } catch (err) {
    // Ignore error if next.js is offline
  }
}

// Every 1 second bot UI command-ku listen pannum
setInterval(syncWithFrontend, 1000);

function startBot() {
  const url = "wss://stream.binance.com:9443/ws/btcusdt@trade";
  console.log("🚀 Binance Engine Connected. Waiting for Frontend Commands...");

  const ws = new WebSocket(url);

  ws.on("message", (data) => {
    // BOT OFF-LA IRUNTHA ITHU VELAI SEYYATHU
    if (!isBotActive) return;

    const receiveTime = performance.now();
    const parsedData = JSON.parse(data);
    const currentPrice = parseFloat(parsedData.p);

    // COOLDOWN LOGIC: 5 Seconds-ku oru thadava thaan trade pannum
    const now = Date.now();
    const isCooldownOver = now - lastTradeTime > 5000;

    // INSTANT LOGIC
    if (currentPrice <= currentTarget && isCooldownOver) {
      lastTradeTime = now; // Reset cooldown
      const decisionTime = performance.now();
      const timeTakenMs = decisionTime - receiveTime;

      console.log(
        `🔥 BOUGHT BTC at $${currentPrice}! Target was $${currentTarget}`,
      );

      // SEND TO NEXT.JS API
      fetch("http://localhost:3000/api/bot-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "NEW_TRADE", // API-ku ithu puthu trade nu solrom
          data: {
            coin: "BTCUSDT",
            buyPrice: currentPrice,
            speed: `${timeTakenMs.toFixed(4)} ms`,
            time: new Date().toLocaleTimeString(),
          },
        }),
      }).catch((err) => console.log("Failed to send history"));
    }
  });
}

startBot();
