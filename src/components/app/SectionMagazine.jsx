import Heading from "./Heading/Heading";
import { nftsAbstracts } from "src/contains/fakeData";
import CardNFTMusic from "./CardNFTMusic";
import CardNFTMusic2 from "./CardNFTMusic2";
import bg1 from "src/images/bg1.avif";

const SectionMagazine = ({ className = "" }) => {
  return (
    <div className={`nc-SectionMagazine8 relative ${className}`}>
      <Heading
        desc={"Click on music icon and enjoy NTF music or audio "}
        className="mb-14 text-neutral-900 dark:text-neutral-50"
      >
        Listen NFTs audio live
      </Heading>
      <div className={`grid grid-cols-1 sm:grid-cols-6 gap-6 2xl:gap-8`}>
        <CardNFTMusic
          featuredImage={bg1}
          className="sm:col-span-3 xl:col-span-2"
        />
        <CardNFTMusic
          featuredImage={bg1}
          className="sm:col-span-3 xl:col-span-2"
        />
        <div className="grid grid-rows-3 gap-6 xl:gap-8 sm:col-span-6 xl:col-span-2">
          {[nftsAbstracts[2], nftsAbstracts[4], nftsAbstracts[7]].map(
            (p, index) => (
              <CardNFTMusic2 featuredImage={p} key={index} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine;
