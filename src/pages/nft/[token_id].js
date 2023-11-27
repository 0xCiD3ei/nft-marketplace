import MainLayout from "src/components/layouts/MainLayout";
import Badge from "src/components/shared/Badge/Badge";
import LikeSaveBtns from "src/components/containers/NftDetailPage/LikeSaveBtns";
import Avatar from "src/components/shared/Avatar/Avatar";
import Link from "next/link";
import VerifyIcon from "src/components/app/VerifyIcon";
import collectionPng from "src/assets/images/nfts/collection.png";
import TimeCountDown from "src/components/containers/NftDetailPage/TimeCountDown";
import TabDetail from "src/components/containers/NftDetailPage/TabDetail";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import NcImage from "src/components/shared/NcImage/NcImage";
import LikeButton from "src/components/app/LikeButton";
import AccordionInfo from "src/components/containers/NftDetailPage/AccordionInfo";
import BackgroundSection from "src/components/app/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "src/components/app/SectionSliderCategories/SectionSliderCategories";
import SectionBecomeAnAuthor from "src/components/app/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import {useRouter} from "next/router";
import {
  ThirdwebSDK,
  useAddress,
  useCancelDirectListing,
  useContractEvents,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import {useContext, useEffect, useState} from "react";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import ItemTypeImageIcon from "src/components/app/ItemTypeImageIcon";
import webClientService from "src/lib/services/webClientService";
import dbConnect from "src/lib/dbConnect";
import ModalDirectListing from "src/components/app/ModalDirectListing";
import ModalAuction from "src/components/app/ModalAuction";
import {Helmet} from "react-helmet";
import ModalBidOrOffer from "src/components/app/ModalBidOrOffer";
import {NFT_COLLECTION_ADDRESS} from "src/constant/addresses";

export default function NFTDetailPage({className = "", isPreviewMode, nft}) {
	const router = useRouter();
	const address = useAddress();
	const [owner, setOwner] = useState();
	const [account, setAccount] = useState();
	const [category, setCategory] = useState();
	const {marketplace, nftCollection} = useContext(NFTMarketplaceContext);
	const {mutateAsync: cancelDirectListing} = useCancelDirectListing(marketplace);
	const [directListingModal, setDirectListingModal] = useState(false);
	const [auctionModal, setAuctionModal] = useState(false);
	const [offerOrBidModal, setOfferOrBidModal] = useState(false);
	const [dataNFT, setDataNFT] = useState();
	
	const {data: directListing, isLoading: loadingDirectListing} = useValidDirectListings(marketplace, {
		tokenContract: NFT_COLLECTION_ADDRESS,
		tokenId: nft.metadata.id
	})
	
	const {data: auctionListing, isLoading: loadingAuction} = useValidEnglishAuctions(marketplace, {
		tokenContract: NFT_COLLECTION_ADDRESS,
		tokenId: nft.metadata.id
	})
	
	useEffect(() => {
		(async () => {
			const ownerResponse = await webClientService.getAccountByAddress(nft?.owner);
			setOwner(ownerResponse.data);
		})();
	}, [nft?.owner])
	
	useEffect(() => {
		(async () => {
			if (address) {
				const accountResponse = await webClientService.getAccountByAddress(address);
				setAccount(accountResponse.data);
			}
		})();
	}, [address]);
	
	useEffect(() => {
		(
			async () => {
				const response = await webClientService.getCategoryById({
					categoryId: nft.metadata.category
				})
				setCategory(response.data);
				const responseNFT = await webClientService.getNFTById(nft.metadata.id);
				setDataNFT(responseNFT.data.nft);
			}
		)();
	}, [nft?.metadata])
	
	const {data: transferEvents, isLoading: loadingTransferEvents} =
		useContractEvents(nftCollection, "Transfer", {
			queryFilter: {
				filters: {
					tokenId: nft.metadata.id,
				},
				order: "desc",
			},
			subscribe: true
		});
	
	const buyListing = async () => {
		let txResult;
		
		if (auctionListing?.[0]) {
			txResult = await marketplace?.englishAuctions.buyoutAuction(
				auctionListing[0].id
			);
		} else if (directListing?.[0]) {
			txResult = await marketplace?.directListings.buyFromListing(
				directListing[0].id,
				1
			);
		} else {
			throw new Error("No listing found");
		}
		
		return txResult;
	}
	
	
	const renderSection1 = () => {
		return (
			<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
				<Helmet>
					<title>{nft.metadata.name}</title>
				</Helmet>
				{/* ---------- 1 ----------  */}
				<div className="pb-9 space-y-5">
					<div className="flex justify-between items-center">
						<Badge name="Virtual Worlds" color="green"/>
						<LikeSaveBtns/>
					</div>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
						{nft?.metadata?.name} #{nft?.metadata?.id}
					</h2>
					
					{/* ---------- 4 ----------  */}
					<div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
						<div className="flex items-center ">
							<Avatar imgUrl={""} sizeClass="h-9 w-9" radius="rounded-full"/>
							<span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
              <span className="text-sm">Creator</span>
                <Link
									href={{pathname: "author", query: `query`}}
								>
                  <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                    <span>{"Admin"}</span>
                    <VerifyIcon iconClass="w-4 h-4"/>
                  </span>
                </Link>
              </span>
						</div>
						<div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700"></div>
						<div className="flex items-center">
							<Avatar
								imgUrl={category ? category.image : collectionPng}
								sizeClass="h-9 w-9"
								radius="rounded-full"
							/>
							<span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{category ? category.name : "The Moon Ape"}</span>
                  <VerifyIcon iconClass="w-4 h-4"/>
                </span>
              </span>
						</div>
					</div>
				</div>
				
				{/* ---------- 6 ----------  */}
				<div className="py-9">
					<TimeCountDown
						endTime={(directListing && directListing[0]?.endTimeInSeconds) || (auctionListing && auctionListing[0]?.endTimeInSeconds)}/>
				</div>
				
				{/* ---------- 7 ----------  */}
				{/* PRICE */}
				<div className="pb-9 pt-14">
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
						{loadingDirectListing || loadingAuction ? (
							<div>Loading...</div>
						) : directListing && directListing[0] ? (
							<div
								className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
                <span
									className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                  Price
                </span>
								<span className="text-3xl xl:text-4xl font-semibold text-green-500">
                  {directListing[0]?.currencyValuePerToken?.displayValue || 0} {directListing[0]?.currencyValuePerToken?.symbol || "MATIC"}
                </span>
								<span className="text-lg text-neutral-400 sm:ml-5">
                  ( ≈ ${directListing[0]?.currencyValuePerToken?.displayValue * 8 || 0})
                </span>
							</div>
						) : auctionListing && auctionListing[0] ? (
							<div className="flex flex-col">
								<div
									className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
                  <span
										className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                    Bid
                  </span>
									<span className="text-3xl xl:text-4xl font-semibold text-green-500">
                    {auctionListing[0]?.minimumBidCurrencyValue?.displayValue || 0} {auctionListing[0]?.minimumBidCurrencyValue?.symbol || "MATIC"}
                  </span>
									<span className="text-lg text-neutral-400 sm:ml-5">
                    ( ≈ ${auctionListing[0]?.minimumBidCurrencyValue?.displayValue * 8 || 0})
                  </span>
								</div>
								<div
									className="mt-12 flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
                  <span
										className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                    Price
                  </span>
									<span className="text-3xl xl:text-4xl font-semibold text-green-500">
                    {auctionListing[0]?.buyoutCurrencyValue?.displayValue || 0} {auctionListing[0]?.buyoutCurrencyValue?.symbol || "MATIC"}
                  </span>
									<span className="text-lg text-neutral-400 sm:ml-5">
                    ( ≈ ${auctionListing[0]?.buyoutCurrencyValue?.displayValue * 8 || 0})
                  </span>
								</div>
							</div>
						) : (
							<div className={""}>Not listed</div>
						)}
						<span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
              [{nft?.supply} in stock]
            </span>
					</div>
					
					<div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
						{
							loadingDirectListing || loadingAuction ? (
								<div></div>
							) : directListing?.length > 0 || auctionListing?.length > 0 ?
								nft?.owner === address || auctionListing[0]?.creatorAddress === address ? (
									<ButtonPrimary
										onClick={() => cancelDirectListing(nft?.id)}
										className="flex-1"
									>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path
												d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M7 12H14"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<span className="ml-2.5">Cancel listing</span>
									</ButtonPrimary>
								) : (
									<ButtonPrimary
										onClick={async () => buyListing()}
										className="flex-1"
									>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path
												d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M7 12H14"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<span className="ml-2.5">Buy NFT</span>
									</ButtonPrimary>
								) : (
									<div></div>
								)
						}
						
						{
							loadingDirectListing || loadingAuction ? (
								<div></div>
							) : directListing?.length === 0 && auctionListing?.length === 0 && nft.owner === address ?
								(
									<>
										<ButtonPrimary
											styl={{
												marginLeft: 0
											}}
											className="flex-1"
											onClick={() => setDirectListingModal(true)}
										>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7 12H14"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											
											<span className="ml-2.5">Direct Listing</span>
										</ButtonPrimary>
										<ButtonPrimary
											className="flex-1"
											onClick={() => setAuctionModal(true)}
										>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7 12H14"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<span className="ml-2.5">Auction</span>
										</ButtonPrimary>
									</>
								)
								: (
									<div></div>
								)
						}
						
						{
							auctionListing?.length > 0 && auctionListing[0]?.creatorAddress !== address && (
								<ButtonSecondary onClick={() => setOfferOrBidModal(true)} className="flex-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path
											d="M8.57007 15.27L15.11 8.72998"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span className="ml-2.5"> Place a Bid</span>
								</ButtonSecondary>
							)
						}
					</div>
				</div>
				
				{/* ---------- 9 ----------  */}
				<div className="pt-9">
					<TabDetail
						owner={owner}
						transferEvents={transferEvents || []}
					/>
				</div>
			</div>
		)
	}
	
	return (
		<div
			className={`nc-NftDetailPage ${className}`}
			data-nc-id="NftDetailPage"
		>
			{/* MAIn */}
			<main className="container mt-11 flex ">
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
					{/* CONTENT */}
					<div className="space-y-8 lg:space-y-10">
						{/* HEADING */}
						<div className="relative">
							<NcImage
								src={nft ? nft?.metadata?.image : ""}
								containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
							/>
							{/* META TYPE */}
							<ItemTypeImageIcon className="absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10"/>
							
							{/* META FAVORITES */}
							<LikeButton className="absolute right-3 top-3" account={account} nftId={nft.metadata.id}
													liked={dataNFT?.favorites.includes(account?._id)} total={dataNFT?.favorites.length}/>
						</div>
						
						<AccordionInfo data={nft?.metadata || []}/>
					</div>
					
					{/* SIDEBAR */}
					<div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
						{renderSection1()}
					</div>
				</div>
			</main>
			
			{/* OTHER SECTION */}
			{!isPreviewMode && (
				<div className="container py-24 lg:py-32">
					{/* SECTION 1 */}
					<div className="relative py-24 lg:py-28">
						<BackgroundSection/>
						<SectionSliderCategories/>
					</div>
					
					{/* SECTION */}
					<SectionBecomeAnAuthor className="pt-24 lg:pt-32"/>
				</div>
			)}
			<ModalDirectListing
				show={directListingModal}
				nft={nft}
				onCloseModalEdit={() => setDirectListingModal(false)}
			/>
			<ModalAuction
				show={auctionModal}
				nft={nft}
				onCloseModalEdit={() => setAuctionModal(false)}
			/>
			<ModalBidOrOffer
				show={offerOrBidModal}
				nft={nft}
				auctionListing={auctionListing || []}
				onCloseModalEdit={() => setOfferOrBidModal(false)}
			/>
		</div>
	)
}

NFTDetailPage.getLayout = (page) => (
	<MainLayout>
		{page}
	</MainLayout>
)

export const getStaticProps = async (context) => {
	const token_id = context?.params.token_id;
	
	const sdk = new ThirdwebSDK("mumbai");
	const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);
	
	const nft = await contract.erc721.get(token_id);
	return {
		props: {
			nft
		},
		revalidate: 1
	}
}

export const getStaticPaths = async () => {
	await dbConnect();
	const sdk = new ThirdwebSDK("mumbai");
	const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);
	
	const nfts = await contract.erc721.getAll();
	
	const paths = nfts.map((nft) => {
		return {
			params: {
				token_id: nft.metadata.id
			}
		}
	})
	
	return {
		paths,
		fallback: "blocking"
	}
}