import { useState, useEffect, useContext } from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import CardNFT2 from "src/components/app/CardNFT";
import HeaderFilterSection from "src/components/app/HeaderFilterSection";
import webClientService from "src/lib/services/webClientService";
import {useRouter} from "next/router";
import useApiRequest from "src/hooks/useApiRequest";

const SectionGridFeatureNFT = () => {
  const router = useRouter();
  const [NFTs, setNFTs] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await webClientService.getAllNFTs();
      setNFTs(response.data);
    })();
  }, []);
  return (
    <div className="nc-SectionGridFeatureNFT2 relative">
      {/*<HeaderFilterSection />*/}
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {NFTs.length > 0 &&
          NFTs.map((item, index) =>
            <CardNFT2 key={index} nft={item} />
          )
        }
      </div>
      {
        NFTs.length > 0 && (
          <div className="flex mt-16 justify-center items-center">
            <ButtonPrimary onClick={() => router.push('/explore')}>Show me more</ButtonPrimary>
          </div>
        )
      }
    </div>
  );
};

export default SectionGridFeatureNFT;
