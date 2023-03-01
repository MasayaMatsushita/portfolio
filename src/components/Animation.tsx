import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/69342-good.json";

const Animation = () => {

  return (
    <>
      <Lottie animationData={animationData} loop={true} />
    </>
  );
};

export default Animation;