"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SmoothScrollWrapper = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const excludedPaths = [""];
    const isExcluded = excludedPaths.includes(pathname);

    if (isExcluded) {
      destroyLenis();
      return;
    }

    const isDemoPage = pathname === "/demo" || pathname === "/draw";

    initLenis({ isDemoPage });

    return () => {
      destroyLenis();
    };
  }, [pathname]);

  return <div>{children}</div>;
};

export default SmoothScrollWrapper;
