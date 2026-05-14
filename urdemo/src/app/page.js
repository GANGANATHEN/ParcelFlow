// "use client";
// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [data, setData] = useState([
//     {
//       id: 0,
//       data1: "data1",
//     },
//     {
//       id: 1,
//       data1: "data2",
//     },
//     {
//       id: 2,
//       data2: "data3",
//     },
//   ]);
//   const [undo, setUndo] = useState("");
//   const [data1, setData1] = useState("");
//   const [data2, setData2] = useState("");

//   const [udoCount, setUdoCount] = useState(data.length);

//   useEffect(() => {
//     setUdoCount(data.length);
//   }, [data]);

//   console.log(data);

//   function handleData1() {
//     if (data1 === "") {
//       alert("This field is required.");
//     } else {
//       setData((prevState) => [
//         ...prevState,
//         {
//           id: prevState.length,
//           data1: data1,
//         },
//       ]);
//       console.log("else data1", data1);
//     }
//     console.log("fun data1", data1);
//     setData2("");
//   }

//   function handleData2() {
//     if (data2 === "") {
//       alert("This field is required.");
//     } else {
//       setData((prevState) => [
//         ...prevState,
//         {
//           id: prevState.length,
//           data2: data2,
//         },
//       ]);
//       console.log("else data2", data2);
//     }
//     console.log("fun data2", data2);
//     setData1("");
//   }

//   function handleUndo() {
//     console.log("us", udoCount);
//     var count = udoCount - 1;
//     if (count >= 0) {
//       setUdoCount(count);
//       if (data[`${count}`].data1) {
//         setData1(data[`${udoCount}`].data1);
//         console.log("Undo", data[`${count}`].data1);
//         setData2("");
//       } else {
//         setData2(data[`${udoCount}`].data2);
//         console.log("Undo", data[`${count}`].data2);
//         setData1("");
//       }
//     }

//     console.log("ue", udoCount);
//   }

//   function handleRedo() {
//     console.log("rs", udoCount);
//     var count = udoCount + 1;
//     if (count < data.length) {
//       setUdoCount(count);
//       if (data[`${count}`].data1) {
//         setData1(data[`${udoCount}`].data1);
//         console.log("Redo", data[`${count}`].data1);
//         setData2("");
//       } else {
//         setData2(data[`${udoCount}`].data2);
//         console.log("Redo", data[`${count}`].data2);
//         setData1("");
//       }
//     }
//     console.log("re", udoCount);
//   }

//   return (
//     <div>
//       <div className="mt-20 px-30">
//         <input
//           className="border-2"
//           value={data1}
//           type="text"
//           onChange={(e) => setData1(e.target.value)}
//         ></input>
//         <button className="border-2 px-1 mx-2" onClick={() => handleData1()}>
//           save
//         </button>
//         <br></br>
//         <br></br>
//         <input
//           className="border-2"
//           type="text"
//           onChange={(e) => setData2(e.target.value)}
//         ></input>
//         <button className="border-2 px-1 mx-2" onClick={() => handleData2()}>
//           save
//         </button>
//         <br></br>
//         <div className="flex gap-3 my-2">
//           <button className="border-2 px-1 mx-2" onClick={() => handleUndo()}>
//             Undo
//           </button>
//           <button className="border-2 px-1 mx-2" onClick={() => handleRedo()}>
//             Redo
//           </button>
//         </div>
//         <div className="flex gap-3 my-3">
//           {data.map((item) => (
//             <div key={item.id} className="border-2 px-1 mx-2">
//               {item.data1}
//               {item.data2}
//             </div>
//           ))}
//         </div>
//         {/* <p>undo = {redo}</p> */}
//         <p>{undo}</p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import Nav_Component from "./coinbarter/page";
import GlassToast from "./border/page";
import LiquidGlass from "./try/glass";

const page = () => {
  return (
    <div className="h-dvh w-full relative overflow-y-auto inset-0 overflow-hidden bg-cover bg-center">
      {/* background video border*/}
      <video
        // autoPlay
        loop
        // onDurationChange={0.3}
        muted
        playsInline
        className=" absolute inset-0 w-full h-full object-cover
         transition-opacity duration-600"
      >
        <source src="/image/video.mp4" type="video/mp4" />
      </video>
      <div className="sticky w-full h-full top-0 ">
        <Nav_Component />
      </div>

      <div className="overflow-hidden overflow-y-auto">
        <div className="h-dvh flex flex-col justify-center items-center px-5">
          <h1 className="text-white font-bold text-2xl width-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            laborum doloremque aliquid quod expedita id accusamus cum illum
            repudiandae amet nihil aut voluptates, neque veritatis. Doloribus
            deleniti sed veniam voluptate!
          </p>
        </div>
        <div className="h-dvh flex flex-col justify-center items-center px-5 inset-0 overflow-hidden bg-[url('/image/2.jpg')] bg-cover bg-center">
          <div>
            <h1 className="text-white font-bold text-2xl width-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos laborum doloremque aliquid quod expedita id accusamus
              cum illum repudiandae amet nihil aut voluptates, neque veritatis.
              Doloribus deleniti sed veniam voluptate!
            </p>
          </div>
          <div className="fixed z-10 top-120 mr-60">
            {/* Error Mode */}
            <LiquidGlass status="error" />
          </div>
        </div>
        <div className="h-dvh flex flex-col justify-center items-center px-5">
          <h1 className="text-white font-bold text-2xl width-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            laborum doloremque aliquid quod expedita id accusamus cum illum
            repudiandae amet nihil aut voluptates, neque veritatis. Doloribus
            deleniti sed veniam voluptate!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
