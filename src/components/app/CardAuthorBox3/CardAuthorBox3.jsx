import Link from "next/link";
import Avatar from "src/components/shared/Avatar/Avatar";
import NcImage from "src/components/shared/NcImage/NcImage";
import {nftsAbstracts} from "src/assets/contains/fakeData";
import VerifyIcon from "../VerifyIcon";
import FollowButton from "../FollowButton";

const CardAuthorBox3 = ({className = "", following, account}) => {
	return (
		<div
			className={`nc-CardAuthorBox3 relative flex flex-col p-4 overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
			data-nc-id="CardAuthorBox3"
		>
			<div className="relative flex-shrink-0 flex space-x-2 h-24">
				<NcImage
					containerClassName="flex flex-grow h-full rounded-xl overflow-hidden"
					src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
				/>
				<NcImage
					containerClassName="flex h-full w-24 flex-shrink-0 rounded-xl overflow-hidden"
					src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
				/>
				<NcImage
					containerClassName="flex flex-grow h-full rounded-xl overflow-hidden"
					src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
				/>
			</div>
			
			<div className="-mt-6">
				<div className="text-center">
					<Avatar
						containerClassName="ring-4 ring-white dark:ring-black !shadow-xl"
						sizeClass="w-12 h-12 text-2xl"
						radius="rounded-full"
						imgUrl={account?.avatar}
					/>
				</div>
				<div className="mt-2.5 flex items-start justify-between">
					<div>
						<h2 className={`text-base font-medium flex items-center`}>
              <span className="">
                {account?.fullName}
              </span>
							<VerifyIcon/>
						</h2>
						<span
							className={`block mt-0.5 text-sm text-neutral-500 dark:text-neutral-400`}
						>
              @creator
            </span>
					</div>
					<FollowButton isFollowing={following}/>
				</div>
				<div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
					X-Metaverse is a Star Wars game based on NFT+ blockchain exploration,
					mining, trading ...
				</div>
			</div>
			
			<Link href={`/author/${account.address}`} className="absolute inset-0"></Link>
		</div>
	);
};

export default CardAuthorBox3;
