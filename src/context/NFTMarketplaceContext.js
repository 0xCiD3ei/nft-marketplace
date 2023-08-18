import React from "react";
import {create as ipfsHttpClient} from "ipfs-http-client";
import {toast} from 'react-toastify';
import {
  useAddress,
  useContract,
  useMintNFT,
} from "@thirdweb-dev/react";
import {NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS} from "src/constant/addresses";
import webClientService from "src/lib/services/webClientService";

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

export const NFTMarketplaceProvider = ({ children }) => {
  const address = useAddress();
  const nftCollection = useContract(NFT_COLLECTION_ADDRESS, "nft-collection").contract;
  const marketplace = useContract(MARKETPLACE_ADDRESS, "marketplace").contract;
  const { mutateAsync: mintNft } = useMintNFT(nftCollection);

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      return `${subdomain}/ipfs/${added.path}`;
    } catch (error) {
      toast.error("Error while uploading to IPFS");
    }
  };

  const createNFT = async ({ name, description, image, category }) => {
    if (!name || !description || !image || !category) {
      return toast.error("Data is missing");
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



