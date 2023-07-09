import { useState, useEffect, useContext } from "react";
import ButtonPrimary from "src/shared/Button/ButtonPrimary";
import CardNFT2 from "src/components/CardNFT";
import HeaderFilterSection from "src/components/HeaderFilterSection";
import { NFTMarketplaceContext } from "src/context/NFTMarketplaceContext";

const SectionGridFeatureNFT = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);

  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNFTs(item?.reverse());
    });
  }, []);

  return (
    <div className="nc-SectionGridFeatureNFT2 relative">
      <HeaderFilterSection />
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {NFTs?.length &&
          NFTs.map((item, index) => <CardNFT2 key={index} NFT={item} />)}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT;
