import React, {useContext, useState} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import Input from "src/components/shared/Input/Input";
import NcModal from "src/components/shared/NcModal/NcModal";
import {useCreateAuctionListing} from "@thirdweb-dev/react";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import Label from "src/components/app/Label/Label";
import {NFT_COLLECTION_ADDRESS} from "src/constant/addresses";
import {useSnackbar} from "notistack";

const ModalAuction = ({show, nft, onCloseModalEdit}) => {
	const {enqueueSnackbar} = useSnackbar();
	const {marketplace} = useContext(NFTMarketplaceContext);
	const [state, setState] = useState({
		price: "0",
		floorPrice: "0",
		startTimestamp: "",
		endTimestamp: ""
	})
	const [loading, setLoading] = useState(false)
	
	const {mutateAsync: createAuctionListing} = useCreateAuctionListing(marketplace);
	const handleInputChange = (e, field) => {
		setState(prevState => ({...prevState, [field]: e.target.value}));
	};
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (new Date(state.startTimestamp) > new Date(state.endTimestamp)) {
			enqueueSnackbar('There was an error setting the time', {
				variant: 'error'
			})
			return;
		}
		
		if (+state.price <= 0 || +state.floorPrice <= 0) {
			enqueueSnackbar('There was an error when setting the price', {
				variant: 'error'
			});
			return;
		}
		try {
			setLoading(true);
			const txResult = await createAuctionListing({
				assetContractAddress: NFT_COLLECTION_ADDRESS,
				tokenId: nft.metadata.id,
				buyoutBidAmount: state.price,
				minimumBidAmount: state.floorPrice,
				startTimestamp: new Date(state.startTimestamp),
				endTimestamp: new Date(state.endTimestamp),
			})
			onCloseModalEdit();
			setState({
				price: "0",
				floorPrice: "0",
				startTimestamp: "",
				endTimestamp: ""
			})
			enqueueSnackbar('NFT listing successfully', {
				variant: 'success'
			});
			setLoading(false);
			return txResult;
		} catch (e) {
			console.log(e);
			setLoading(false);
			enqueueSnackbar('An error has occurred', {
				variant: 'error'
			});
		}
	};
	
	const renderContent = () => {
		return (
			<form action="#">
				<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
					Auction Listing
				</h3>
				<span className="text-sm">Are you sure you want to auction listing?</span>
				<div className="mt-4 rounded-md shadow-sm">
					<Label>Start Date</Label>
					<Input
						name={'startTimestamp'}
						value={state.startTimestamp}
						type={"datetime-local"}
						onChange={(e) => handleInputChange(e, "startTimestamp")}
					/>
				</div>
				<div className="mt-4 rounded-md shadow-sm">
					<Label>End Date</Label>
					<Input
						name={'endTimestamp'}
						value={state.endTimestamp}
						type={"datetime-local"}
						onChange={(e) => handleInputChange(e, "endTimestamp")}
					/>
				</div>
				<div className="mt-4 rounded-md shadow-sm">
					<Label>Starting Bid From</Label>
					<Input
						name={'floorPrice'}
						value={state.floorPrice}
						type={"text"}
						onChange={(e) => handleInputChange(e, "floorPrice")}
					/>
				</div>
				<div className="mt-4 rounded-md shadow-sm">
					<Label>Buyout Price</Label>
					<Input
						name={'price'}
						value={state.price}
						type={"text"}
						onChange={(e) => handleInputChange(e, "price")}
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

export default ModalAuction;
