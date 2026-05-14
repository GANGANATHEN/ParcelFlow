"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Buy_Crypto_Data } from "@/app/data/data";

const ROWS = 16;

export default function HloPage() {
  const params = useParams();
  const page = Number(params.news) || 1;

  const start = page * ROWS;
  const end = start - ROWS;
  const data = Buy_Crypto_Data.slice(end, start);

  return (
    <div className="p-10">
      <h1>Page {page}</h1>

      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-red-100 p-4 text-white">
            {item.name}
          </div>
        ))}
      </div>

      {/* <div className="absolute mt-5 navopen-below w-40 py-2 z-[9999]">
        <div className="relative rounded-2xl overflow-hidden">
          MAIN GLASS (IMPORTANT)
          <div className="absolute inset-0 backdrop-blur-[9px] bg-blend-hard-light bg-white/50  "></div>

          SOFT INNER LIGHT
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"></div>

          TOP REFLECTION (REDUCED)
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-40"></div>

          EDGE HIGHLIGHT (SOFT)
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.3),inset_0_-1px_0.5px_rgba(255,255,255,0.1)]"></div>

          BORDER
          <div className="absolute inset-0 rounded-2xl border border-white/20"></div>

          CONTENT
          <div className="relative z-10 p-3">
            {nav.items.map((item, index) => (
              <div
                key={index}
                className={`px-3 py-1 cursor-pointer transition-colors ${
                  sticky ? "text-white" : "text-black hover:text-[#D3ED05]"
                }`}
                onPointerDown={() => {
                  setOpenMenu(null);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* pagination */}
      <div className="flex gap-2 mt-8">
        <Link href={`/hlo/${page - 1}`}>Prev</Link>
        <Link href={`/hlo/${page + 1}`}>Next</Link>
      </div>
    </div>
  );
}
