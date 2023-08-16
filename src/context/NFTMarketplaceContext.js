import React from "react";
import {ethers} from "ethers";
import {useRouter} from "next/router";
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client";
import {toast} from 'react-toastify';
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useMintNFT,
  useNFTs
} from "@thirdweb-dev/react";
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
  const nftCollection = useContract("0x739951B8Abb63A632785c59d88859F4A7e887836", "nft-collection").contract;
  const marketplace = useContract("0x7070bf67323D918b44D3Acd2AD764228cb05435a", "marketplace-v3").contract;
  const { mutateAsync: mintNft } = useMintNFT(nftCollection);

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      return `${subdomain}/ipfs/${added.path}`;
    } catch (error) {
      toast.error("Error while uploading to IPFS");
    }
  };

  const createNFT = async ({ name, description, price, image, category }) => {
    if (!name || !description || !price || !image || !category) {
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
    
    console.log('mint nft', response);
    
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
