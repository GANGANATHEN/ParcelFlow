import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function MyComponent() {
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const image = imageWrapperRef.current.querySelector('img');

    gsap.to(image, {
      y: 100, // Adjust y-axis movement
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Smooth scrolling effect
      },
    });
  }, []);

  return (
    <div className="scroll-container">
      <div className="image-wrapper" ref={imageWrapperRef}>
        <Image
          src="/path/to/your/image.jpg"
          alt="Your Image"
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}

export default MyComponent;