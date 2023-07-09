import React, { useState, useEffect } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { toast } from 'react-toastify';

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

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    toast.error("Something went wrong while connecting with contract");
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   checkIfWalletConnected();
  // }, []);

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length !== 0) {
        const newAccount = accounts[0];
        setCurrentAccount(newAccount);
      } else {
        setCurrentAccount('');
      }
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [currentAccount]);

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return toast.warning("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        toast.error("Account Not Found");
      }
    } catch (error) {
      toast.error("Something wrong while connecting to wallet");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return toast.warning("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.loh(accounts);
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      toast.error("Error while uploading to IPFS");
    }
  };

  const createNFT = async ({ name, price, image, description }) => {
    if (!name || !description || !price || !image) {
      return toast.error("Data Is Missing");
    }

    const data = JSON.stringify({ name, description, price, image });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      const res = await createSale(url, price);
      console.log(res);
      toast.success("Create NFT successfully!");
    } catch (error) {
      toast.error("Error while creating NFT");
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, !isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      return await transaction.wait();
    } catch (error) {
      toast.error("Error while creating sale");
    }
  };

  const fetchNFTs = async () => {
    try {
      // const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC);
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
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

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
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
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      toast.error("Error while fetching listed NFTs");
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      console.log(contract, price);

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      toast.success("Buy NFT successfully!");
      router.push("/page-author");
    } catch (error) {
      toast.error("Error while buying NFT");
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
