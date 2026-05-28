"use client";
import { useEffect, useState, useRef } from "react";

export default function LiveTradingDashboard() {
  // UI
  const [livePrice, setLivePrice] = useState(0);

  // Buffer
  const priceBufferRef = useRef([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // 1. WebSocket Connection Open (Example: Binance BTC/USDT live stream)
    wsRef.current = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade",
    );

    // 2. Data OnMessage Handle Panrom (Millisecond speed-la varum)
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const currentTradePrice = parseFloat(data.p);

      // MUKKIYAM: Inga setState() panna koodathu! Athuku bathila Buffer-la podrom.
      priceBufferRef.current.push(currentTradePrice);
    };

    // 3. Batch & Throttle Update (500ms ku oru thadava matum update aagum)
    const updateInterval = setInterval(() => {
      if (priceBufferRef.current.length > 0) {
        // Buffer-la irukka kadasiaana (latest) price-ah edukurom
        const latestPrice =
          priceBufferRef.current[priceBufferRef.current.length - 1];

        // Ippo thaan React State-ah update panrom (UI change aagum)
        setLivePrice(latestPrice);

        // Update pannathuku apram Buffer-ah clean pannidrom
        priceBufferRef.current = [];
      }
    }, 500); // 500ms = Per second-ku 2 frames thaan render aagum. Zero Lag!

    // Component unmount aagumpothu cleanup panrom
    return () => {
      wsRef.current.close();
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Real-Time BTC/USDT Price</h2>
      {/* Price render aagum */}
      <h1 style={{ color: livePrice > 60000 ? "green" : "red" }}>
        ${livePrice > 0 ? livePrice.toFixed(2) : "Loading..."}
      </h1>
      <p style={{ color: "#666" }}>
        Updates every 500ms natively without lagging the browser.
      </p>
    </div>
  );
}
