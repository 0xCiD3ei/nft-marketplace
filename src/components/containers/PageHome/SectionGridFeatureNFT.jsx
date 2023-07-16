import { useState, useEffect, useContext } from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import CardNFT2 from "src/components/app/CardNFT";
import HeaderFilterSection from "src/components/app/HeaderFilterSection";

const SectionGridFeatureNFT = () => {

  return (
    <div className="nc-SectionGridFeatureNFT2 relative">
      <HeaderFilterSection />
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {[]?.length &&
          [].map((item, index) => <CardNFT2 key={index} NFT={item} />)}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT;
