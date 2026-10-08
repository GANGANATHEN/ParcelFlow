"use client";

// import SmoothScrollWrapper from "@/lib/lenis";
import { useLenisScroll } from "@/lib/lenis";
import InvadersClub from "./components/LineCode";
import MapComponent from "./map";
import TextArea from "./textArea";

export default function Home() {
  useLenisScroll();
  // SmoothScrollWrapper()

  return (
    <div className="no-scrollbar relative w-full">
      <InvadersClub />
      {/* <MapComponent /> */}
      {/* <TextArea />
      <div className="h-screen ">demi</div> */}
    </div>
  );
}
