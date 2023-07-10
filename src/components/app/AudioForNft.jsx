import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentMediaRunning } from "src/redux/slices/mediaRunning.slice";
import { useTimeoutFn } from "react-use";
import isSafariBrowser from "src/utils/isSafariBrowser";

const AudioForNft = ({
  nftId,
  className = "absolute opacity-0 ",
  src = "./music.mp3",
}) => {
  const currentMediaRunning = useSelector(selectCurrentMediaRunning);

  let [isShowing, setIsShowing] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 200);

  const IS_PLAY =
    currentMediaRunning?.nftId === nftId &&
    currentMediaRunning?.state === "playing";

  useEffect(() => {
    if (currentMediaRunning?.state === "paused") {
      setIsShowing(false);
      resetIsShowing();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMediaRunning]);

  useEffect(() => {
    const audioEl = document.getElementById(nftId);
    if (!audioEl) return;

    if (IS_PLAY) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }, [IS_PLAY, nftId]);

  if (!isSafariBrowser() && !IS_PLAY) {
    return null;
  }

  // FOR SAFARI BROWSER
  if (!isShowing) {
    return null;
  }

  return (
    <div
      className={className}
      title="Play"
      dangerouslySetInnerHTML={{
        __html: `<audio id=${nftId} loop  >
                <source src=${src} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>`,
      }}
    ></div>
  );
};

export default AudioForNft;
