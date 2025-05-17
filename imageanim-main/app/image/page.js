"use client";
import React, { useRef, useState } from "react";
import "../globals.css";

const originalImages = [
  { src: "/1.png", originalIndex: 0 },
  { src: "/2.png", originalIndex: 1 },
  { src: "/3.png", originalIndex: 2 },
  { src: "/4.png", originalIndex: 3 },
  { src: "/5.png", originalIndex: 4 },
  { src: "/6.png", originalIndex: 5 },
  { src: "/7.png", originalIndex: 6 },
];

const ImageSlider = () => {
  const [images, setImages] = useState(originalImages);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    // When mouse drag ends, shift images
    const newImages = [...images];
    const moved = newImages.shift();
    newImages.push(moved);
    setImages(newImages);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // scroll speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const lastImage = images[images.length - 1];

  return (
    <div className="slider-wrapper">
      <div
        className="slider-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {images.map((img, index) => (
          <div className="image-box" key={index}>
            <img src={img.src} alt={`img-${index}`} />
            <p>Original Index: {img.originalIndex}</p>
          </div>
        ))}
      </div>

      {/* 8th image display */}
      <div className="duplicate-box">
        <img src={lastImage.src} alt="duplicate" />
        <p>Original Index: {lastImage.originalIndex}</p>
      </div>
    </div>
  );
};

export default ImageSlider;
