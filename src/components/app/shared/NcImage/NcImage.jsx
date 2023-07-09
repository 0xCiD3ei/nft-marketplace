import React, { useEffect, useRef, useState } from "react";
import checkInViewIntersectionObserver from "src/utils/isInViewPortIntersectionObserver";
import PlaceIcon from "./PlaceIcon";
import Image from "next/image";

const NcImage = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  isFill = true,
  className = "object-cover w-full h-auto",
  ...args
}) => {
  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-NcImage ${containerClassName}`} data-nc-id="NcImage">
      {src ? (
        <Image
          src={src}
          className={className}
          alt={alt}
          {...args}
          fill={isFill}
        />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImage;
