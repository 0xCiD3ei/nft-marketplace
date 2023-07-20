import NcImage from "src/components/shared/NcImage/NcImage";
import rightImgDemo from "src/assets/images/rightLargeImg.png";
import rightLargeImgDark from "src/assets/images/rightLargeImgDark.png";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import Logo from "src/components/shared/Logo/Logo";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";

const SectionBecomeAnAuthor = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          Earn free crypto <br /> with Ciscrypt
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          A creative agency that lead and inspire.
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary to="/page-upload-item" className="">
            Create item
          </ButtonPrimary>
          <ButtonSecondary to="/search" className="">
            Discover more
          </ButtonSecondary>
        </div>
      </div>
      <div className="flex-grow">
        <NcImage
          containerClassName="block dark:hidden"
          isFill={false}
          src={rightImgDemo}
        />
        <NcImage
          containerClassName="hidden dark:block"
          isFill={false}
          src={rightLargeImgDark}
        />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
