"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FooterPremium() {
  const footerRef = useRef(null);
  const burstLayerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const burstLayer = burstLayerRef.current;

    let cooldown = false;

    // --------------------------------------------
    // screenshot matched stepped pattern
    // --------------------------------------------
    const pattern = [
      { x: 92, y: 0, w: 92, h: 26, o: 0.82 },
      { x: 38, y: 26, w: 82, h: 26, o: 0.32 },
      { x: 92, y: 52, w: 90, h: 26, o: 0.47 },
      { x: 38, y: 78, w: 82, h: 26, o: 0.6 },
      { x: 0, y: 104, w: 76, h: 38, o: 0.74 },
      { x: 54, y: 144, w: 58, h: 38, o: 0.98 },
    ];

    const spawnRects = (e) => {
      if (cooldown) return;

      // avoid spawning when hovering existing generated boxes
      if (e.target.closest(".generated-cluster")) return;

      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 320);

      const footerRect = footer.getBoundingClientRect();

      const baseX = e.clientX - footerRect.left - 70;
      const baseY = e.clientY - footerRect.top - 55;

      const group = document.createElement("div");
      group.className = "absolute pointer-events-none generated-cluster";
      group.style.left = `${baseX}px`;
      group.style.top = `${baseY}px`;
      burstLayer.appendChild(group);

      const rects = [];

      pattern.forEach((p, i) => {
        const rect = document.createElement("div");

        rect.className = "absolute rounded-[7px]";
        rect.style.width = `${p.w}px`;
        rect.style.height = `${p.h}px`;
        rect.style.left = `${p.x}px`;
        rect.style.top = `${p.y}px`;
        rect.style.opacity = "0";
        rect.style.background = `rgba(255,255,255,${p.o})`;

        // slight blur softness
        rect.style.backdropFilter = "blur(1px)";

        group.appendChild(rect);
        rects.push(rect);
      });

      // ---------------- APPEAR one by one ----------------
      gsap.to(rects, {
        opacity: (i) => pattern[i].o,
        y: -4,
        stagger: 0.07,
        duration: 0.25,
        ease: "power2.out",
      });

      // ---------------- DISAPPEAR reverse one by one ----------------
      gsap.to([...rects].reverse(), {
        opacity: 0,
        y: -10,
        stagger: 0.06,
        duration: 0.28,
        ease: "power2.inOut",
        delay: 2,
        onComplete: () => {
          group.remove();
        },
      });
    };

    footer.addEventListener("mousemove", spawnRects);

    return () => {
      footer.removeEventListener("mousemove", spawnRects);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#d4ef00] text-black px-12 md:px-20 pt-16 pb-8"
    >
      {/* generated clusters */}
      <div
        ref={burstLayerRef}
        className="absolute inset-0 pointer-events-none z-0"
      ></div>

      <div className="relative z-10">
        {/* top */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black leading-[0.95] max-w-[500px]">
            Want to Swap <br /> Coin ?
          </h2>

          <div className="mt-8 flex items-center bg-white rounded-full overflow-hidden w-[350px] h-[50px] shadow-lg">
            <input
              type="email"
              placeholder="Dummy@gmail.com"
              className="flex-1 h-full px-6 outline-none bg-transparent text-gray-700"
            />
            <button className="bg-black text-white px-6 h-[42px] mr-1 rounded-full font-medium">
              Subscribe Now →
            </button>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mt-12">
          <div>
            <h3 className="text-4xl font-bold mb-6">Coin Barter</h3>
            <div className="flex gap-5 text-xl">
              <span>◎</span>
              <span>f</span>
              <span>◉</span>
              <span>x</span>
              <span>in</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>Exchange</li>
              <li>Buy Crypto</li>
              <li>Sell Crypto</li>
              <li>Bridge</li>
              <li>Crypto Loans</li>
              <li>Spend Crypto</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Business</h4>
            <ul className="space-y-2 text-sm">
              <li>Exchange Listing</li>
              <li>Affiliate Program</li>
              <li>API</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>How it Works</li>
              <li>FAQ</li>
              <li>Contact Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>Blog</li>
              <li>Academy</li>
              <li>Price Predictions</li>
              <li>Profit Calculator</li>
              <li>Convert Crypto</li>
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div className="border-t border-black mt-16 pt-5 text-xs flex flex-wrap gap-3">
          <span>© 2024 Coin Swap. All rights reserved</span>
          <span>|</span>
          <span>Cookie Settings</span>
          <span>Anti-Spam</span>
          <span>Privacy</span>
          <span>User agreement</span>
          <span>Legal Notice</span>
        </div>
      </div>
    </footer>
  );
}
