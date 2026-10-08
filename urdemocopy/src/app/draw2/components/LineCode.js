"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { GSDevTools } from "gsap/GSDevTools"; // Import the plugin
import useLineAnimation from "@/hooks/useLineAnimation1 original";
import {
  buttonShape,
  childline,
  childline3,
  circleShape,
  smallButtonShape,
  starShape,
  wings,
  heartShape,
  squareShape,
  shieldShape,
  impellerShape,
  bShape,
  arrowShape,
  mShape,
  diamond,
  childline2,
  icons,
  radii,
} from "./pathData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    DrawSVGPlugin,
    MotionPathPlugin,
    MorphSVGPlugin,
    GSDevTools,
  );
}

const invadersData = [
  {
    id: 0,
    content:
      "Up to 50% cashback | Level up by making exchanges and completing tasks",
  },
  {
    id: 1,
    content:
      "Customizable NFTs | Find your invader's unique style using scenes, skins and exclusive accessories from the store",
  },
  {
    id: 2,
    content:
      "Personal Account | Track your exchange history, request payments any time. Support 24/7",
  },
];

const levels = [
  { id: 0, label: "1 LEVEL" },
  { id: 1, label: "2 LEVEL" },
  { id: 2, label: "3 LEVEL" },
  { id: 3, label: "4 LEVEL" },
  { id: 4, label: "5 LEVEL" },
  { id: 5, label: "6 LEVEL" },
];

const costData = [
  { id: 0, cost: 100 },
  { id: 1, cost: 500 },
  { id: 2, cost: 1000 },
  { id: 3, cost: 5000 },
  { id: 4, cost: 10000 },
  { id: 5, cost: 30000 },
];

const CaseBackData = [
  { id: 0, caseback: "15%" },
  { id: 1, caseback: "20%" },
  { id: 2, caseback: "25%" },
  { id: 3, caseback: "30%" },
  { id: 4, caseback: "40%" },
  { id: 5, caseback: "50%" },
];

const InvadersClub = () => {
  const [ApplyStyle, setApplyStyle] = useState(false);
  const [ContentId, setContentId] = useState(0);

  // draw line-animation ref
  const refs = useRef({
    buttons: [],
    btnWraps: [],
    bg: [],
  });

  const smallSectionRef = useRef(null);
  const smallRef1 = useRef(null);
  const smallRef2 = useRef(null);
  const smallRef3 = useRef(null);
  const smallArrow1Ref = useRef(null);
  const smallArrow2Ref = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });
    el.addEventListener("mouseleave", () => (isDown = false));
    el.addEventListener("mouseup", () => (isDown = false));
    el.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      el.scrollLeft = scrollLeft - walk;
    });
  }, []);

  // draw-line-animation funtionality using gsap
  const faqData = [
    {
      id: "item-1",
      question: "Is there a way to predict Bitcoin future price?",
      answer:
        "Cryptocurrency prices are famously volatile, so trying to forecast them is a very daunting task. However, if you like to read what the experts have to say about the future of crypto, you may find this page interesting:",
      linkText: "BTC price prediction",
    },
    {
      id: "item-2",
      question: "How does Bitcoin mining work?",
      answer:
        "Bitcoin mining is the process by which new bitcoins are entered into circulation. It is also the way the network confirms new transactions and is a critical component of the blockchain.",
      linkText: "Learn about mining",
    },
    {
      id: "item-3",
      question: "Is Bitcoin legal?",
      answer:
        "The legality of Bitcoin depends on your country. Some nations allow its use, while others have restricted or banned it. Always check local regulations before investing.",
      linkText: "View legal map",
    },
    {
      id: "item-4",
      question: "What is a crypto wallet?",
      answer:
        "A crypto wallet is a device or application that stores your private keys and allows you to access your digital assets on the blockchain.",
      linkText: "Wallet guide",
    },
  ];

  //smallest length draw-line animation
  useGSAP(
    () => {
      // SVG1
      const tl1 = gsap.timeline();

      tl1.fromTo(
        smallRef1.current,
        {
          drawSVG: "100% 100%",
        },
        {
          drawSVG: "100% 0%",
          duration: 1,
          ease: "none",
        },
      );

      tl1.fromTo(
        smallArrow1Ref.current,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          duration: 0.3,
          ease: "none",
        },
      );

      // SVG2
      const tl2 = gsap.timeline();

      tl2.fromTo(
        smallRef2.current,
        {
          drawSVG: "100% 100%",
        },
        {
          drawSVG: "100% 0%",
          duration: 1,
          ease: "none",
        },
      );

      tl2.fromTo(
        smallArrow2Ref.current,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          duration: 0.3,
          ease: "none",
        },
      );

      // Master timeline controlled by scroll
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: smallSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 0.5,
          fastScrollEnd: true,
        },
      });

      // SVG1 & SVG2 start
      master.add(tl1, 0);
      master.add(tl2, 0);

      // SVG3
      master.fromTo(
        smallRef3.current,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "-100% 0%",
          duration: 1,
          ease: "none",
        },
        0,
      );
    },
    { scope: smallSectionRef },
  );

  // large line animation -------------------------------------------
  const strokeData = {
    strokeWidth: 1.5,
    strokeColor: "#D3ED05",
  };

  useLineAnimation({ refs });

  // stage-3 table content
  const leftCell =
    "w-20 lg:w-24 xl:w-26 h-24 lg:h-24 xl:h-30 flex items-center justify-center rounded-[12px] border border-[#d3ed05] bg-[#4e5800] text-[#d3ed05] text-xs px-3 text-center font-archivo font-medium";

  const itemCell =
    "w-20 lg:w-24 xl:w-26 h-24 lg:h-24 xl:h-30 flex items-center justify-center text-sm text-white font-archivo font-medium rounded-[12px] border border-[#d3ed05] bg-[#4e5800]";

  const rowClass = "grid grid-flow-col auto-cols-max gap-4";

  function renderRow(labelContent, data, renderContent, extraItemClass = "") {
    return (
      <div className={rowClass}>
        <div className={leftCell}>{labelContent}</div>

        {data.map((item) => (
          <div key={item.id} className={`${itemCell} ${extraItemClass}`}>
            {renderContent(item)}
          </div>
        ))}
      </div>
    );
  }

  // line animation -------------------------------------------

  // useEffect(() => {
  //   gsap.to(".img-3", { rotate: -360, duration: 10, ease: "linear" });
  // }, []);

  const handleMouseStyle = (id) => {
    setContentId(id);
    setApplyStyle(true);
  };

  const handleStyleLeave = () => {
    setApplyStyle(false);
  };

  return (
    <section className="w-full overflow-hidden 3xl:px-60! relative z-10 max-[425px]:px-4 max-md:pb-[30px]! min-[425px]:px-5 min-[500px]:px-6 md:pb-10 sm:px-7 md:px-9 lg:px-12 xl:px-16 2xl:px-35  h-auto  2xl:pt-33! max-sm:pt-16 sm:pt-20 lg:pt-25 ">
      <div className="font-archivo font-normal text-[#e6e6e6] flex gap-1">
        <Link href="/" className="text-[14px]">
          Main
        </Link>
        <span className="text-[14px]">&gt;</span>
        <Link href="/invaders-club" className="text-[14px]">
          Invaders Club
        </Link>
        <Link href="/demo">demo</Link>
      </div>

      {/* section-1  */}
      <section
        ref={smallSectionRef}
        className="w-full grid md:grid-cols-2 grid-cols-1 lg:gap-12 gap-5 sm:gap-6 md:gap-7 pt-[30px] md:pb-[50px] "
      >
        <div className="w-full">
          <h1
            className="text-white max-xs:text-[20px] xs:text-[22px] sm:text-[24px] md:text-[26px] 
          lg:text-[28px] xl:text-[30px] 2xl:text-[32px] 3xl:text-[42px] font-normal mb-2 font-gothic"
          >
            Welcome to SwapSpace Invaders Club!
          </h1>
          <p className="text-[#fff] font-archivo md:mb-5 font-medium text-[16px] max-xs:text-[14px]">
            SwapSpace offers an enticing loyalty program based on NFTs: using
            Invader NFT during exchanges, you can easily receive cashback up to
            50% of the RevShare
          </p>

          <div className="flex flex-col gap-3.5 xs:gap-5 max-md:mt-[35px]">
            {invadersData.map((item) => (
              <p
                onMouseEnter={() => handleMouseStyle(item.id)}
                onMouseLeave={handleStyleLeave}
                key={item.id}
                className={`${
                  ContentId === item.id && ApplyStyle === true
                    ? "border-[#d3ed05]"
                    : "border-[#1c1c1c]"
                }  transition-all duration-300 linear font-archivo text-white text-[14px] xs:text-base bg-[#1C1C1C] border max-md:border-[1.5px] rounded-[12px] md:rounded-[14px] p-2.5 sm:px-3  sm:py-4 md:px-7`}
              >
                {item.content}
              </p>
            ))}
          </div>

          {/* supScript content with draw-line animation */}

          <div className="flex flex-col gap-5 md:gap-8 max-md:hidden">
            <div className="flex gap-[140px] mt-12">
              {["Stage 1", "Stage 2", "Stage 3"].map((items, index) => (
                <p
                  key={index}
                  className="max-xs:text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] font-medium text-white font-archivo"
                >
                  {items}
                </p>
              ))}
            </div>

            <div>
              <div className="flex gap-53">
                <p className="font-archivo font-normal text-white text-xl">
                  Genesis NFT airdrop <sup>1</sup>
                </p>

                <p className="font-archivo font-normal text-white text-xl">
                  Metaverse of loyalty <sup>3</sup>
                </p>
              </div>

              <div className="flex ml-19 items-center max-md:hidden">
                <p>
                  <svg
                    id="small-1"
                    width="92"
                    height="45"
                    viewBox="0 0 92 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={smallRef1}
                      transform="scale(-1,1) translate(-WIDTH 0)"
                      d="M89.5 28.4298C81.8743 22.4404 59.8505 12.5062 24.0326 14.7925C-22.9674 17.7925 12.0326 39.2925 29.5326 43.2925C47.0326 47.2925 62.0326 30.7925 40.0326 0.29248"
                      stroke="#D3ED05"
                      strokeWidth="2.5"
                    />
                    <path
                      ref={smallArrow1Ref}
                      d="M89.5 28.4298C89.8794 28.7278 90.2232 29.016 90.5312 29.2925M85.0312 14.7925L90.5312 29.2925L76.5312 32.2925"
                      stroke="#D3ED05"
                      strokeWidth="2.5"
                    />
                  </svg>
                </p>
                <p className="font-archivo font-normal text-white text-xl">
                  Reveal & customize <sup>2</sup>
                </p>

                <p>
                  <svg
                    id="small-2"
                    width="105"
                    height="46"
                    viewBox="0 0 105 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={smallRef2}
                      transform="scale(-1,1) translate(-WIDTH 0)"
                      d="M102.755 2.82559C82.2466 19.659 39.4929 50.5684 26.0742 44.6484C9.07422 37.1484 9.07422 8.15093 19.5742 2.15093C27.9742 -2.64907 38.7409 4.15093 43.0742 8.15093C46.4076 19.9843 42.4742 42.0509 0.0742188 35.6509"
                      stroke="#D3ED05"
                      strokeWidth="2.5"
                    />
                    <path
                      ref={smallArrow2Ref}
                      d="M102.755 2.8256C103.032 2.5981 103.305 2.37317 103.574 2.15094M83.0742 2.15094H103.574V35.6509"
                      stroke="#D3ED05"
                      strokeWidth="2.5"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-col">
          <div className="md:size-[400px] w-full text-center">
            <img
              className="size-full object-over float-img"
              src="../assets/transak/banner-12.png"
              alt=""
            />
          </div>

          <button className="bg-[#D3ED05] w-[185px] h-10 sm:w-[190px] md:w-[380px] xs:h-[50px] rounded-[12px] xl:rounded-[20px] text-black border-0 md:mb-3 font-archivo font-medium text-[14px] xs:text-[16px] md:text-[18px] cursor-pointer max-md:mt-3">
            GET AN INVADER
          </button>
          <p className="text-center text-[#D3ED05] text-[14px] xs:text-[16px] md:text-[18px] font-archivo font-normal mt-3.5">
            Already have an Invaders Club account
          </p>

          <p className="w-full flex justify-center mt-10 max-md:hidden">
            <svg
              id="small-3"
              width="49"
              height="86"
              viewBox="0 0 49 86"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={smallRef3}
                d="M47.8463 40.9544C37.013 51.621 17.3463 74.8544 25.3463 82.4544C35.3463 91.9544 47.3486 48.9544 45.8486 40.9544C44.3486 32.9544 41.3486 -6.04563 2.34857 2.45437C-1.31809 9.12062 2.14857 26.1531 45.3486 40.9531"
                stroke="#D3ED05"
                strokeWidth="2.5"
              />
            </svg>
          </p>
        </div>
      </section>

      {/* draw-line animation container */}
      <section className="relative" ref={(el) => (refs.current.scope = el)}>
        {/* draw-line svg path */}
        <svg
          id="wrap"
          viewBox="0 0 1432 2455"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
          className="w-full absolute top-0 left-0"
        >
          {/* wings line */}
          <g transform="translate(1125, 15)">
            <path
              ref={(el) => (refs.current.wings = el)}
              d={wings}
              stroke={strokeData.strokeColor}
            />
          </g>

          {/* main line */}
          <path
            ref={(el) => (refs.current.path = el)}
            d={childline}
            stroke={strokeData.strokeColor}
          />

          {/* icons to fall in along the path */}
          <circle id="anchor1" cx="165" cy="1085" />
          <circle id="anchor2" cx="210" cy="1085" />
          <circle id="anchor3" cx="185" cy="1045" />
          <circle id="anchor4" cx="320" cy="1110" />
          <circle id="anchor5" cx="340" cy="1430" />
          <circle id="anchor6" cx="370" cy="1590" />
          <circle id="anchor7" cx="180" cy="1570" />
          <circle id="anchor8" cx="290" cy="1550" />
          <circle id="anchor9" cx="196" cy="2363" />
          <circle id="anchor10" cx="125" cy="2365" />
          <circle id="anchor11" cx="63" cy="2365" />
          <circle id="anchor12" cx="273" cy="2460" />
          <circle id="anchorMergePath" cx="280" cy="1695" />
        </svg>

        {/* content-1 */}
        <main
          className="w-full flex justify-start min-h-[400px] xl:min-h-[500px] 2xl:min-h-[700px]"
          ref={(el) => (refs.current.stage1 = el)}
        >
          {/* content */}
          <div
            className="flex flex-col ml-28 xl:mt-12 2xl:mt-25 gap-3 xl:gap-5 w-1/2"
            ref={(el) => (refs.current.content1 = el)}
          >
            <h6 className="text-[#C5DE05] heading_font-size">Stage 1</h6>
            <h2 className="text-white subheading_font-size">
              Welcome to SwapSpace Invaders Club!
            </h2>

            <div className="flex flex-col para_font-size max-xs:gap-3 gap-3 xl:gap-5">
              <p className="text-white">
                We started with deploying a Polygon ERC-721 contract and issued
                genesis tokens. These were limited to 3999, they have a special
                trait animated laser eyes. There were 3 ways to get them.
              </p>
              <p className="text-white">
                After all 3999 genesis tokens are distributed the exchange
                minting will continue, but those tokens won&apos;t have any
                special traits, points and benefits from the beginning.
              </p>
            </div>
          </div>

          {/* button-svg */}
          {/* BTN 1 */}
          <div
            ref={(el) => (refs.current.btnWraps[0] = el)}
            className="btn-1 absolute top-0 left-0 flex gap-10 opacity-0"
          >
            <div
              ref={(el) => (refs.current.buttons[0] = el)}
              className="relative w-28 h-8 xl:w-32 xl:h-8 2xl:w-36 2xl:h-10"
            >
              <svg viewBox="0 0 144 40" className="w-full h-full rotate-10">
                {/* BUTTON SHAPE */}
                <path id="btnShape1" fill="#d3ed05" d={buttonShape} />

                <text
                  id="btnText1"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  btn-1
                </text>
                {/* STAR SHAPE (MORPH TARGET) */}
                <path
                  id="starShape"
                  fill="url(#starGradient)"
                  d={starShape}
                  style={{ visibility: "hidden" }}
                />
                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="starGradient"
                    x1="15%"
                    y1="5%"
                    x2="85%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="58%" stopColor="#7dff6a" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#7a5cff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              ref={(el) => (refs.current.buttons[1] = el)}
              className="relative w-[40px] h-8 xl:w-[48px] xl:h-8 2xl:w-[54px] 2xl:h-10"
            >
              <svg
                viewBox="0 0 54 40"
                className="w-full h-full rotate-9 absolute -right-16"
              >
                {/* BUTTON SHAPE */}
                <path id="btnShape2" fill="#d3ed05" d={smallButtonShape} />
                {/* TEXT */}
                <text
                  id="btnText2"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="14"
                  fill="black"
                >
                  11
                </text>
                {/* TARGET SHAPE (SQUARE) */}
                <path
                  id="squareShape"
                  d={squareShape}
                  fill="url(#squareGradient)"
                  style={{ visibility: "hidden" }}
                />
                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="squareGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ff00cc" />
                    <stop offset="50%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#00ff88" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* BTN 2 */}
          <div
            ref={(el) => (refs.current.btnWraps[1] = el)}
            className="btn-1 absolute top-0 left-0 flex gap-10 opacity-0"
          >
            <div
              ref={(el) => (refs.current.buttons[2] = el)}
              className="relative w-28 h-8 xl:w-32 xl:h-8 2xl:w-36 2xl:h-10"
            >
              <svg viewBox="0 0 144 40" className="w-full h-full -rotate-10">
                {/* BUTTON SHAPE */}
                <path id="btnShape3" fill="#d3ed05" d={buttonShape} />

                <text
                  id="btnText3"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  btn-2
                </text>

                {/* STAR SHAPE (MORPH TARGET) */}
                <path
                  id="shieldShape"
                  fill="url(#starGradient)"
                  d={shieldShape}
                  style={{ visibility: "hidden" }}
                />

                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="shieldGradient"
                    x1="15%"
                    y1="5%"
                    x2="85%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="58%" stopColor="#7dff6a" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#7a5cff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              ref={(el) => (refs.current.buttons[3] = el)}
              className="relative w-[40px] h-8 xl:w-[48px] xl:h-8 2xl:w-[54px] 2xl:h-10"
            >
              <svg
                viewBox="0 0 54 40"
                className="w-full h-full -rotate-25 absolute -left-6 overflow-visible"
              >
                {/* BUTTON SHAPE */}
                <path id="btnShape4" fill="#d3ed05" d={smallButtonShape} />

                {/* TEXT */}
                <text
                  id="btnText4"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="14"
                  fill="black"
                >
                  22
                </text>

                {/* TARGET SHAPE (impeller) */}
                <path
                  id="impellerShape"
                  d={impellerShape}
                  fill="url(#diamondGradient)"
                  style={{ visibility: "hidden" }}
                />

                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="impellerGradient"
                    x1="15%"
                    y1="15%"
                    x2="85%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="58%" stopColor="#7dff6a" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#7a5cff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* BTN 3 */}
          <div
            ref={(el) => (refs.current.btnWraps[2] = el)}
            className="btn-1 absolute top-0 left-0 flex gap-10 opacity-0"
          >
            <div
              ref={(el) => (refs.current.buttons[4] = el)}
              className="relative w-28 h-8 xl:w-32 xl:h-8 2xl:w-36 2xl:h-10"
            >
              <svg viewBox="0 0 144 40" className="w-full h-full rotate-15">
                {/* BUTTON SHAPE */}
                <path id="btnShape5" fill="#d3ed05" d={buttonShape} />

                <text
                  id="btnText5"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  btn-3
                </text>

                {/* M SHAPE */}
                <path
                  id="arrowShape"
                  fill="url(#arrowGradient)"
                  d={mShape}
                  style={{ visibility: "hidden" }}
                />

                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="arrowGradient"
                    x1="24"
                    y1="2"
                    x2="4"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FFD93A" />
                    <stop offset="22%" stopColor="#DFFF4F" />
                    <stop offset="45%" stopColor="#8DFF8A" />
                    <stop offset="68%" stopColor="#39F0D8" />
                    <stop offset="86%" stopColor="#29CFFF" />
                    <stop offset="100%" stopColor="#24A8FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              ref={(el) => (refs.current.buttons[5] = el)}
              className="relative w-[40px] h-8 xl:w-[48px] xl:h-8 2xl:w-[54px] 2xl:h-10"
            >
              <svg
                viewBox="0 0 54 40"
                className="w-full h-full rotate-19 absolute -right-16"
              >
                {/* BUTTON SHAPE */}
                <path id="btnShape6" fill="#d3ed05" d={smallButtonShape} />

                {/* TEXT */}
                <text
                  id="btnText6"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="14"
                  fill="black"
                >
                  33
                </text>

                {/* TARGET SHAPE (B) */}
                <path
                  id="bShape"
                  d={bShape}
                  fill="url(#bGradient)"
                  style={{ visibility: "hidden" }}
                />

                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="bGradient"
                    x1="14"
                    y1="2"
                    x2="14"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FFD93A" />
                    <stop offset="22%" stopColor="#DFFF4F" />
                    <stop offset="45%" stopColor="#8DFF8A" />
                    <stop offset="68%" stopColor="#39F0D8" />
                    <stop offset="86%" stopColor="#29CFFF" />
                    <stop offset="100%" stopColor="#24A8FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* reveal svg */}
          {icons.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="absolute top-0 left-0 pointer-events-none 
              w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5.5 2xl:h-5.5 opacity-0"
            >
              <svg
                viewBox={item.viewBox}
                style={{ overflow: "visible" }}
                className="w-full h-full"
              >
                {/* main shape */}
                <path id={item.shapeId} d={item.shape} fill={item.color} />

                {/* circle morph target */}
                <path id={item.circleId} d={circleShape} fill="#F0E49A" />

                {/* blast particles */}
                <g className="blast hidden">
                  {radii.map((r, i) => (
                    <circle
                      key={i}
                      className="piece"
                      cx="12"
                      cy="12"
                      r={r}
                      fill="#F0E49A"
                    />
                  ))}
                </g>

                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="starGradient1"
                    x1="14%"
                    y1="15%"
                    x2="15%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#2c5cdf" />
                  </linearGradient>
                  <linearGradient
                    id="squareGradient1"
                    x1="25%"
                    y1="12%"
                    x2="96%"
                    y2="88%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#F8F3E7" />
                    <stop offset="16%" stopColor="#E8D5B0" />
                    <stop offset="22%" stopColor="#6FD8FF" />
                    <stop offset="38%" stopColor="#57AFFF" />
                    <stop offset="64%" stopColor="#FFD84E" />
                    <stop offset="85%" stopColor="#FF63D4" />
                  </linearGradient>
                  <linearGradient
                    id="shieldGradient1"
                    x1="15%"
                    y1="5%"
                    x2="85%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="58%" stopColor="#7dff6a" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#7a5cff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}

          {/* impellerShape */}
          <div
            id="iconStar4"
            className="absolute top-0 left-0 pointer-events-none z-10 opacity-0"
          >
            <svg
              viewBox="0 0 30 30"
              width="25"
              height="25"
              style={{ overflow: "visible" }}
            >
              <path
                id="shape4"
                d={impellerShape}
                fill="url(#IMGradient1)"
                vectorEffect="non-scaling-stroke"
              />

              <defs>
                <path id="arrowShape1" d={arrowShape} />
                <path id="circleShape1" d={circleShape} />

                <linearGradient
                  id="arrowGradient1"
                  x1="72%"
                  y1="78%"
                  x2="38%"
                  y2="3%"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="#ff58d6" />
                  <stop offset="22%" stopColor="#ff8ac7" />
                  <stop offset="38%" stopColor="#ffd85e" />
                  <stop offset="56%" stopColor="#92ff5f" />
                  <stop offset="74%" stopColor="#33f0d7" />
                  <stop offset="90%" stopColor="#2ab7ff" />
                  <stop offset="100%" stopColor="#6a6dff" />
                </linearGradient>

                <defs>
                  <linearGradient
                    id="IMGradient1"
                    x1="15%"
                    y1="15%"
                    x2="85%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="58%" stopColor="#7dff6a" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#7a5cff" />
                  </linearGradient>
                </defs>
              </defs>
            </svg>
          </div>

          {/* split particles independent absolute */}
          {["splitC1", "splitC2", "splitC3", "splitC4"].map((id, i) => (
            <div
              key={id}
              id={id}
              className={`absolute top-0 left-0 pointer-events-none opacity-0 ${
                i === 3 ? "z-10" : "-z-10"
              }`}
            >
              <svg className="splitSvg" style={{ overflow: "visible" }}>
                {/* ---------- FIRST 3 = PATH BASED MORPHABLE ---------- */}
                {i !== 3 && (
                  <>
                    {/* source circle path */}
                    <path
                      id={`splitBase${i + 1}`}
                      // fill="url(#HGradient)"
                      d={circleShape}
                      fill="#FFFFFF"
                    />

                    {/* hidden morph target */}
                    {i === 0 && (
                      <path
                        id="splitMorph1"
                        d={heartShape}
                        fill="#FFFFFF"
                        visibility="hidden"
                      />
                    )}

                    {i === 1 && (
                      <path
                        id="splitMorph2"
                        d={squareShape}
                        fill="#FFFFFF"
                        visibility="hidden"
                      />
                    )}

                    {i === 2 && (
                      <path
                        id="splitMorph3"
                        d={starShape}
                        fill="#FFFFFF"
                        visibility="hidden"
                      />
                    )}
                  </>
                )}

                {/* ---------- LAST ONE = REAL CIRCLE FOR FULLSCREEN SCALE ---------- */}
                {i === 3 && <circle className="splitCircle" fill="#FFFFFF" />}

                {/* GRADIENT */}
                <defs>
                  <linearGradient
                    id="HGradient"
                    x1="10%"
                    y1="10%"
                    x2="100%"
                    y2="45%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff41b3" />
                    <stop offset="30%" stopColor="#ff5fa2" />
                    <stop offset="58%" stopColor="#ff8a7a" />
                    <stop offset="82%" stopColor="#ffc93a" />
                    <stop offset="100%" stopColor="#ffe36a" />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="SGradient"
                    x1="25%"
                    y1="12%"
                    x2="96%"
                    y2="88%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#F8F3E7" />
                    <stop offset="16%" stopColor="#E8D5B0" />
                    <stop offset="22%" stopColor="#6FD8FF" />
                    <stop offset="38%" stopColor="#57AFFF" />
                    <stop offset="64%" stopColor="#FFD84E" />
                    <stop offset="85%" stopColor="#FF63D4" />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="SHGradient"
                    x1="14%"
                    y1="15%"
                    x2="15%"
                    y2="95%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#ff4fd8" />
                    <stop offset="30%" stopColor="#ffcc66" />
                    <stop offset="82%" stopColor="#37e6ff" />
                    <stop offset="100%" stopColor="#2c5cdf" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}

          {/* bShape */}
          <div
            id="iconStar5"
            className="shape-size absolute top-0 left-0 pointer-events-none opacity-0"
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d={bShape} fill="url(#BGradient)" />
              <defs>
                <linearGradient
                  id="BGradient"
                  x1="14"
                  y1="2"
                  x2="14"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFD93A" />
                  <stop offset="22%" stopColor="#DFFF4F" />
                  <stop offset="45%" stopColor="#8DFF8A" />
                  <stop offset="68%" stopColor="#39F0D8" />
                  <stop offset="86%" stopColor="#29CFFF" />
                  <stop offset="100%" stopColor="#24A8FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* heartShape */}
          <div
            id="iconStar6"
            className="shape-size absolute top-0 left-0 pointer-events-none opacity-0"
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d={heartShape} fill="url(#HeGradient)" />
              <linearGradient
                id="HeGradient"
                x1="10%"
                y1="10%"
                x2="100%"
                y2="45%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#ff41b3" />
                <stop offset="30%" stopColor="#ff5fa2" />
                <stop offset="58%" stopColor="#ff8a7a" />
                <stop offset="82%" stopColor="#ffc93a" />
                <stop offset="100%" stopColor="#ffe36a" />
              </linearGradient>
            </svg>
          </div>

          {/* mshape */}
          <div
            id="iconStar7"
            className="shape-size absolute -top-2 left-0 pointer-events-none opacity-0"
          >
            <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible">
              <g transform="translate(2,2)">
                <path d={mShape} fill="url(#MGradient)" />
              </g>
              <defs>
                <linearGradient
                  id="MGradient"
                  x1="24"
                  y1="2"
                  x2="4"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFD93A" />
                  <stop offset="22%" stopColor="#DFFF4F" />
                  <stop offset="45%" stopColor="#8DFF8A" />
                  <stop offset="68%" stopColor="#39F0D8" />
                  <stop offset="86%" stopColor="#29CFFF" />
                  <stop offset="100%" stopColor="#24A8FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </main>

        {/* content-2 */}
        <main
          className="w-full flex justify-end h-full items-center"
          ref={(el) => (refs.current.stage2 = el)}
        >
          <div
            className="w-1/2 flex flex-col gap-3 xl:gap-5 mt-24"
            ref={(el) => (refs.current.content2 = el)}
          >
            <h6 className="text-[#C5DE05] heading_font-size">Stage 2</h6>
            <h2 className="text-white max-w-[550px] subheading_font-size">
              Reveal & customize
            </h2>

            <div className="flex flex-col gap-5 para_font-size">
              <p className="text-white">
                We started with deploying a Polygon ERC-721 contract and issued
                genesis tokens. These were limited to 3999, they have a special
                trait animated laser eyes. There were 3 ways to get them.
              </p>

              <button className="px-5 py-3 w-fit rounded-[12px] bg-[#c5de05] text-sm font-archivo font-normal text-black">
                share
              </button>
            </div>
          </div>
        </main>

        {/* content-3 */}
        <main
          className="w-full flex justify-end items-center min-h-screen"
          ref={(el) => (refs.current.stage3 = el)}
        >
          <div
            className="w-[67%] flex flex-col gap-3 xl:gap-5 relative overflow-hidden 
            [@media(max-height:730px)]:mt-10"
            ref={(el) => (refs.current.content3 = el)}
          >
            <h6 className="text-[#C5DE05] heading_font-size">Stage 3</h6>
            <h2 className="text-white subheading_font-size max-w-[550px]">
              Metaverse of loyalty
            </h2>

            <p className="text-white para_font-size">
              Log in with your Invader and exchange your crypto on SwapSpace.
              With each swap you receive Diamonds that would help to upgrade
              your Invader. The higher the Invader&apos;s level, the more
              cashback from each swap you&apos;ll get.
            </p>

            <div
              ref={scrollRef}
              className="w-[90%] overflow-x-auto no-scrollbar cursor-grab"
            >
              <div className="inline-block min-w-max">
                <div className="flex flex-col gap-5">
                  {renderRow("Level", levels, (item) => item.label)}

                  {renderRow(
                    "Subscription cost per level",
                    costData,
                    (item) => (
                      <>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35887)">
                            <path d={diamond.part1} fill="white" />
                            <path d={diamond.part2} fill="white" />
                            <path d={diamond.part3} fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_35887">
                              <rect width="22" height="22" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p>{item.cost}</p>
                      </>
                    ),
                    "flex-col gap-1.5",
                  )}

                  {renderRow(
                    <div className="flex-col items-center justify-center">
                      Cashback
                      <span>(% of revenue share)</span>
                    </div>,
                    CaseBackData,
                    (item) => item.caseback,
                    "flex-col",
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section
        ref={(el) => (refs.current.revealSection = el)}
        className="w-full min-h-screen flex flex-col justify-start border text-red-500 text-2xl"
      >
        <div className="mx-auto mt-3 p-3 border border-amber-300">
          <p>dummy</p>

          <div className="text-center">
            {/* <img
              className="w-full"
              src="../assets/buy-crypto/img-2.png"
              alt=""
            /> */}
            <p>image</p>
          </div>
        </div>
      </section>

      <section className="h-[500px]">footer</section>
    </section>
  );
};

export default InvadersClub;
