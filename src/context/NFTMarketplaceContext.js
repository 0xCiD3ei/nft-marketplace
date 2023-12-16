import React from "react";
import {create as ipfsHttpClient} from "ipfs-http-client";
import {useAddress, useContract, useMintNFT,} from "@thirdweb-dev/react";
import {MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS} from "src/constant/addresses";
import webClientService from "src/lib/services/webClientService";
import {enqueueSnackbar} from "notistack";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
	"base64"
)}`;

const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;

const client = ipfsHttpClient({
	host: "infura-ipfs.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) => {
	const address = useAddress();
	const nftCollection = useContract(NFT_COLLECTION_ADDRESS, "nft-collection").contract;
	const marketplace = useContract(MARKETPLACE_ADDRESS, "marketplace-v3").contract;
	const {mutateAsync: mintNft} = useMintNFT(nftCollection);
	
	const uploadToIPFS = async (file) => {
		try {
			const added = await client.add({content: file});
			return `${subdomain}/ipfs/${added.path}`;
		} catch (error) {
			enqueueSnackbar("Error while uploading to IPFS", {
				variant: 'error',
			});
		}
	};
	
	const createNFT = async ({name, description, image, category}) => {
		if (!name || !description || !image || !category) {
			return enqueueSnackbar("Data is missing", {
				variant: 'error',
			});
		}
		
		const response = await mintNft({
			metadata: {
				name: name,
				description: description,
				image: image,
				date: new Date().valueOf(),
				category: category
			},
			to: address
		})
		
		const result = await webClientService.createNFT({
			metadata: {
				id: `${response.id.toNumber()}`,
				name: name,
				description: description,
				image: image,
				date: new Date().valueOf(),
				category: category
			},
			owner: address,
			supply: "1",
			type: "ERC721"
		})
		return result;
	};
	
	return (
		<NFTMarketplaceContext.Provider
			value={{
				nftCollection,
				marketplace,
				uploadToIPFS,
				createNFT,
			}}
		>
			{children}
		</NFTMarketplaceContext.Provider>
	);
};



