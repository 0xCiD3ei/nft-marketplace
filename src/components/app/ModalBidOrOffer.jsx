import React, {useContext, useEffect, useState} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import Input from "src/components/shared/Input/Input";
import NcModal from "src/components/shared/NcModal/NcModal";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import Label from "src/components/app/Label/Label";
import {useAddress} from "@thirdweb-dev/react";
import webClientService from "src/lib/services/webClientService";
import {useSnackbar} from "notistack";

const ModalBidOrOffer = ({show, nft, auctionListing, onCloseModalEdit, loadNFT}) => {
	const {enqueueSnackbar} = useSnackbar();
	const {marketplace} = useContext(NFTMarketplaceContext);
	const [bidValue, setBidValue] = useState('0')
	const [loading, setLoading] = useState(false);
	const address = useAddress();
	const handleInputChange = (e) => {
		setBidValue(e.target.value);
	};
	
	useEffect(() => {
		if (auctionListing?.length > 0) {
			setBidValue(auctionListing[0]?.minimumBidCurrencyValue?.displayValue);
		}
	}, [auctionListing]);
	
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		
		if (+bidValue <= +auctionListing[0]?.minimumBidCurrencyValue?.displayValue) {
			enqueueSnackbar('There was an error when setting the price', {
				variant: 'error'
			});
			return;
		}
		
		try {
			setLoading(true);
			let txResult;
			if (!bidValue) {
				return;
			}
			
			const auctionId = +auctionListing[0].id;
			
			if (auctionListing.length > 0) {
				txResult = await marketplace?.englishAuctions.makeBid(
					auctionId,
					+bidValue
				);
				const response = await webClientService.addTransaction({
					nftId: auctionId,
					data: {
						address: address,
						bid: bidValue
					}
				})
				
				if (response.code === 200) {
					loadNFT().then();
					enqueueSnackbar('Place a bid successfully', {
						variant: 'success'
					})
				}
				
			} else {
				setLoading(false);
				enqueueSnackbar('No valid listing found for this NFT', {
					variant: 'error'
				})
				return;
			}
			onCloseModalEdit();
			setBidValue("0");
			setLoading(false);
			return txResult;
		} catch (e) {
			console.log(e);
			setLoading(false);
			enqueueSnackbar('An error has occurred', {
				variant: "error"
			})
		}
	};
	
	const renderContent = () => {
		return (
			<form action="#">
				<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
					Make A Bid
				</h3>
				<span className="text-sm">Are you sure you want to offer or bid?</span>
				<div className="mt-4 rounded-md shadow-sm">
					<Label>Bid Value</Label>
					<Input
						name={'bidValue'}
						value={bidValue}
						type={"text"}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="mt-4 space-x-3">
					<ButtonPrimary onClick={handleOnSubmit} loading={loading}>Submit</ButtonPrimary>
					<ButtonSecondary type="button" onClick={onCloseModalEdit}>
						Cancel
					</ButtonSecondary>
				</div>
			</form>
		);
	};
	
	const renderTrigger = () => {
		return null;
	};
	
	return (
		<NcModal
			isOpenProp={show}
			onCloseModal={onCloseModalEdit}
			contentExtraClass="max-w-lg"
			renderContent={renderContent}
			renderTrigger={renderTrigger}
			modalTitle=""
		/>
	);
};

export default ModalBidOrOffer;
