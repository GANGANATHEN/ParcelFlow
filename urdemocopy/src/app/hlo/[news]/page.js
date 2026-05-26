"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Buy_Crypto_Data } from "../../data/data";
import Image from "next/image";
import Img1 from "../../../../public/next.svg";
import Img2 from "../../../../public/next.svg";
import Img5 from "../../../../public/next.svg";
import { curveMonotoneX } from "d3-shape";
import { BitcoinOfferDetails } from "../../data/data";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import Img3 from "../../../../public/next.svg";
import Img4 from "../../../../public/next.svg";
import { useParams, useRouter } from "next/navigation";

const Buy_Crypto = ({ item }) => {
  const params = useParams();
  const page = Number(params.news) || 1;

  const TOTAL_ITEMS = 700;
  const ROWS_PER_PAGE = 160;
  const totalPages = Math.ceil(TOTAL_ITEMS / ROWS_PER_PAGE);

  const [boxId, setBoxId] = useState(0);
  const [showHover, setShowHover] = useState(false);

  const [rowpage, setRowpage] = useState(16);
  const router = useRouter();

  const handleMouseEnter = (id) => {
    setBoxId(id);
    setShowHover(true);
  };

  const handleLeave = () => {
    setShowHover(false);
  };

  const [showContent, setShowContent] = useState(false);
  const SelectcontainerRef = useRef();

  const handleSearchContent = () => {
    setShowContent(!showContent);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        SelectcontainerRef.current &&
        !SelectcontainerRef.current.contains(event.target)
      ) {
        setShowContent(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showContent]);

  const startIndex = page * rowpage;
  const endIndex = startIndex - rowpage;

  function seededOffset(seed, min, max) {
    const x = Math.sin(seed) * 10000;
    const rand = x - Math.floor(x);
    return Math.floor(rand * (max - min + 1)) + min;
  }

  function generateDummyLinesFromPV(data, coinId) {
    return data.map((item, index) => {
      const pv = item.pv;
      return {
        ...item,
        uv: Math.max(0, pv + seededOffset(coinId * 100 + index * 1, -550, 650)),
        qv: Math.max(0, pv + seededOffset(coinId * 200 + index * 2, -400, 430)),
        av: Math.max(0, pv + seededOffset(coinId * 300 + index * 3, -300, 100)),
        xv: Math.max(0, pv + seededOffset(coinId * 400 + index * 4, -450, 250)),
      };
    });
  }

  let displayData = Buy_Crypto_Data.slice(endIndex, startIndex).map((coin) => ({
    ...coin,
    data: generateDummyLinesFromPV(coin.data, coin.id),
  }));

  const handlePagination = (pages) => {
    setPage(pages);
  };

  return (
    <>
      <section className="min-[117.5rem]:px-60! bg-black pointer-events-none relative z-10 max-[425px]:px-4! min-[325px]:pb-[30px] min-[425px]:px-5! min-[500px]:px-6! sm:px-7! md:px-9! lg:px-12! xl:px-16! w-full h-auto pt-33 pb-10">
        <Link
          href=""
          className="font-archivo font-normal text-[14px] text-[#e6e6e6]"
        >
          Main &gt; Exchange Crypto &gt; Buy Crypto flat
        </Link>
        <h1 className="font-gothic font-normal text-[42px] text-white pt-12">
          Buy crypto with flat
        </h1>

        <div className="w-full flex justify-between pt-9 items-center">
          <p className="font-gothic font-normal text-[32px] text-[#e6e6e6] ">
            Popular coins
          </p>
        </div>

        <main className="grid grid-cols-4 grid-rows-4 gap-[83px] pt-12">
          {displayData.map((item) => (
            <div
              key={item.id}
              onMouseLeave={handleLeave}
              onMouseEnter={() => handleMouseEnter(item.id)}
              className={`rounded-[47px] w-full h-[298px] bg-[#0602131A] shadow-[inset_0_0_28px_0_#d3ed05,inset_0px_4px_6px_3px_#fff,inset_0_0_3px_0_rgba(0,0,0,0.25)] pt-9 pb-[26px] relative`}
            >
              <div className="flex justify-between px-6">
                <div className="flex gap-1.5 items-center">
                  <p className="size-9 ">
                    <Image
                      src={item.coinImg}
                      alt="coin-img"
                      className="w-full h-full object-cover rounded-[50%]"
                    />
                  </p>
                  <div className="flex gap-0.5">
                    <p className="text-white font-archivo font-normal text-[18px]">
                      {item.name}
                    </p>
                    <p className="text-white font-archivo font-normal text-[12px] mt-2">
                      {item.sortName}
                    </p>
                  </div>
                </div>
                <div
                  className={`rounded-[18px] w-24 h-[31px] flex items-center gap-[3px] justify-center ${item.value.startsWith("+") ? "bg-[#2323ff]" : "bg-[#fb143e]"}`}
                >
                  <p className="size-[23px]">
                    <Image
                      src={item.value === "+2.34%" ? Img2 : Img1}
                      alt="arrow-down"
                      className="w-full h-full object-cover"
                    />
                  </p>
                  <p className="text-white font-archivo font-medium text-[16px]">
                    {item.value}
                  </p>
                </div>
              </div>
              <p className="font-archivo text-white text-[16px] font-bold px-6 pt-1.5">
                $ {item.price}
              </p>

              {/* graph */}
              <div className="-mt-7 relative w-full h-[200px] overflow-hidden -z-1 rounded-b-[20px]">
                <AreaChart
                  className="gap-0.5 w-full rounded-b-[20px] outline-none! pointer-events-auto cursor-pointer overflow-hidden!"
                  style={{
                    width: "100%",
                    height: 200,
                    aspectRatio: 1.618,
                    overflow: "hidden",
                  }}
                  data={item.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    {/* backshadow color  */}
                    <radialGradient
                      id={`spotlight-${item.id}`}
                      cx="42%"
                      cy="44%"
                      r="160%"
                    >
                      <stop offset="0%" stopColor="#000000" stopOpacity={0} />
                      <stop offset="30%" stopColor="#000000" stopOpacity={1} />
                      <stop offset="100%" stopColor="#000000" stopOpacity={1} />
                    </radialGradient>

                    {/* line stroke color */}
                    <linearGradient
                      id="storke1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="3%" stopColor="#ff7144" stopOpacity={0.2} />
                      <stop offset="10%" stopColor="#ff8979" stopOpacity={1} />
                      <stop offset="20%" stopColor="#ff4dca" stopOpacity={1} />
                      <stop offset="35%" stopColor="#e930ff" stopOpacity={1} />
                      <stop offset="80%" stopColor="#e44d88" stopOpacity={1} />
                      <stop offset="90%" stopColor="#e34e81" stopOpacity={1} />
                      <stop offset="100%" stopColor="#e3507a" stopOpacity={1} />
                    </linearGradient>

                    <linearGradient
                      id="storke2"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0.1%" stopColor="#45afee" stopOpacity="0" />
                      <stop
                        offset="20%"
                        stopColor="#43b1ec"
                        stopOpacity="0.61"
                      />
                      <stop
                        offset="40%"
                        stopColor="#41b3e9"
                        stopOpacity="0.76"
                      />
                      <stop offset="60%" stopColor="#3eb7e5" stopOpacity="1" />
                      <stop offset="80%" stopColor="#23dbbd" stopOpacity="1" />
                      <stop
                        offset="90%"
                        stopColor="#1ee0b7"
                        stopOpacity="0.5"
                      />
                      <stop offset="100%" stopColor="#17eaac" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient
                      id="storke3"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0.1%" stopColor="#c16364" stopOpacity="0" />
                      <stop
                        offset="20%"
                        stopColor="#c16c67"
                        stopOpacity="0.56"
                      />
                      <stop offset="40%" stopColor="#c17168" stopOpacity="1" />
                      <stop offset="60%" stopColor="#c1756a" stopOpacity="1" />
                      <stop offset="80%" stopColor="#c1de8b" stopOpacity="1" />
                      <stop
                        offset="90%"
                        stopColor="#c1e98f"
                        stopOpacity="0.5"
                      />
                      <stop offset="100%" stopColor="#c1ef91" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient
                      id="storke4"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ffb844" stopOpacity="0" />
                      <stop
                        offset="15%"
                        stopColor="#e79b77"
                        stopOpacity="0.15"
                      />
                      <stop
                        offset="35%"
                        stopColor="#cf7dac"
                        stopOpacity="0.65"
                      />
                      <stop
                        offset="55%"
                        stopColor="#a94dff"
                        stopOpacity="0.85"
                      />
                      <stop offset="70%" stopColor="#b1ff72" stopOpacity="1" />
                      <stop offset="80%" stopColor="#50c2f1" stopOpacity="1" />
                      <stop offset="90%" stopColor="#62a0ff" stopOpacity="1" />
                      <stop offset="95%" stopColor="#5e81e9" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ff10d1" stopOpacity="0" />
                    </linearGradient>

                    <filter
                      id="strokeBlur"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
                    </filter>

                    {/* active dot style */}
                    <radialGradient id="active1" x1="0" y1="50" x2="50" y2="1">
                      <stop
                        offset="0.1%"
                        stopColor="#ff731c"
                        stopOpacity="0.6"
                      />
                      <stop
                        offset="70%"
                        stopColor="#ff49c8"
                        stopOpacity="0.4"
                      />
                    </radialGradient>
                    <radialGradient id="active2" x1="0" y1="50" x2="50" y2="1">
                      <stop
                        offset="0.1%"
                        stopColor="#ff1caf"
                        stopOpacity="0.2"
                      />
                      <stop
                        offset="70%"
                        stopColor="#ff9df1"
                        stopOpacity="0.1"
                      />
                    </radialGradient>
                    <linearGradient
                      id="active3"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="20%"
                        stopColor="#ffbff6"
                        stopOpacity="0.1"
                      />
                      <stop
                        offset="80%"
                        stopColor="#fff2fe"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                    <linearGradient
                      id="active4"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="20%" stopColor="#ffbff6" stopOpacity="1" />
                      <stop offset="80%" stopColor="#fff2fe" stopOpacity="1" />
                    </linearGradient>

                    {/* box color */}
                    <radialGradient
                      id="grid1"
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fx="50%"
                      fy="50%"
                    >
                      <stop offset="0%" stopColor="#1B193D" />
                      <stop offset="100%" stopColor="#23214C" />
                    </radialGradient>

                    <pattern
                      id={`gridPattern-${item.id}`}
                      width="36"
                      height="16"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        width="32"
                        height="12"
                        rx="3"
                        fill="#23215C"
                        brightness={0.8}
                        //  fill="url(#grid1)"
                      />
                    </pattern>
                  </defs>

                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="url(#storke1)"
                    strokeWidth={2}
                    fill="transparent"
                    curve={curveMonotoneX}
                    activeDot={({ cx, cy }) => (
                      <g>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={6}
                          fill="none"
                          stroke="url(#active1)"
                          strokeWidth={30}
                          opacity={0.4}
                        />
                        <circle cx={cx} cy={cy} r={12} fill="url(#active2)" />
                        <circle cx={cx} cy={cy} r={7} fill="url(#active3)" />
                        <circle cx={cx} cy={cy} r={4} fill="url(#active4)" />
                      </g>
                    )}
                  />

                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip content={() => null} cursor={false} />

                  <Area
                    type="monotone"
                    activeDot={false}
                    dataKey="uv"
                    stroke="url(#storke2)"
                    strokeWidth={1}
                    fill="transparent"
                    zIndex={3}
                  />
                  <Area
                    type="monotone"
                    activeDot={false}
                    dataKey="qv"
                    stroke="url(#storke3)"
                    strokeWidth={1}
                    fill="transparent"
                    zIndex={3}
                  />
                  <Area
                    type="monotone"
                    activeDot={false}
                    dataKey="av"
                    filter="url(#strokeBlur)"
                    stroke="url(#storke4)"
                    strokeWidth={1}
                    fill="transparent"
                    zIndex={3}
                  />
                  <Area
                    type="monotone"
                    activeDot={false}
                    dataKey="xv"
                    stroke="url(#storke3)"
                    strokeWidth={1}
                    fill="transparent"
                    zIndex={3}
                  />

                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="none"
                    fill={`url(#gridPattern-${item.id})`}
                    activeDot={false}
                    isAnimationActive={false}
                    curve={curveMonotoneX}
                    zIndex={1}
                  />

                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="none"
                    fill={`url(#spotlight-${item.id})`}
                    activeDot={false}
                    isAnimationActive={false}
                    curve={curveMonotoneX}
                    fillOpacity={0.97}
                    zIndex={2}
                  />
                </AreaChart>
              </div>
            </div>
          ))}
        </main>

        {/* pagination */}
        <div className="flex w-full justify-center gap-3 pt-22 pb-10">
          <p className="size-6">
            <Image
              src={Img4}
              alt="arrow-left-icon"
              className="w-full h-full object-cover"
            />
          </p>
          <div className="flex gap-2 items-center">
            <Link
              href="/hlo/1"
              className={`size-7 flex justify-center items-center rounded ${page === 1 ? "bg-black border border-white text-white" : "bg-yellow-400 text-black"}`}
            >
              1
            </Link>
            {totalPages >= 2 && (
              <Link
                href="/hlo/2"
                className={`size-7 flex justify-center items-center rounded ${page === 2 ? "bg-black border border-white text-white" : "bg-yellow-400 text-black"}`}
              >
                2
              </Link>
            )}
            {totalPages > 2 && <span className="px-1 text-white">...</span>}
            {totalPages > 2 && (
              <Link
                href={`/hlo/${totalPages}`}
                className={`size-7 flex justify-center items-center rounded ${page === totalPages ? "bg-black border border-white text-white" : "bg-yellow-400 text-black"}`}
              >
                {totalPages}
              </Link>
            )}
          </div>
          <p className="size-6">
            <Image
              src={Img3}
              alt="arrow-left-icon"
              className="w-full h-full object-cover"
            />
          </p>
        </div>
      </section>
    </>
  );
};

export default Buy_Crypto;
