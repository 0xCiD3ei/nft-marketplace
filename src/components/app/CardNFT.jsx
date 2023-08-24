import Link from "next/link";
import Avatar from "src/components/shared/Avatar/Avatar";
import NcImage from "src/components/shared/NcImage/NcImage";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/outline";
import moment from "moment";
import {useContext} from "react";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import {useActiveListings} from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "src/constant/addresses";

const CardNFT = ({
  className = "",
  isLiked,
  nft,
  quantity,
}) => {
  
  const {marketplace} = useContext(NFTMarketplaceContext);
  
  const {
    data: directListing,
    isLoading: loadingListing,
  } = useActiveListings(marketplace, {
        tokenContract: NFT_COLLECTION_ADDRESS,
        tokenId: nft?.id,
      });
  
  const renderAvatars = () => {
    return (
      <div className="flex -space-x-1 ">
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
      </div>
    );
  };

  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nft?.image || ""}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
        </div>
        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
        {/*<LikeButton*/}
        {/*  liked={isLiked}*/}
        {/*  className="absolute top-3 right-3 z-10 !h-9"*/}
        {/*/>*/}
        <div className="absolute top-3 inset-x-3 flex"></div>
      </div>

      <div className="p-4 py-5 space-y-3">
        <div className="flex justify-between">
          {renderAvatars()}
          <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {quantity || "1"} in stock
          </span>
        </div>
        <h2 className={`text-lg font-medium`}>
          {nft?.name} #{nft?.id}
        </h2>

        <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

        <div className="flex justify-between items-end ">
          {loadingListing ? (
            <p className={"mt-4"}>Loading...</p>
          ) : directListing && directListing[0] ? (
            <Prices
              price={directListing[0]?.currencyValuePerToken.displayValue || 0}
              labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50"
            />
          ) : (
            <p className={"mt-4"}>Not listed</p>
          )}
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {nft?.date ? moment(nft?.date).startOf('minutes').fromNow() : "--"}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`nft/${nft?.id}`}
        className="absolute inset-0"
      ></Link>
    </div>
  );
};

export default CardNFT;
