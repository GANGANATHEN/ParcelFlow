"use client";

import { useLenisScroll } from "@/lib/lenis";
import InvadersClub from "./components/LineCode";

export default function Home() {
  useLenisScroll();

  return (
    <div className="no-scrollbar relative">
      <InvadersClub />
    </div>
  );
}
