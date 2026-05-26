// "use client";

// import Image from "next/image";
// import React from "react";
// import bg from "../../../public/image/smoke.png";

// const TOTAL_SMOKES = 2;

// const Testbg = () => {
//   return (
//     <div className="relative h-dvh overflow-hidden bg-black">
//       {Array.from({ length: TOTAL_SMOKES }).map((_, i) => (
//         <div
//           key={i}
//           className="smoke"
//           style={{
//             animationDelay: `${i * 1.5}s`,
//           }}
//         >
//           <Image
//             src={bg}
//             alt="smoke"
//             fill
//             priority
//             className="object-contain pointer-events-none select-none"
//           />
//         </div>
//       ))}

//       <style jsx>{`
//         .smoke {
//           position: absolute;

//           width: 440px;
//           height: 200px;

//           left: 50%;
//           top: 50%;

//           opacity: 0;

//           transform: translate(-50%, -50%) rotate(0deg) scale(1);

//           transform-origin: center center;

//           will-change: transform, opacity;

//           animation: smokeLoop 6s linear infinite;
//         }

//         @keyframes smokeLoop {
//           0% {
//             opacity: 0;

//             transform: translate(-50%, -50%) rotate(0deg) scale(1);
//           }

//           8% {
//             opacity: 1;
//           }

//           50% {
//             opacity: 1;

//             transform: translate(-50%, -50%) rotate(10deg) scale(1.08);
//           }

//           92% {
//             opacity: 1;
//           }

//           100% {
//             opacity: 0;

//             transform: translate(-50%, -50%) rotate(20deg) scale(1.14);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Testbg;
"use client";

import Image from "next/image";
import React from "react";

import bg from "../../../public/image/smoke.png";

const Testbg = () => {
  return (
    <div className="relative h-dvh overflow-hidden bg-black">
      {/* smoke layers */}
      <div className="smoke smoke1">
        <Image src={bg} alt="smoke" fill className="object-contain" />
      </div>

      <div className="smoke smoke2">
        <Image src={bg} alt="smoke" fill className="object-contain" />
      </div>
      {/* 
      <div className="smoke smoke3">
        <Image src={bg} alt="smoke" fill className="object-contain" />
      </div>

      <div className="smoke smoke4">
        <Image src={bg} alt="smoke" fill className="object-contain" />
      </div> */}

      <style jsx>{`
        .smoke {
          position: absolute;

          width: 440px;
          height: 200px;

          left: 50%;
          top: 50%;

          opacity: 0.8;

          transform-origin: center center;

          will-change: transform, opacity;

          pointer-events: none;
        }

        .smoke1 {
          animation: smokeLoop 82s linear infinite;
          animation-delay: 4s;
        }

        .smoke2 {
          animation: smokeLoop 82s linear infinite;
          animation-delay: 8s;
        }

        @keyframes smokeLoop {
          0% {
            opacity: 0.8;

            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }

          8% {
            opacity: 1;
          }

          50% {
            opacity: 1;

            transform: translate(-50%, -50%) rotate(10deg) scale(1.06);
          }

          92% {
            opacity: 0.8;
          }

          100% {
            opacity: 0.9;

            transform: translate(-50%, -50%) rotate(20deg) scale(1.12);
          }
        }
      `}</style>
    </div>
  );
};

export default Testbg;
