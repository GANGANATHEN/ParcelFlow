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

      {/* pagination */}
      <div className="flex gap-2 mt-8">
        <Link href={`/hlo/${page - 1}`}>Prev</Link>
        <Link href={`/hlo/${page + 1}`}>Next</Link>
      </div>
    </div>
  );
}
