import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentMediaRunning,
  changeStateMediaRunning,
  addNewIdListAudio,
  selectCurrentMediaRunning,
} from "src/redux/slices/mediaRunning.slice";
import iconPlaying from "src/assets/images/icon-playing.gif";
import isSafariBrowser from "src/utils/isSafariBrowser";

const ButtonPlayMusicRunningContainer = ({
  className = "",
  nftId,
  renderChildren,
  renderDefaultBtn,
  renderLoadingBtn,
  renderPlayingBtn,
}) => {
  const currentMediaRunning = useSelector(selectCurrentMediaRunning);
  const dispatch = useDispatch();

  const mediaState = currentMediaRunning?.state;

  useEffect(() => {
    // check safari
    if (!nftId || !isSafariBrowser()) {
      return;
    }
    dispatch(addNewIdListAudio(nftId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftId]);

  const handleClickNewAudio = () => {
    return dispatch(
      changeCurrentMediaRunning({
        nftId: nftId,
        state: "playing",
        // state: "loading",
      })
    );
  };

  const handleClickNewAudioWhenMediaRunning = () => {
    if (nftId === currentMediaRunning.nftId) {
      return dispatch(
        changeCurrentMediaRunning({
          nftId,
          state: "playing",
        })
      );
    }
    return dispatch(
      changeCurrentMediaRunning({
        nftId,
        state: "playing",
        // state: "loading",
      })
    );
  };

  const handleClickButton = () => {
    // PLAYING MEDIA RUNNING FOR SAFARI
    const mediaEl = document.getElementById(nftId);
    if (mediaEl) {
      mediaEl.play();
    }

    // IF NOT EXIST MEDIA
    if (!currentMediaRunning?.nftId || !currentMediaRunning?.state) {
      return handleClickNewAudio();
    }

    // IF MEDIA RUNNING AND CLICK OTHER POST
    if (currentMediaRunning.nftId !== nftId) {
      return handleClickNewAudioWhenMediaRunning();
    }

    if (currentMediaRunning.state === "playing") {
      return dispatch(changeStateMediaRunning("paused"));
    }

    // if (currentMediaRunning.state === "loading") {
    //   return;
    // }

    return dispatch(changeStateMediaRunning("playing"));
  };

  const _renderDefaultBtn = () => {
    if (renderDefaultBtn) {
      return renderDefaultBtn();
    }
    return "Media Icon...";
  };

  const _renderLoadingBtn = () => {
    // RENDER DEFAULT IF IT NOT CURRENT
    if (currentMediaRunning.nftId !== nftId) {
      return _renderDefaultBtn();
    }

    // RENDER WHEN IS CURRENT
    if (renderLoadingBtn) {
      return renderLoadingBtn();
    }
    return "Loading...";
  };

  const _renderPlayingBtn = () => {
    // RENDER DEFAULT IF IT NOT CURRENT
    if (currentMediaRunning.nftId !== nftId) {
      return _renderDefaultBtn();
    }

    // RENDER WHEN IS CURRENT
    if (renderPlayingBtn) {
      return renderPlayingBtn();
    }

    return (
      <span className="z-10 bg-neutral-900 bg-opacity-60 rounded-full flex  items-center justify-center text-xl text-white border border-white w-11 h-11 cursor-pointer">
        <img className="w-5" src={iconPlaying} alt="paused" />
      </span>
    );
  };

  return (
    <div
      className={`nc-ButtonPlayMusicRunningContainer select-none ${className}`}
      data-nc-id="ButtonPlayMusicRunningContainer"
      onClick={handleClickButton}
    >
      {renderChildren ? (
        renderChildren(currentMediaRunning.nftId === nftId, mediaState)
      ) : (
        <>
          {(!mediaState || mediaState === "paused" || mediaState === "ended") &&
            _renderDefaultBtn()}

          {/* LOADDING ICON */}
          {/* {mediaState === "loading" && _renderLoadingBtn()} */}

          {/* PLAYING ICON */}
          {mediaState === "playing" && _renderPlayingBtn()}
        </>
      )}
    </div>
  );
};

export default ButtonPlayMusicRunningContainer;
