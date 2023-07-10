import React, { useEffect, useId, useRef } from "react";
import Link from "next/link";
import Heading from "./Heading/Heading";
import Glide from "@glidejs/glide";
import CardNFTVideo from "./CardNFTVideo";
import slide1 from "src/assets/images/slides/slide1.avif";
import slide2 from "src/assets/images/slides/slide2.avif";
import slide3 from "src/assets/images/slides/slide3.avif";
import slide4 from "src/assets/images/slides/slide4.avif";

const SectionSliderCardNftVideo = ({ className = "", itemClassName = "" }) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.3,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCardNftVideo ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc="Click on play icon and enjoy NTFs video" hasNextPrev>
          Explore NFTs Video
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {[slide1, slide2, slide3, slide4].map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardNFTVideo featuredImage={item} />
              </li>
            ))}
            <li className={`glide__slide  ${itemClassName}`}>
              <Link href={"/page-search"} className="block relative group">
                <div className="flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl bg-neutral-100 dark:bg-neutral-800"></div>
                <div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center relative">
                    <span className="text-xl font-semibold">NFTs Video</span>
                    <svg
                      className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 20.4999V3.66992"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm mt-1">Show me more</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCardNftVideo;
