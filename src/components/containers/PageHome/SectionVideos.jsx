import React, { useState } from "react";
import Heading from "src/components/shared/Heading/Heading";
import NcImage from "src/components/shared/NcImage/NcImage";
import NcPlayIcon from "src/components/shared/NcPlayIcon/NcPlayIcon";
import isSafariBrowser from "src/utils/isSafariBrowser";
import bg13 from "src/assets/images/bg/bg13.avif";

const VIDEOS_DEMO = [
  {
    id: "RzVvThhjAKw",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail: bg13,
  },
];

const SectionVideos = ({ videos = VIDEOS_DEMO, className = "" }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo] = useState(0);

  const renderMainVideo = () => {
    const video = videos[currentVideo];
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1${
              isSafariBrowser() ? "&mute=1" : ""
            }`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="rounded-3xl"
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon />
            </div>
            <NcImage
              containerClassName="absolute inset-0 rounded-3xl overflow-hidden z-0"
              className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300  "
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Check out our hottest videos. View more and share more new
            perspectives on just about any topic. Everyone’s welcome."
      >
        🎬 The Videos
      </Heading>

      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-7/12 dark:bg-neutral-800/80"></div>
        <div className="flex-grow relative  ">{renderMainVideo()}</div>
      </div>
    </div>
  );
};

export default SectionVideos;
