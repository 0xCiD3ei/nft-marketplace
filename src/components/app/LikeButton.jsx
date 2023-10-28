import React, {useEffect, useState} from "react";
import webClientService from "src/lib/services/webClientService";
import {useSnackbar} from "notistack";
import {useAddress} from "@thirdweb-dev/react";

const LikeButton = ({ className, liked = false, nftId, account, total }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLiked, setIsLiked] = useState(liked);
  const [totalLiked, setTotalLiked] = useState(total);
  const address = useAddress();
  
  useEffect(() => {
    setIsLiked(liked);
    setTotalLiked(total);
  }, [liked, total, nftId, address]);

  return (
    <button
      className={`bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white ${className}`}
      onClick={async () => {
        const response = await webClientService.favouritesNFT({nftId: nftId, accountId: account?._id});
        if(response.data) {
          setIsLiked(response.data.favorites.includes(account?._id));
          setTotalLiked(response.data.favorites.length);
          enqueueSnackbar(response.message, {
            variant: 'success'
          })
        }
      }}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke="currentColor"
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ml-2 text-sm">{totalLiked || 0 }</span>
    </button>
  );
};

export default LikeButton;
