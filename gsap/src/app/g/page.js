'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

import Section1 from './section1'
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';

gsap.registerPlugin(Observer);

export default function Home() {
  const current = useRef(0);
  const isAnimating = useRef(false);
  const panelsRef = useRef([]);

  const sections = [
    <Section1 key="s1" />,
    <Section2 key="s2" />,
    <Section3 key="s3" />,
    <Section4 key="s4" />,
  ];

  useEffect(() => {
    const panels = panelsRef.current;

    gsap.set(panels[current.current], { autoAlpha: 1 });

    Observer.create({
      type: 'wheel,touch',
      onDown: () => gotoPanel(current.current + 1),
      onUp: () => gotoPanel(current.current - 1),
      preventDefault: true,
      allowClicks: false,
    });

    function gotoPanel(index) {
      if (isAnimating.current || index < 0 || index >= panels.length) return;

      isAnimating.current = true;

      gsap.to(panels[current.current], {
        autoAlpha: 0,
        duration: 0.5,
      });

      gsap.fromTo(
        panels[index],
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.3,
          onComplete: () => {
            current.current = index;
            isAnimating.current = false;
          },
        }
      );
    }
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background (image or video) */}
      <div className="fixed inset-0 z-0">
        <img
          src="/background.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Panels with components */}
      <div className="fixed inset-0 z-10">
        {sections.map((Component, i) => (
          <div
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            className="panel absolute inset-0 flex items-center justify-center text-white opacity-0"
          >
            {Component}
          </div>
        ))}
      </div>
    </main>
  );
}
