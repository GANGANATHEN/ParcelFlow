"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import Img1 from "../../../public/image/base-1.png";
import Img2 from "../../../public/image/base-2.png";
import Img3 from "../../../public/image/base-3.svg";
import Img5 from "../../../public/image/base-5.svg";
import Img6 from "../../../public/image/base-6.svg";
import Img7 from "../../../public/image/base-7.svg";
import Img8 from "../../../public/image/base-9.png";
import Img9 from "../../../public/image/needle.svg";
import Img10 from "../../../public/image/smoke1.png";
import Img11 from "../../../public/image/smoke.png";
import CloudBackground from "./cloudBg";
import RotatingParticleRing from "./particles";

const Testbg = () => {
  const smokeRefs = useRef([]);

  const TOTAL_SMOKES = 3;

  useEffect(() => {
    smokeRefs.current.forEach((smoke, i) => {
      if (!smoke) return;

      gsap.set(smoke, {
        xPercent: -50,
        yPercent: -50,
        rotate: 0,
        scale: 1,
        opacity: 0,
      });

      const tl = gsap.timeline({
        repeat: -1,
        delay: i * 3.3,
      });

      tl.to(smoke, {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
      });

      tl.to(
        smoke,
        {
          rotate: 60,
          scale: 1.14,
          duration: 6,
          ease: "none",
        },
        0,
      );

      tl.to(
        smoke,
        {
          opacity: 0,
          duration: 2.2,
          ease: "power1.out",
        },
        4.8,
      );
    });
  }, []);

  const labelClass = (type) =>
    `absolute max-xs:text-[14px] xs:text-[16px]  lg:text-[18px] font-medium font-archivo transition-colors duration-300`;

  return (
    <div className="main-div flex flex-col items-center justify-center">
      <Image
        src={Img10}
        alt="smoke"
        priority
        className="absolute z-1 top-35 left-[33%] 2xl:left-[38.5%] object-contain 
        opacity-70 w-110 h-110 "
      />
      <div className="relative hidden w-60 h-60 overflow-hidden bg-black">
        {/* <div
          className="absolute left-1/2 top-1/2
          w-100 h-100 border-3 border-red-500
          will-change-transform pointer-events-none z-999"
        > */}

        {/* </div> */}
        {Array.from({ length: TOTAL_SMOKES }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (smokeRefs.current[i] = el)}
            className="absolute left-1/2 top-1/2
          w-100 h-100
          will-change-transform pointer-events-none"
          >
            <Image
              src={Img10}
              alt="smoke"
              fill
              priority
              className="object-contain select-none"
            />
          </div>
        ))}
      </div>
      {/* meter with values*/}
      <div
        className="mt-20 relative w-[60%] h-175 flex flex-col items-center justify-center 
      bg-[url('/image/cloud.png')] bg-cover bg-center border-2 border-white rounded-lg py-10"
      >

        <div className="flex items-center z-2 justify-center">
        <CloudBackground />

          <div className="relative  w-52.5 min-[450px]:w-66 md:w-77.5">
            <div className="relative w-100 h-100 overflow-visible -rotate-20">
              {Array.from({ length: TOTAL_SMOKES }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (smokeRefs.current[i] = el)}
                  className="absolute left-[47%] top-[27%] size-full
          will-change-transform pointer-events-none"
                >
                  <Image
                    src={Img10}
                    alt="smoke"
                    fill
                    priority
                    className="object-contain select-none opacity-35"
                  />
                </div>
              ))}
            </div>

            {/* <Centered img={Img10} scale="120%" id={7} /> */}

            <Centered img={Img1} scale="102%" id={8} />

            <Centered
              img={Img2}
              id={1}
              scale={`${typeof window != "undefined" && window.innerWidth < 768 ? "110%" : "113%"}`}
            />

            {/* ANIMATED PARTICLES */}

            <RotatingParticleRing />

            <Centered img={Img7} id={3} scale="82%" />

            <Centered img={Img3} scale="69%" id={6} />

            <Centered img={Img5} scale="72%" id={4} />

            <Centered img={Img6} scale="72%" id={5} />

            <div className="absolute top-[52%] left-1/2 w-12 md:w-[60px] -translate-x-1/2 -translate-y-1/2 z-40">
              <Image src={Img8} alt="" className="w-full h-full object-cover" />
            </div>

            <div
              className="absolute bottom-1/2 left-1/2 size-25 min-[450px]:size-30 md:size-33 origin-bottom transition-transform duration-500 z-30"
              style={{
                transform: `translate(-51%, 25px) rotate(${480 - 90}deg)`,
                transformOrigin: "52% 83%",
              }}
            >
              <Image
                src={Img9}
                alt="needle"
                fill
                priority
                className="absolute inset-0 size-full bottom-0 object-contain object-bottom animate-smooth-vibration"
                style={{ transformOrigin: "52% 83%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Centered({ img, scale = "100%", id }) {
  return (
    <div
      className={`absolute left-1/2  ${
        id === 4
          ? "z-10 opacity-3 top-1/2 "
          : id === 6
            ? "top-25 min-[450px]:top-31.5 md:top-37 mix-blend-color-dodge "
            : id === 3
              ? " top-1/2 z-31"
              : id === 2
                ? "top-36 min-[450px]:top-45 md:top-47 max-[450px]:h-[150px] min-[450px]:h-[190px]  md:size-[210px]! overflow-hidden! rounded-[50%]"
                : id === 7
                  ? "smoke-img top-47"
                  : "top-1/2 "
      }`}
      //"top-36 min-[450px]:top-45 md:top-47 max-[450px]:h-[150px] min-[450px]:h-[190px]  md:size-[210px]! overflow-hidden! rounded-[50%]"
      style={{
        width: scale,
        transform:
          typeof window !== "undefined" && id === 2
            ? window.innerWidth >= 768
              ? "translate(-50%,-55%)" // Above 768px
              : window.innerWidth >= 499
                ? "translate(-50%,-69%)" // Between 499px and 768px
                : "translate(-50%,-67%)" // Below 499px
            : "translate(-50%,-50%)", // Default (SSR or id !== 2)
      }}
    >
      <Image src={img} alt="needle" className="size-full object-cover" />
    </div>
  );
}

export default Testbg;
