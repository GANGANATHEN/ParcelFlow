"use client";

import { useLenisScroll } from "@/lib/lenis";
import InvadersClub from "./components/LineCode";
import MapComponent from "./map";
import TextArea from "./textArea";

export default function Home() {
  useLenisScroll();

  return (
    <div className="no-scrollbar relative">
      <InvadersClub />
      {/* <MapComponent /> */}
      <TextArea />
      <div className="h-screen ">demi</div>
    </div>
  );
}
