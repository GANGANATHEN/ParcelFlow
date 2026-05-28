import { NextResponse } from "next/server";

// Server RAM-la temporary-ah store aagura variables
let tradeHistory = []; // Multiple trades-ah store panna Array
let botConfig = {
  targetPrice: 60000,
  isActive: false, // Default-ah bot pause-la irukkatum
};

export async function GET() {
  // UI and Bot rendume intha data-va thaan ketu vaangum
  return NextResponse.json({ config: botConfig, history: tradeHistory });
}

export async function POST(request) {
  const body = await request.json();

  if (body.type === "NEW_TRADE") {
    // Bot trade pannitu data anuppuna, atha history-la first aడ్ panrom
    tradeHistory.unshift(body.data);
    // Pazhaya history-ah delete panrom (Latest 5 matum vachikalam)
    if (tradeHistory.length > 5) tradeHistory.pop();
  } else if (body.type === "UPDATE_CONFIG") {
    // UI-la irunthu target price or start/stop button amukuna ithu trigger aagum
    botConfig = { ...botConfig, ...body.data };
    console.log("⚙️ Bot Config Updated from UI:", botConfig);
  }

  return NextResponse.json({ success: true });
}
