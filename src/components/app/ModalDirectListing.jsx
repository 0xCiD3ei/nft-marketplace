import React, {useContext, useEffect, useRef, useState} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import Input from "src/components/shared/Input/Input";
import NcModal from "src/components/shared/NcModal/NcModal";
import {useAddress, useCreateDirectListing} from "@thirdweb-dev/react";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";

const ModalDirectListing = ({ show, nft, onCloseModalEdit }) => {
  const address = useAddress();
  const {nftCollection, marketplace} = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const textareaRef = useRef(null);
  
  const {mutateAsync: createDirectListing} = useCreateDirectListing(marketplace);
  
  
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element = textareaRef.current;
        if (element) {
          element.focus();
          element.setSelectionRange(element.value.length, element.value.length);
        }
      }, 400);
    }
  }, [show]);
  
  const checkAndProvideApproval = async () => {
    const hasApproval = await nftCollection?.call(
      "isApprovedForAll",
      nft.owner,
      "0x7070bf67323D918b44D3Acd2AD764228cb05435a"
    );
    
    if (!hasApproval) {
      const txResult = await nftCollection?.call(
        "setApprovalForAll",
        "0x7070bf67323D918b44D3Acd2AD764228cb05435a",
        true
      );
      
      if (txResult) {
        console.log("Approval provided");
      }
    }
    
    return true;
  }
  
  const handleInputChange = (e) => {
    setPrice(e.target.value);
  };
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: "0x739951B8Abb63A632785c59d88859F4A7e887836",
      tokenId: nft.id,
      pricePerToken: price,
      quantity: 1
    })
    onCloseModalEdit();
    return txResult;
  };
  
  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Direct Listing
        </h3>
        <span className="text-sm">Are you sure you want to direct listing?</span>
        <div className="mt-8 relative rounded-md shadow-sm">
          <Input
            name={'price'}
            value={price}
            type={"text"}
            onChange={handleInputChange}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              disabled
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300 sm:text-sm rounded-md"
            >
              <option>MATIC</option>
              <option>BC</option>
              <option>BTH</option>
            </select>
          </div>
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleOnSubmit}>Submit</ButtonPrimary>
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
