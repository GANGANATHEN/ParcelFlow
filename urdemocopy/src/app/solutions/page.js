"use client";

import React, { useEffect } from "react";
import Problems from "./problems";

const Page = () => {
  useEffect(() => {
    const result = Problems.KthLargest();

    console.log(result);
  }, []);

  return <div>Check Console</div>;
};

export default Page;
