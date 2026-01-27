    return () => observer.kill();
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer"; // 👈 Key Plugin

import { cards } from "../Data/constant";

gsap.registerPlugin(ScrollTrigger, Observer);

export default function App() {
  //card-image animation section
  const isAnimating = useRef(false);
  const containerRef = useRef(null);
  const activeCardRef = useRef(null);
  const activeIndexRef = useRef(0);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = cards.length;

  const previousActiveIndexRef = useRef(0);

  useEffect(() => {
    const animDuration = 2.5; // seconds for individual entry/exit tween
    const holdDuration = 1; // seconds, time content stays fully visible before exit starts
    const entryExitScrollDistance = 100; // Scroll distance to play out one animDuration tween
    const timeDuration = 5; //exit dummy
    // --- Card Section Animation ---
    const tlCard = gsap.timeline({
      scrollTrigger: {
        trigger: ".card-container",
        start: "top 30%", // Pin when the top of the container hits the top of the viewport
        end: "+=1500",
        scrub: 1.5,
        // pin: true,
        // markers: true,
      },
    });
    tlCard
      .fromTo(
        ".card-container .card-left",
        { x: "0%", opacity: 0, scale: 0.8 },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          // ease: "power3.out",
          duration: animDuration,
          delay: 1,
        }
        // ">=1"
      )
      .fromTo(
        ".card-container .card-right",
        { x: "-300%", opacity: 0, scale: 0.8 },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: animDuration,
          // delay: 5,
        },
        "<"
      )
      .fromTo(
        ".card-animation",
        { x: "300%", opacity: 0, scale: 0.8 },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: animDuration,
          // delay: 5,
        },
        "<"
      )
      // Dummy tween for 1000px hold scroll
      .to(
        {},
        { duration: 1 / (entryExitScrollDistance / animDuration) },
        `+=${holdDuration}`
      )
      // Exit Animation for Cardano Section
      .to(
        ".card-container .card-left",
        {
          xPercent: 0,
          opacity: 0,
          scale: 0.8,
          ease: "power3.in",
          duration: animDuration,
        },
        "<"
      )
      .to(
        ".card-container .card-left .card-animation",
        {
          xPercent: 300,
          opacity: 0,
          scale: 0.8,
          ease: "power3.in",
          duration: animDuration,
        },
        "<"
      )
      .to(
        ".card-container .card-right",
        {
          xPercent: 300,
          opacity: 0,
          scale: 0.8,
          ease: "power3.in",
          duration: animDuration,
        },
        "<"
      );
    ScrollTrigger.create({
      trigger: ".card-container",
      start: "top top", // pin when coin1 hits top of viewport
      end: `+=${timeDuration * 500}`,
      pin: true,
      // pinSpacing: false,
      // markers: true,
    });
  });

  // Detect Scroll Direction, change card manually
  useEffect(() => {
    const observer = Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      tolerance: 40,
      preventDefault: true,
      onDown: () => {
        const currentIndex = activeIndexRef.current;
        if (!isAnimating.current && currentIndex < totalCards - 1) {
          isAnimating.current = true;
          setActiveIndex((prev) => Math.min(prev + 1, totalCards - 1));
        }
      },
      onUp: () => {
        const currentIndex = activeIndexRef.current;
        if (!isAnimating.current && currentIndex > 0) {
          isAnimating.current = true;
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      },
    });

    return () => observer.kill();
  }, [totalCards]);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);
  // Animate card transitions
  useEffect(() => {
    if (!activeCardRef.current || !contentRef.current) return;

    const oldIndex = previousActiveIndexRef.current;
    const newCard = activeCardRef.current;
    const newContent = contentRef.current;

    gsap.killTweensOf([newCard, newContent]);

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power4.out" },
      onComplete: () => {
        previousActiveIndexRef.current = activeIndex;
        isAnimating.current = false;
      },
    });

    if (oldIndex !== activeIndex) {
      tl.to(
        newCard,
        {
          x: activeIndex > oldIndex ? "0%" : "-500%",
          opacity: 0,
          rotate: activeIndex > oldIndex ? -10 : 10,
          scale: 0.9,
          filter: "blur(5px)",
          zIndex: 4,
          duration: 0.3,
        },
        0
      );

      tl.to(
        newContent,
        {
          opacity: 0,
          x: activeIndex > oldIndex ? 0 : -700,
          duration: 0.3,
        },
        0
      );
    }

    tl.fromTo(
      newCard,
      {
        x: activeIndex > oldIndex ? "-500%" : "500%",
        opacity: 0,
        rotate: activeIndex > oldIndex ? 10 : -10,
        scale: 0.9,
        filter: "blur(5px)",
        zIndex: 5,
      },
      {
        x: "0%",
        rotate: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 5,
      },
      oldIndex !== activeIndex ? 0.2 : 0
    );

    tl.fromTo(
      newContent,
      {
        opacity: 0,
        x: activeIndex > oldIndex ? 700 : -700,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
      oldIndex !== activeIndex ? 0.2 : 0
    );
  }, [activeIndex]);

  const currentCard = cards[activeIndex] ?? null;

  return (
    <div>
      <div className="bg-red-300 h-screen flex justify-center">
        <h1>dummy 1</h1>
      </div>
      <section
        ref={containerRef}
        className="card-container h-screen w-full overflow-hidden bg-black text-white flex justify-center items-center"
      >
        <div className="montserrat w-full flex flex-col padding py-18 justify-center">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-y-2 md:gap-x-10 text-[12px] md:text-[14px] lg:text-[18px]">
            <div className="card-left lg:w-[50%] flex items-center justify-center py-7 sm:py-0 relative h-[50vh] min-h-[300px] max-h-[600px] w-full lg:min-h-[500px] lg:max-h-[700px]">
              <div className="relative flex justify-center items-center">
                {/* card-1 */}
                <div className="backdrop-blur-[3px] translate-x-[-20%] translate-y-[20%] lg:translate-y-[15%]  sm:translate-x-[-25%] md:translate-x-[-20%] lg:translate-x-[-23%] 2xl:translate-y-[15%]  flex flex-col rotate-[-10deg] lg:rotate-[-8deg] 2xl:rotate-[-10deg] w-45 sm:w-55 xl:w-70 2xl:w-110 overflow-hidden border-none bg-white/15 rounded-2xl">
                  <div className="h-45 sm:h-55 xl:h-70 2xl:h-110"></div>
                  <div className="bg-white/10 h-20 xl:h-23 2xl:h-30 p-4"></div>
                </div>
                {/* card-2 */}
                <div className="backdrop-blur-[3px] z-1 absolute top-[8%] sm:top-[10%] translate-x-[10%] translate-y-[2%] lg:translate-x-[5%] lg:translate-y-[-6%] 2xl:translate-x-[-1%] 2xl:translate-y-[-1%] rotate-[-5deg] lg:rotate-[-5deg] 2xl:top-[5%] left-[-10%] 2xl:left-[-8%] sm:rotate-[-5deg] 2xl:rotate-[-5deg] w-45 sm:w-55 xl:w-70 2xl:w-110 overflow-hidden border-none bg-white/15 rounded-2xl ">
                  <div className="h-45 sm:h-55 xl:h-70 2xl:h-110 "></div>
                  <div className="backdrop-blur-sm bg-white/10 h-20 xl:h-23 2xl:h-30 p-4"></div>
                </div>
                {/* Active/Animated Card */}
                <div
                  ref={activeCardRef}
                  className={`card-animation absolute w-45 sm:w-55 xl:w-70 2xl:w-110  overflow-hidden border-none rounded-2xl z-5
                            left-10 lg:-top-10 lg:left-5`}
                >
                  <img
                    className="object-cover rounded-t-2xl w-80 2xl:w-110"
                    src={currentCard.img}
                    alt={currentCard.title}
                  />
                  <div
                    className={`bg-[#FFFFFF] rounded-b-2xl overflow-hidden flex flex-col gap-y-4 2xl:gap-y-6 sm:h-auto p-4 2xl:p-5`}
                  >
                    <h1 className="text-[#000000] text-[18px] sm:text-[22px] md:text-[20px] xl:text-[30px] 2xl:text-[50px] league leading-none">
                      {currentCard.title}
                    </h1>
                    <p className="text-[#727272] text-[12px] md:text-[14px] xl:text-[16px] 2xl:text-[18px]">
                      {currentCard.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active content */}
            <div
              ref={contentRef}
              className="card-right z-2 lg:w-[50%] mt-10 sm:mt-20 lg:mt-0 flex flex-col gap-y-3 lg:gap-y-5 xl:gap-y-7"
            >
              <h1 className="text-[24px] sm:text-[26px] xl:text-[42px] 2xl:text-[60px] league leading-7 md:leading-8 xl:leading-12 2xl:leading-15 tracking-wider">
                {currentCard.p_title}
              </h1>
              <p className="font-light text-[14px] xl:text-[16px] 2xl:text-[18px]">
                {currentCard.p_text}
              </p>
              <div>
                <button className="bg-[#AD62E1] hover:shadow-[0px_4px_12px_rgba(173,98,225,0.9)] py-2 px-4 rounded-3xl font-light text-[14px] xl:text-[16px] 2xl:text-[18px]">
                  {currentCard.p_btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-red-300 h-screen flex justify-center">
        <h1>dummy 2</h1>
      </div>
    </div>
  );
}
