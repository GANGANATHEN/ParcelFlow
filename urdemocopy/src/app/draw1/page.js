"use client";

import { useLenisScroll } from "@/lib/lenis";
import InvadersClub from "./components/LineCode";
import MapComponent from "./map";

export default function Home() {
  useLenisScroll();

  return (
    <div className="no-scrollbar relative">
      <InvadersClub />
      <MapComponent />
      <div className="h-screen ">h</div>
    </div>
  );
}
