import React from "react";
import Image from "next/image";
import bg from "../../../public/image/bgg.svg";

const Page = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src={bg}
        alt="Background Image"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};

export default Page;
