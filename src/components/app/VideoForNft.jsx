import { useSelector } from "react-redux";
import { selectCurrentMediaRunning } from "src/redux/slices/mediaRunning.slice";

const VideoForNft = ({
  nftId,
  className = "absolute inset-0 z-10 flex items-center justify-center bg-neutral-700 rounded-3xl overflow-hidden",
  src = "./nft.mp4",
}) => {
  const currentMediaRunning = useSelector(selectCurrentMediaRunning);

  const IS_PLAY =
    currentMediaRunning?.nftId === nftId &&
    currentMediaRunning?.state === "playing";

  if (!IS_PLAY) {
    return null;
  }

  return (
    <div
      className={`${className} ${IS_PLAY ? "" : "opacity-0 z-[-1]"}`}
      title="Play"
      dangerouslySetInnerHTML={{
        __html: `<video class="w-full h-full" playsinline autoplay muted loop  >
                      <source src=${src} type="video/mp4" />
                      our browser does not support the video tag.
                    </video>`,
      }}
    />
  );
};

export default VideoForNft;
