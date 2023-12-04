import React, {useContext, useState} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import Input from "src/components/shared/Input/Input";
import NcModal from "src/components/shared/NcModal/NcModal";
import {useCreateDirectListing} from "@thirdweb-dev/react";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import Label from "src/components/app/Label/Label";
import {NFT_COLLECTION_ADDRESS} from "src/constant/addresses";
import {enqueueSnackbar} from "notistack";

const ModalDirectListing = ({show, nft, onCloseModalEdit}) => {
	const {marketplace} = useContext(NFTMarketplaceContext);
	const [state, setState] = useState({
		price: "0",
		startTimestamp: "",
		endTimeStamp: "",
	});
	const [loading, setLoading] = useState(false);
	const {mutateAsync: createDirectListing} = useCreateDirectListing(marketplace);
	
	const handleInputChange = (e, field) => {
		setState(prevState => ({...prevState, [field]: e.target.value}));
	};
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (new Date(state.startTimestamp) > new Date(state.endTimeStamp)) {
			enqueueSnackbar('There was an error setting the time', {
				variant: 'error'
			})
			return;
		}
		
		if (+state.price <= 0) {
			enqueueSnackbar('There was an error when setting the price', {
				variant: 'error'
			});
			return;
		}
		
		try {
			setLoading(true);
			const txResult = await createDirectListing({
				assetContractAddress: NFT_COLLECTION_ADDRESS,
				tokenId: nft.metadata.id,
				pricePerToken: state.price,
				quantity: 1,
				startTimestamp: new Date(state.startTimestamp),
				endTimestamp: new Date(state.endTimeStamp),
			})
			onCloseModalEdit();
			setState({
				price: "0",
				startTimestamp: "",
				endTimeStamp: "",
			});
			setLoading(false);
			enqueueSnackbar('Listing NFT successfully', {
				variant: 'success'
			});
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
					Direct Listing
				</h3>
				<span className="text-sm">Are you sure you want to direct listing?</span>
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
						name={'endTimeStamp'}
						value={state.endTimeStamp}
						type={"datetime-local"}
						onChange={(e) => handleInputChange(e, "endTimeStamp")}
					/>
				</div>
				<div className="mt-4 rounded-md shadow-sm">
					<Label>Price</Label>
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

export default ModalDirectListing;
