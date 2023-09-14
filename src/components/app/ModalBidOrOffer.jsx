import React, {useContext, useState} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import Input from "src/components/shared/Input/Input";
import NcModal from "src/components/shared/NcModal/NcModal";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import Label from "src/components/app/Label/Label";
import {useMakeBid, useMakeOffer} from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "src/constant/addresses";

const ModalBidOrOffer = ({show, nft, auctionListing, directListing, onCloseModalEdit}) => {
	const {marketplace} = useContext(NFTMarketplaceContext);
	const [bidValue, setBidValue] = useState('0')
	const [loading, setLoading] = useState(false);
	const { mutateAsync: makeOffer} = useMakeOffer(marketplace);
	const { mutateAsync: makeBid } = useMakeBid(marketplace);
	const handleInputChange = (e) => {
		setBidValue(e.target.value);
	};
	
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let txResult;
		if (!bidValue) {
			return;
		}
		
		if (auctionListing.length > 0) {
			txResult = await marketplace?.englishAuctions.makeBid(
				auctionListing[0].id,
				bidValue
			);
		} else if (directListing.length > 0) {
			txResult = await marketplace?.offers.makeOffer({
				assetContractAddress: NFT_COLLECTION_ADDRESS,
				tokenId: nft.metadata.id,
				totalPrice: bidValue,
			});
		} else {
			throw new Error("No valid listing found for this NFT");
		}
		onCloseModalEdit();
		setBidValue("0");
		setLoading(false);
		return txResult;
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
