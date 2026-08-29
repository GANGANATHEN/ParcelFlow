"use client";
import React from "react";
import Lottie from "lottie-react";

// Import pannum pothu direct-aa path kudutha pothum
import animationData from "../../../public/image/animLottie.json"; 

const MyAnimation = () => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true} 
        
      />
    </div>
  );
};

export default MyAnimation;