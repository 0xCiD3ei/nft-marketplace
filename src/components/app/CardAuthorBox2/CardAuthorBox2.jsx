import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Avatar from "src/shared/Avatar/Avatar";
import NcImage from "src/shared/NcImage/NcImage";
import { nftsImgs, _getPersonNameRd } from "src/contains/fakeData";
import VerifyIcon from "../VerifyIcon";

const CardAuthorBox2 = ({ className = "" }) => {
  <Link
    href={"/page-author"}
    className={`nc-CardAuthorBox2 flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
    data-nc-id="CardAuthorBox2"
  >
    <div className="relative flex-shrink-0 ">
      <div>
        <NcImage
          containerClassName="flex aspect-w-7 aspect-h-5 sm:aspect-h-6 w-full h-0"
          src={nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
        />
      </div>
      <div className="absolute top-3 inset-x-3 flex">
        <div className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
          1.45 ETH <ArrowRightIcon className="w-5 h-5 text-yellow-600 ml-3" />
        </div>
      </div>
    </div>

    <div className="-mt-8 m-8 text-center">
      <Avatar
        containerClassName="ring-2 ring-white"
        sizeClass="w-16 h-16 text-2xl"
        radius="rounded-full"
      />
      <div className="mt-3">
        <h2
          className={`text-base font-medium flex items-center justify-center`}
        >
          {_getPersonNameRd()}
          <VerifyIcon />
        </h2>
        <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          @creator
        </span>
      </div>
    </div>
  </Link>;
};

export default CardAuthorBox2;
