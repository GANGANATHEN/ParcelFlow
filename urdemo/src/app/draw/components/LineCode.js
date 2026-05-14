"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { GSDevTools } from "gsap/GSDevTools"; // Import the plugin
import useLineAnimation from "@/hooks/useLineAnimation";
import {
  buttonShape,
  childline,
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
  circleSlices,
} from "./pathData";
import LiquidGlass from "@/app/try/glass";

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

function offsetPath(path, dx, dy, scale = 1) {
  let count = 0;

  return path.replace(/-?\d*\.?\d+/g, (num) => {
    const n = parseFloat(num);
    const isX = count % 2 === 0;
    count++;
    return (n * scale + (isX ? dx : dy)).toFixed(2);
  });
}

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
  const revealSection = useRef(null);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: smallSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 0.5,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(
        smallRef1.current,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          ease: "linear",
          duration: 1,
        },
        0,
      );

      tl.fromTo(
        smallRef2.current,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          ease: "linear",
          duration: 1,
        },
        0,
      );

      tl.fromTo(
        smallRef3.current,
        { drawSVG: "0% 0%" },
        {
          drawSVG: "-100% 0%",
          ease: "linear",
          duration: 1,
        },
        0,
      );
    },
    { scope: smallSectionRef },
  );

  // large line animation -------------------------------------
  const strokeData = {
    strokeWidth: 3,
    strokeColor: "#D3ED05",
  };

  useLineAnimation({ refs });

  const starPlaced = useMemo(() => offsetPath(starShape, 88, 18, 1), []);
  const shieldPlaced = useMemo(() => offsetPath(heartShape, 16, 14, 1), []);
  const squarePlaced = useMemo(() => offsetPath(squareShape, 168, -28, 1), []);

  const icons = [
    {
      shapeId: "shape1",
      shape: starPlaced,
      targetId: "slice1",
    },
    {
      shapeId: "shape2",
      shape: shieldPlaced,
      targetId: "slice2",
    },
    {
      shapeId: "shape3",
      shape: squarePlaced,
      targetId: "slice3",
    },
  ];
  // line animation -------------------------------------------

  useEffect(() => {
    gsap.to(".img-3", { rotate: -360, duration: 10, ease: "linear" });
  }, []);

  const handleMouseStyle = (id) => {
    setContentId(id);
    setApplyStyle(true);
  };

  const handleStyleLeave = () => {
    setApplyStyle(false);
  };

  return (
    <section className="w-full  3xl:px-60! relative z-10 max-[425px]:px-4 max-md:pb-[30px]! min-[425px]:px-5 min-[500px]:px-6 md:pb-10 sm:px-7 md:px-9 lg:px-12 xl:px-16 2xl:px-35  h-auto  2xl:pt-33! max-sm:pt-16 sm:pt-20 lg:pt-25 ">
      <p className="flex mb-2 items-center gap-1.5 text-[#e6e6e6] font-archivo font-normal overflow-hidden">
        Main <ChevronRight style={{ width: "18px" }} /> Invaders Club
      </p>
      <LiquidGlass status="error" />

      {/* section-1  */}
      <section
        ref={smallSectionRef}
        className="mt-12 w-full grid md:grid-cols-2 grid-cols-1 lg:gap-12 gap-7 pt-[30px] pb-[50px] "
      >
        <div className="w-full">
          <h1 className="text-white lg:text-[42px] md:text-[32px] text-[28px] font-normal mb-2 font-gothic">
            Welcome to SwapSpace Invaders Club!
          </h1>
          <p className="text-[#E6E6E6] font-archivo mb-5">
            SwapSpace offers an enticing loyalty program based on NFTs: using
            Invader NFT during exchanges, you can easily receive cashback up to
            50% of the RevShare
          </p>

          <div className="flex flex-col gap-3.5 xs:gap-5">
            {invadersData.map((item) => (
              <p
                onMouseEnter={() => handleMouseStyle(item.id)}
                onMouseLeave={handleStyleLeave}
                key={item.id}
                className={`${
                  ContentId === item.id && ApplyStyle === true
                    ? "border-[#C1C1C1] "
                    : "border-[#1c1c1c]"
                }  transition-all duration-300 linear font-archivo text-white text-base bg-[#1C1C1C] border rounded-[14px] py-3 px-5 md:py-4 md:px-7`}
              >
                {item.content}
              </p>
            ))}
          </div>

          {/* supScript content with draw-line animation */}

          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex gap-[140px] mt-12">
              {["Stage 1", "Stage 2", "Stage 3"].map((items, index) => (
                <p
                  key={index}
                  className="text-3xl font-medium text-white font-archivo"
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

              <div className="flex ml-19 items-center">
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
                      d="M40.0326 0.292969C62.0326 30.793 47.0326 47.293 29.5326 43.293C12.0326 39.293 -22.9674 17.793 24.0326 14.793C61.6326 12.393 84.0317 23.4596 90.5312 29.293M90.5312 29.293L85.0312 14.793M90.5312 29.293L76.5312 32.293"
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
                      d="M0.0742188 35.6509C42.4742 42.0509 46.4076 19.9843 43.0742 8.15093C38.7409 4.15093 27.9742 -2.64907 19.5742 2.15093C9.07422 8.15093 9.07422 37.1484 26.0742 44.6484C39.6742 50.6484 83.4076 18.8168 103.574 2.15093M103.574 2.15093H83.0742M103.574 2.15093V35.6509"
                      stroke="#D3ED05"
                      strokeWidth="2.5"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <div className="md:size-[400px] size-full text-center">
            <img
              className="size-full object-over"
              src="../assets/buy-crypto/img-3.png"
              alt=""
            />
          </div>

          <button className="bg-[#D3ED05] md:w-[380px] h-[50px] w-full rounded-[18px] text-black border-0 mb-3 font-medium text-sm">
            GET AN INVADER
          </button>
          <p className="text-center text-[#D3ED05] text-base font-archivo font-normal">
            Already have an Invaders Club account
          </p>
        </div>
      </section>

      {/* draw-line animation container */}
      <section className="relative" ref={(el) => (refs.current.scope = el)}>
        {/* draw-line svg path */}
        <svg
          id="wrap"
          viewBox="0 0 1432 2455"
          height="2655"
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
              strokeWidth={strokeData.strokeWidth}
            />
          </g>

          {/* main line */}
          <path
            ref={(el) => (refs.current.path = el)}
            d={childline}
            stroke={strokeData.strokeColor}
            strokeWidth={strokeData.strokeWidth}
          />

          {/* icons to fall in along the path */}
          <circle id="anchor1" cx="160" cy="1090" />
          <circle id="anchor2" cx="210" cy="1090" />
          <circle id="anchor3" cx="185" cy="1040" />
          <circle id="anchor4" cx="320" cy="1110" />
          <circle id="anchor5" cx="340" cy="1430" />
          <circle id="anchor6" cx="370" cy="1590" />
          <circle id="anchor7" cx="180" cy="1570" />
          <circle id="anchor8" cx="290" cy="1550" />
          <circle id="anchorMergePath" cx="280" cy="1695" />
        </svg>

        {/* content-1 */}
        <main
          className="w-full flex justify-start min-h-screen"
          ref={(el) => (refs.current.stage1 = el)}
        >
          {/* content */}
          <div
            className="flex flex-col ml-28 mt-25 gap-6 w-1/2"
            ref={(el) => (refs.current.content1 = el)}
          >
            <h6 className="text-[#C5DE05] text-2xl xl:text-3xl font-medium font-archivo">
              Stage 1
            </h6>
            <h2 className="text-white text-3xl xl:text-4xl font-normal font-gothic max-w-[550px]">
              Welcome to SwapSpace Invaders Club!
            </h2>

            <div className="flex flex-col text-[15px] xl:text-base gap-5">
              <p className="text-white font-archivo font-normal">
                We started with deploying a Polygon ERC-721 contract and issued
                genesis tokens. These were limited to 3999, they have a special
                trait animated laser eyes. There were 3 ways to get them.
              </p>
              <p className="text-white font-archivo font-normal">
                After all 3999 genesis tokens are distributed the exchange
                minting will continue, but those tokens won't have any special
                traits, points and benefits from the beginning.
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
              className="relative w-36 h-10"
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
                    x1="12"
                    y1="0"
                    x2="12"
                    y2="22.32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F0E49A" />
                    <stop offset="1" stopColor="#6FABCE" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              ref={(el) => (refs.current.buttons[1] = el)}
              className="relative w-[54px] h-10"
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
              className="relative w-36 h-10"
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
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FFF500" />
                    <stop offset="20%" stopColor="#ff7a00" />
                    <stop offset="40%" stopColor="#ffe600" />
                    <stop offset="60%" stopColor="#00ff90" />
                    <stop offset="80%" stopColor="#00c3ff" />
                    <stop offset="100%" stopColor="#a100ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              ref={(el) => (refs.current.buttons[3] = el)}
              className="relative w-[54px] h-10"
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

          {/* BTN 3 */}
          <div
            ref={(el) => (refs.current.btnWraps[2] = el)}
            className="btn-1 absolute top-0 left-0 flex gap-10 opacity-0"
          >
            <div
              ref={(el) => (refs.current.buttons[4] = el)}
              className="relative w-36 h-10"
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

                {/* STAR SHAPE (ARROW) */}
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
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ff0000" />
                    <stop offset="20%" stopColor="#ff7a00" />
                    <stop offset="40%" stopColor="#ffe600" />
                    <stop offset="60%" stopColor="#00ff90" />
                    <stop offset="80%" stopColor="#00c3ff" />
                    <stop offset="100%" stopColor="#a100ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              ref={(el) => (refs.current.buttons[5] = el)}
              className="relative w-[54px] h-10"
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
                  <linearGradient id="bGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff00cc" />
                    <stop offset="50%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#00ff88" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* reveal svg */}
          <div
            id="iconStar1"
            className="absolute top-0 left-0 pointer-events-none"
          >
            <svg
              viewBox="0 0 200 200"
              width="120"
              height="120"
              style={{ overflow: "visible" }}
            >
              {/* -------- SOURCE SHAPES + BLAST -------- */}
              {icons.map((item, index) => (
                <g key={item.shapeId} id={`group${index + 1}`}>
                  <path id={item.shapeId} d={item.shape} fill="#F0E49A" />

                  {/* blast particles retain */}
                  {/* <g className="blast" id={`blast${index + 1}`}>
                    {radii.map((r, i) => (
                      <circle
                        key={i}
                        className="piece"
                        cx="100"
                        cy="100"
                        r={r}
                        fill="#F0E49A"
                      />
                    ))}
                  </g> */}
                </g>
              ))}

              {/* -------- HIDDEN CIRCLE TARGETS -------- */}
              {circleSlices.map((slice) => (
                <path
                  key={slice.id}
                  id={slice.id}
                  d={slice.d}
                  visibility="hidden"
                />
              ))}

              {/* defs if needed */}
              <defs>
                <linearGradient id="squareGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff00cc" />
                  <stop offset="50%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#00ff88" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* impellerShape */}
          <div
            id="iconStar4"
            className="absolute top-0 left-0 pointer-events-none z-10"
          >
            <svg
              viewBox="0 0 30 30"
              width="25"
              height="25"
              style={{ overflow: "visible" }}
            >
              <path id="shape4" d={impellerShape} fill="#F0E49A" />
              {/* arrow shape */}
              <path
                id="arrowShape1"
                fill="#F0E49A"
                d={arrowShape}
                style={{ visibility: "hidden" }}
              />
              {/* circle shape */}
              <path
                id="circleShape1"
                d={circleShape}
                style={{ visibility: "hidden" }}
              />
            </svg>
          </div>

          {/* bShape */}
          <div
            id="iconStar5"
            className="absolute top-0 left-0 pointer-events-none"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <defs>
                <filter
                  id="shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  {/* <!-- duplicate --> */}
                  <feOffset in="SourceAlpha" dx="6" dy="3" result="offset" />

                  {/* <!-- color apply --> */}
                  <feFlood
                    floodColor="#F0E49A"
                    result="color"
                    floodOpacity="0.3"
                  />

                  <feComposite
                    in="color"
                    in2="offset"
                    operator="in"
                    result="shadow"
                  />

                  {/* <!-- merge --> */}
                  <feMerge>
                    <feMergeNode in="shadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d={bShape} fill="#F0E49A" filter="url(#shadow)" />
            </svg>
          </div>

          {/* mshape */}
          <div
            id="iconStar6"
            className="absolute top-0 left-0 pointer-events-none"
          >
            <svg viewBox="0 0 40 40" width="24" height="24">
              <g transform="translate(2,2)">
                <path d={mShape} fill="#F0E49A" />
              </g>
            </svg>
          </div>

          {/* heartShape */}
          <div
            id="iconStar7"
            className="absolute top-0 left-0 pointer-events-none"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d={heartShape} fill="#F0E49A" />
            </svg>
          </div>

          {/* circleShape */}
          {/* <div id="iconStar8" className="pointer-events-none">
            <svg viewBox="0 0 22 22" width="60" height="60">
              <defs>
                CLIP (instead of heavy masks)
                <clipPath id="starClip">
                  <path d={starShape} />
                </clipPath>

                BASE GRADIENT
                <radialGradient id="starGradient" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#FFF500" />
                  <stop offset="100%" stopColor="#FFF500" />
                </radialGradient>

                GLOW FILTER
                <filter
                  id="starBlur"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4.4" />
                </filter>
              </defs>

              GROUP morph panna easy
              <g id="starGroup" clipPath="url(#starClip)">
                base
                <rect width="22" height="22" fill="url(#starGradient)" />

                pink glow
                <ellipse
                  cx="11.6"
                  cy="2.5"
                  rx="9.5"
                  ry="5.5"
                  fill="#FF00D6"
                  filter="url(#starBlur)"
                />

                cyan glow
                <ellipse
                  cx="7"
                  cy="17"
                  rx="7"
                  ry="5"
                  fill="#07FFE1"
                  filter="url(#starBlur)"
                />

                blue glow
                <rect
                  x="11"
                  y="13"
                  width="13"
                  height="14"
                  fill="#0066FF"
                  filter="url(#starBlur)"
                />

                overlay highlight
                <rect
                  width="22"
                  height="22"
                  fill="#808080"
                  style={{ mixBlendMode: "overlay" }}
                />
              </g>

              ⚡ actual morph path (invisible but used by GSAP)
              <path id="starPath" d={starShape} fill="transparent" />
            </svg>
          </div> */}

          {/* dummy color testing */}
          <div id="iconStar8" className="pointer-events-none">
            <svg
              viewBox="0 0 30 30"
              width="60"
              height="60"
              overflow="visible"
              className="rotate-180"
            >
              <path id="shape4" d={arrowShape} fill="url(#dummyGradient)" />

              <defs>
                <linearGradient
                  id="dummyGradient"
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
              </defs>
            </svg>
          </div>

          {/* <div id="iconStar8" className="pointer-events-none">
            <svg viewBox="0 0 30 30" width="60" height="60" overflow="visible">
              <path
                id="shape4"
                d={starShape}
                fill="url(#shieldGradient)"
                filter="url(#shieldGlow)"
              />

              GRADIENT
              <defs>
                Gradient
                <radialGradient id="shieldGradient" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#FFF500" stopOpacity="0.44" />
                  <stop offset="35%" stopColor="#FF00D6" />
                  <stop offset="55%" stopColor="#07FFE1" />
                  <stop offset="75%" stopColor="#0066FF" />
                  <stop offset="92%" stopColor="#808080" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                </radialGradient>

                Glow blur 
                <filter
                  id="shieldGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="1.6" result="blur" />
                  <feBlend in="SourceGraphic" in2="blur" mode="normal" />
                </filter>
              </defs>
            </svg>
          </div> */}
        </main>

        {/* content-2 */}
        <main
          className="w-full flex justify-end min-h-screen items-center"
          ref={(el) => (refs.current.stage2 = el)}
        >
          <div
            className="w-1/2 flex flex-col gap-6 mt-24"
            ref={(el) => (refs.current.content2 = el)}
          >
            <h6 className="text-[#C5DE05] text-3xl font-medium font-archivo">
              Stage 2
            </h6>
            <h2 className="text-white text-4xl font-normal font-gothic max-w-[550px]">
              Reveal & customize
            </h2>

            <div className="flex flex-col gap-5">
              <p className="text-white text-base font-archivo font-normal">
                We started with deploying a Polygon ERC-721 contract and issued
                genesis tokens. These were limited to 3999, they have a special
                trait animated laser eyes. There were 3 ways to get them.
              </p>

              <button className="w-20 h-12 rounded-[12px] bg-[#c5de05] text-lg font-archivo font-normal text-black">
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
            className="w-[60%] flex flex-col gap-6 relative overflow-hidden "
            ref={(el) => (refs.current.content3 = el)}
          >
            <h6 className="text-[#C5DE05] text-2xl xl:text-3xl font-medium font-archivo">
              Stage 3
            </h6>
            <h2 className="text-white text-3xl xl:text-4xl font-normal font-gothic max-w-[550px]">
              Metaverse of loyalty
            </h2>

            <p className="text-white text-[15px] xl:text-base font-archivo font-normal">
              Log in with your Invader and exchange your crypto on SwapSpace.
              With each swap you receive Diamonds that would help to upgrade
              your Invader. The higher the Invader's level, the more cashback
              from each swap you'll get.
            </p>

            <div className="w-[90%] overflow-x-auto">
              <div className="inline-block min-w-max">
                <div className="flex flex-col gap-5">
                  {/* row-1 */}
                  <div className="grid grid-flow-col auto-cols-max gap-4">
                    <p className="w-26 h-30 flex items-center justify-center rounded-[12px] border border-[#d3ed05] bg-[#4e5800] text-[#d3ed05] text-lg font-archivo font-medium">
                      Level
                    </p>
                    {levels.map((items) => (
                      <div
                        className="w-26 h-30 flex items-center justify-center text-sm text-white font-archivo font-medium rounded-[12px] border border-[#d3ed05] bg-[#4e5800]"
                        key={items.id}
                      >
                        {items.label}
                      </div>
                    ))}
                  </div>

                  {/* row-2 */}
                  <div className="grid grid-flow-col auto-cols-max gap-4">
                    <p className="w-26 h-30 flex items-center justify-center rounded-[12px] border border-[#d3ed05] bg-[#4e5800] text-[#d3ed05] text-xs px-4 text-center font-archivo font-medium">
                      Subscription cost per level
                    </p>
                    {costData.map((items) => (
                      <div
                        className="w-26 h-30 flex flex-col items-center gap-1.5 justify-center text-sm text-white font-archivo font-medium rounded-[12px] border border-[#d3ed05] bg-[#4e5800]"
                        key={items.id}
                      >
                        <p>
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
                        </p>
                        <p>{items.cost}</p>
                      </div>
                    ))}
                  </div>

                  {/* row-3 */}
                  <div className="grid grid-flow-col auto-cols-max gap-4">
                    <p className="w-26 h-30 flex flex-col items-center justify-center rounded-[12px] border border-[#d3ed05] bg-[#4e5800] text-[#d3ed05] text-xs px-2.5 text-center font-archivo font-medium">
                      Cashback
                      <span>(% of revenue share)</span>
                    </p>
                    {CaseBackData.map((items) => (
                      <div
                        className="w-26 h-30 flex items-center justify-center text-sm text-white font-archivo font-medium rounded-[12px] border border-[#d3ed05] bg-[#4e5800]"
                        key={items.id}
                      >
                        <p>{items.caseback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section
        ref={revealSection}
        className="w-full z-1 h-dvh flex flex-col justify-center text-red-500 text-2xl"
      >
        {/* <div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-4" // Added gap between items
              defaultValue="item-1"
            >
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-[#1C1C1C] border! border-[#868E96]! rounded-lg px-4"
                >
                  <AccordionTrigger className="flex hover:underline-offset-0! ! w-full items-center justify-between text-white font-semibold font-archivo text-md">
                    <span className="line-clamp-1 font-archivo font-normal text-left">
                      {faq.question}
                    </span>

                    Custom Arrow
                    <span className="size-5 shrink-0">
                      <img
                        src="/../assets/hero-banner/arrow-down.svg"
                        alt="arrow"
                        className="size-full transition-transform duration-300 accordion-arrow"
                      />
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="flex flex-col gap-2 text-balance">
                    <p className="text-sm text-white font-archivo font-normal">
                      {faq.answer}
                    </p>
                    <p className="text-[#D3ED05] text-sm font-archivo font-normal cursor-pointer">
                      {faq.linkText}
                    </p>
                    <p className="text-sm text-white font-archivo font-normal">
                      Remember to always do your own research, though. Have fun!
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div> */}
        <p>dummy</p>
        <div className="mx-auto">
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
    </section>
  );
};

export default InvadersClub;
