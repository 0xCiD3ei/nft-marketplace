import { useState } from "react";
import { nftsLargeImgs } from "src/assets/contains/fakeData";
import CardLarge from "src/components/app/CardLarge/CardLarge";

const SectionLargeSlider = ({ className = "", auctions }) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= 2) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return 2;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {auctions.map((auction, index) =>
        indexActive === index ? (
          <CardLarge
            key={index}
            isShowing
            auction={auction}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
          />
        ) : null
      )}
    </div>
  );
};

export default SectionLargeSlider;
