import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <Image
        src="/image/bgg.svg"
        alt="Background Image"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default page;
