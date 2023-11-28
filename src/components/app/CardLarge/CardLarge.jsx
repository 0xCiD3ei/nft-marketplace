import React, {useEffect, useState} from "react";
import Link from "next/link";
import NextPrev from "src/components/shared/NextPrev/NextPrev";
import NcImage from "src/components/shared/NcImage/NcImage";
import Avatar from "src/components/shared/Avatar/Avatar";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import LikeButton from "../LikeButton";
import TimeCountDown from "./TimeCountDown";
import collectionPng from "src/assets/images/nfts/collection.png";
import VerifyIcon from "../VerifyIcon";
import ItemTypeImageIcon from "src/components/app/ItemTypeImageIcon";
import webClientService from "src/lib/services/webClientService";
import ModalBidOrOffer from "src/components/app/ModalBidOrOffer";
import {useAddress} from "@thirdweb-dev/react";

const CardLarge = (props) => {
	const {
		className = "",
		isShowing = true,
		auction,
		onClickNext = () => {
		},
		onClickPrev = () => {
		},
	} = props;
	const [creator, setCreator] = useState();
	const [collection, setCollection] = useState();
	const [offerOrBidModal, setOfferOrBidModal] = useState(false);
	const address = useAddress();
	const [account, setAccount] = useState();
	const [dataNFT, setDataNFT] = useState();
	
	const loadNFT = async () => {
		const responseNFT = await webClientService.getNFTById(auction?.tokenId);
		setDataNFT(responseNFT.data.nft);
	}
	
	useEffect(() => {
		loadNFT().then();
	}, [auction]);
	
	useEffect(() => {
		(async () => {
			if (address) {
				const accountResponse = await webClientService.getAccountByAddress(address);
				setAccount(accountResponse.data);
			}
		})();
	}, [address]);
	
	useEffect(() => {
		if (auction) {
			(async () => {
				const responseCreator = await webClientService.getAccountByAddress(auction?.creatorAddress);
				setCreator(responseCreator.data);
				const responseCollection = await webClientService.getCategoryById({
					categoryId: auction?.asset?.category
				})
				setCollection(responseCollection.data)
			})();
		}
	}, [auction]);
	
	return (
		<div
			className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse lg:flex-row justify-end  ${className}`}
		>
			<div
				className="lg:absolute z-10 lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 -mt-2 lg:mt-0 sm:px-5 lg:px-0 w-full lg:max-w-lg ">
				<div
					className="nc-CardLarge1__left p-4 sm:p-8 xl:py-14 md:px-10 bg-white dark:bg-neutral-900 shadow-lg rounded-3xl space-y-3 sm:space-y-8 ">
					{/* TITLE */}
					<h2 className="text-2xl lg:text-3xl 2xl:text-5xl font-semibold ">
						<Link href={`/nft/${auction.tokenId}`} title="Walking On Air">
							{auction?.asset?.name} #{auction.tokenId}
						</Link>
					</h2>
					
					{/* AUTHOR AND COLLECTION */}
					<div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-12">
						<div className="flex items-center">
							<div className="flex-shrink-0 h-10 w-10">
								<Avatar sizeClass="w-10 h-10" imgUrl={creator?.avatar}/>
							</div>
							<div className="ml-3">
								<div className="text-xs dark:text-neutral-400">Creator</div>
								<div className="text-sm font-semibold flex items-center">
									<span>{creator?.fullName || "Unnamed"}</span>
									<VerifyIcon/>
								</div>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex-shrink-0 h-10 w-10">
								<Avatar sizeClass="w-10 h-10" imgUrl={collection ? collection?.image : collectionPng}/>
							</div>
							<div className="ml-3">
								<div className="text-xs dark:text-neutral-400">Collection</div>
								<div className="text-sm font-semibold ">{collection?.name}</div>
							</div>
						</div>
					</div>
					
					{/* PRICE */}
					<div className="pt-6">
						<div className="flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
              <span
								className="block absolute bottom-full translate-y-1.5 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400 ring ring-offset-0 ring-white dark:ring-neutral-900">
                Current Bid
              </span>
							<span className="text-3xl xl:text-4xl font-semibold text-green-500">
                {auction?.minimumBidCurrencyValue?.displayValue} {auction?.minimumBidCurrencyValue?.symbol}
              </span>
							<span className="text-lg text-neutral-400 sm:ml-3.5">
                (≈ ${auction?.minimumBidCurrencyValue?.displayValue * 8})
              </span>
						</div>
					</div>
					
					{/* AUTION TIME */}
					<TimeCountDown endTime={auction?.endTimeInSeconds}/>
					
					<div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700"></div>
					
					{/* DESCRIPTION */}
					<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
						{
							auction && auction?.creatorAddress !== address && (
								<ButtonPrimary className="flex-1" onClick={() => setOfferOrBidModal(true)}>
									Place a bid
								</ButtonPrimary>
							)
						}
						<ButtonSecondary to={`/nft/${auction.tokenId}`} className="flex-1">
							View item
						</ButtonSecondary>
					</div>
				</div>
				<div className="p-4 sm:pt-8 sm:px-10 ">
					<NextPrev
						btnClassName="w-11 h-11 text-xl"
						onClickNext={onClickNext}
						onClickPrev={onClickPrev}
					/>
				</div>
			</div>
			
			<div className="w-full lg:w-[64%] relative ">
				<div className="nc-CardLarge1__right ">
					<Link href={`/nft/${auction.tokenId}`}>
						<NcImage
							containerClassName="aspect-w-1 aspect-h-1 relative"
							className="absolute inset-0 object-cover rounded-3xl sm:rounded-[40px] border-4 sm:border-[14px] border-white dark:border-neutral-800"
							src={auction?.asset?.image}
							alt={"title"}
						/>
					</Link>
					
					{/* META TYPE */}
					<ItemTypeImageIcon className="absolute w-8 h-8 md:w-10 md:h-10 left-3 bottom-3 sm:left-7 sm:bottom-7 "/>
					
					{/* META FAVORITES */}
					<LikeButton
						className="absolute right-3 top-3 sm:right-7 sm:top-7"
						account={account}
						nftId={auction.tokenId}
						liked={dataNFT?.favorites?.includes(account?._id)}
						total={dataNFT?.favorites?.length}
					/>
				</div>
			</div>
			
			<ModalBidOrOffer
				show={offerOrBidModal}
				nft={auction}
				auctionListing={[auction] || []}
				onCloseModalEdit={() => setOfferOrBidModal(false)}
			/>
		</div>
	);
};

export default CardLarge;
