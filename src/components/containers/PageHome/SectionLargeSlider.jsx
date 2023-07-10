import { useState } from "react";
import { nftsLargeImgs } from "src/assets/contains/fakeData";
import CardLarge from "src/components/app/CardLarge/CardLarge";

const SectionLargeSlider = ({ className = "" }) => {
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
      {[1, 1, 1].map((_, index) =>
        indexActive === index ? (
          <CardLarge
            key={index}
            isShowing
            featuredImgUrl={nftsLargeImgs[index]}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
          />
        ) : null
      )}
    </div>
  );
};

export default SectionLargeSlider;
