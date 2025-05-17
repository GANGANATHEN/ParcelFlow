"use client";

import React, { useRef, useState } from "react";
import "../globals.css";

const originalImages = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
];

const DraggableCarousel = () => {
  const [images, setImages] = useState(originalImages);
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);
  const isDragging = useRef(false);

  // Handle drag start
  const onDragStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX || e.touches[0].pageX;
    dragScrollStart.current = containerRef.current.scrollLeft;
  };

  // Handle drag move
  const onDragMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = dragStartX.current - x;
    containerRef.current.scrollLeft = dragScrollStart.current + walk;
  };

  // Handle drag end - rotate images if scrolled enough
  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const imgWidth = container.firstChild.offsetWidth + 10; // width + gap

    // Calculate how many images were scrolled (rounded)
    const moved = Math.round(scrollLeft / imgWidth);

    if (moved !== 0) {
      let newImages = [...images];

      if (moved > 0) {
        // Move first image to last moved times
        for (let i = 0; i < moved; i++) {
          const first = newImages.shift();
          newImages.push(first);
        }
      } else {
        // Move last image to first | -moved times
        for (let i = 0; i < -moved; i++) {
          const last = newImages.pop();
          newImages.unshift(last);
        }
      }
      setImages(newImages);
    }

    // Reset scroll position to 0 after rotation
    container.scrollLeft = 0;
  };

  // The 8th preview image is always the last (index 6)
  const previewImage = images[6];

  return (
    <>
      <div
        className="carousel-container"
        ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`img-${idx}`}
            className="carousel-image"
            draggable={false}
          />
        ))}
      </div>

      {/* 8th preview image */}
      <div className="preview-container">
        <img src={previewImage} alt="preview" className="preview-image" />
      </div>
    </>
  );
};

export default DraggableCarousel;
