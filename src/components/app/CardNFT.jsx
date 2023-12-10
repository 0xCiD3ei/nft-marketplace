import Link from "next/link";
import Avatar from "src/components/shared/Avatar/Avatar";
import NcImage from "src/components/shared/NcImage/NcImage";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import Prices from "./Prices";
import {ClockIcon} from "@heroicons/react/outline";
import moment from "moment";
import {useContext, useEffect, useState} from "react";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import {useValidDirectListings, useValidEnglishAuctions} from "@thirdweb-dev/react";
import {NFT_COLLECTION_ADDRESS} from "src/constant/addresses";
import WebClientService from "src/lib/services/webClientService";
import {useRouter} from "next/router";

const CardNFT = ({className = "", isLiked, nft, quantity, onUpdateData}) => {
	const {marketplace} = useContext(NFTMarketplaceContext);
	const [owner, setOwner] = useState();
	const router = useRouter();
	
	const {
		data: directListing,
		isLoading: loadingDirectListing,
	} = useValidDirectListings(marketplace, {
		tokenContract: NFT_COLLECTION_ADDRESS,
		tokenId: nft?.metadata?.id,
	});
	
	//Add for auciton section
	const {data: auctionListing, isLoading: loadingAuction} =
		useValidEnglishAuctions(marketplace, {
			tokenContract: NFT_COLLECTION_ADDRESS,
			tokenId: nft?.metadata?.id,
		});
	
	useEffect(() => {
		(async () => {
			if (nft) {
				const response = await WebClientService.getAccountByAddress(nft?.owner);
				setOwner(response.data);
			}
		})();
	}, [nft]);
	
	const renderAvatars = () => {
		return (
			<div className="flex-space-x-1 ">
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
						src={nft?.metadata?.image || ""}
						className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
					/>
				</div>
				<ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9"/>
				<div className="absolute top-3 inset-x-3 flex"></div>
			</div>
			
			<div className="p-4 py-5 space-y-3">
				<div className="flex justify-between items-start">
					<Avatar
						imgUrl={owner?.avatar || ""}
						containerClassName="ring-2 ring-white dark:ring-neutral-900"
						sizeClass="h-5 w-5 text-sm"
						onClick={() => {
							router.push(`/author/${owner?.address}`);
						}}
					/>
					<span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {nft?.quantity || "1"} in stock
          </span>
				</div>
				<h2 className={`text-lg font-medium`}>
					{nft?.metadata?.name} #{nft?.metadata?.id}
				</h2>
				
				<div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>
				
				<div className="flex justify-between items-end ">
					{loadingDirectListing || loadingAuction ? (
						<p className={"mt-4"}>Loading...</p>
					) : directListing.length > 0 ? (
						<Prices
							price={directListing[0]?.currencyValuePerToken.displayValue}
							labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50"
						/>
					) : auctionListing.length > 0 ? (
						<Prices
							labelText={'Current Bid'}
							price={auctionListing[0]?.minimumBidCurrencyValue.displayValue}
							labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50"
						/>
					) : (
						<p className={"mt-4"}>Not listed</p>
					)}
					<div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
						<ClockIcon className="w-4 h-4"/>
						<span className="ml-1 mt-0.5">
              {nft?.metadata?.date ? moment(nft?.metadata?.date).startOf('minutes').fromNow() : "--"}
            </span>
					</div>
				</div>
			</div>
			
			<Link
				href={`/nft/${nft?.metadata?.id}`}
				className="absolute inset-0"
			></Link>
		</div>
	);
};

export default CardNFT;
