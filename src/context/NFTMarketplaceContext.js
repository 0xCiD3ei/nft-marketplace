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
  const { contract } = useContract("0x40b3851f39B336aB5Dd4FbAEc4915139455bD8aa");
  const nftCollection = useContract("0x739951B8Abb63A632785c59d88859F4A7e887836", "nft-collection").contract;
  const marketplace = useContract("0x7070bf67323D918b44D3Acd2AD764228cb05435a", "marketplace-v3").contract;
  const { data: listingPrice } = useContractRead(contract, "getListingPrice");
  const {data: NFTs} = useContractRead(contract, "getAllNFTs");

  const { mutateAsync: createToken } = useContractWrite(contract, "createToken");
  const { mutateAsync: resellToken } = useContractWrite(contract, "resellToken");
  const { mutateAsync: tokenURI} = useContractWrite(contract, "tokenURI");
  const { mutateAsync: mintNft, isLoading: mintLoading, error: mintError } = useMintNFT(nftCollection);
  const router = useRouter();

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

    // const data = JSON.stringify({ name, description, price, image, category, owner });
    // try {
    //   const added = await client.add(data);
    //   const url = `https://ipfs.io/ipfs/${added.path}`;
    //   await createSale(url, price);
    //   await webClientService.createNFT({ name, description, price, image, category, owner });
    //   toast.success("Create NFT successfully!");
    // } catch (error) {
    //   toast.error("Error while creating NFT");
    // }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, !isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const transaction = !isReselling ?
        await createToken({
          args: [url, price],
          overrides: { value: listingPrice }
          }) :
        await resellToken({
          args: [id, price],
          overrides: { value: listingPrice }
        });
      return await transaction;
    } catch (error) {
      console.log("Error while creating sale", error);
      toast.error("Error while creating sale");
    }
  };

  const fetchNFTs = async () => {
    try {
      const items = await Promise.all(
        NFTs.map(
          async ({ tokenId, seller, owner, price: unformulatedPrice }) => {
            const _tokenURI = await tokenURI({
              args: [tokenId],
            });
            
            console.log("tokenURI", _tokenURI);

            const {
              data: { image, name, description, category },
            } = await axios.get(_tokenURI);
            const price = ethers.utils.formatUnits(
              unformulatedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              category,
              tokenURI,
            };
          }
        )
      );
      console.log("Fetched NFTs successfully!");
      return items;
    } catch (error) {
      console.log("Error while fetching NFTs");
    }
  };

  // useEffect(() => {
  //   fetchNFTs();
  // }, []);

  // const fetchMyNFTsOrListedNFTs = async (type) => {
  //   try {
  //     const contract = await connectingWithSmartContract();

  //     const data =
  //       type == "fetchItemsListed"
  //         ? await contract.fetchItemsListed()
  //         : await contract.fetchMyNFTs();

  //     const items = await Promise.all(
  //       data.map(
  //         async ({ tokenId, seller, owner, price: unformattedPrice }) => {
  //           const tokenURI = await contract.tokenURI(tokenId);
  //           const {
  //             data: { image, name, description },
  //           } = await axios.get(tokenURI);
  //           const price = ethers.utils.formatUnits(
  //             unformattedPrice.toString(),
  //             "ether"
  //           );

  //           return {
  //             price,
  //             tokenId: tokenId.toNumber(),
  //             seller,
  //             owner,
  //             image,
  //             name,
  //             description,
  //             tokenURI,
  //           };
  //         }
  //       )
  //     );
  //     return items;
  //   } catch (error) {
  //     toast.error("Error while fetching listed NFTs");
  //   }
  // };

  // useEffect(() => {
  //   fetchMyNFTsOrListedNFTs();
  // }, []);

  // const buyNFT = async (nft) => {
  //   try {
  //     const contract = await connectingWithSmartContract();
  //     const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

  //     console.log(contract, price);

  //     const transaction = await contract.createMarketSale(nft.tokenId, {
  //       value: price,
  //     });

  //     await transaction.wait();
  //     toast.success("Buy NFT successfully!");
  //     router.push("/author");
  //   } catch (error) {
  //     toast.error("Error while buying NFT");
  //   }
  // };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        nftCollection,
        marketplace,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        // fetchMyNFTsOrListedNFTs,
        // buyNFT,
        createSale,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
