import React from "react";
import NcImage from "src/components/shared/NcImage/NcImage";
import HIW1img from "src/assets/images/HIW1img.png";
import HIW2img from "src/assets/images/HIW2img.png";
import HIW3img from "src/assets/images/HIW3img.png";
import HIW4img from "src/assets/images/HIW4img.png";
import VectorImg from "src/assets/images/VectorHIW.svg";
import Badge from "src/components/shared/Badge/Badge";
import Image from "next/image";

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "Filter & Discover",
    desc: "Connect with wallet, discover, buy NTFs, sell your NFTs and earn money",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "Connect wallet",
    desc: "Connect with wallet, discover, buy NTFs, sell your NFTs and earn money",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "Start trading",
    desc: "Connect with wallet, discover, buy NTFs, sell your NFTs and earn money",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "Earn money",
    desc: "Connect with wallet, discover, buy NTFs, sell your NFTs and earn money",
  },
];

const SectionHowItWork = ({ className = "", data = DEMO_DATA }) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 -top-1"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item, index) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              src={item.img}
              isFill={false}
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "blue"
                    : index === 1
                    ? "pink"
                    : index === 2
                    ? "yellow"
                    : "green"
                }
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
