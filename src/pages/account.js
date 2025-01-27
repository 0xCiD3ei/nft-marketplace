import MainLayout from "src/components/layouts/MainLayout";
import {Helmet} from "react-helmet";
import Avatar from "src/components/shared/Avatar/Avatar";
import Label from "src/components/app/Label/Label";
import Input from "src/components/shared/Input/Input";
import Textarea from "src/components/shared/Textarea/Textarea";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import {useAddress} from "@thirdweb-dev/react";
import {useContext, useState} from "react";
import {withSessionSsr} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import webClientService from "src/lib/services/webClientService";
import {useSnackbar} from "notistack";

export default function AccountPage({className = "", account}) {
	const {enqueueSnackbar} = useSnackbar();
	const address = useAddress();
	const {uploadToIPFS} = useContext(NFTMarketplaceContext);
	const [formValues, setFormValues] = useState({
		fullName: account?.fullName || "",
		email: account?.email || "",
		bio: account?.bio || "",
		avatar: account?.avatar || "",
		website: account?.website || "",
		facebook: account?.facebook || "",
		twitter: account?.twitter || "",
		telegram: account?.telegram || "",
	})
	const [loading, setLoading] = useState(false);
	
	const handleOnchangeFile = async (e) => {
		const url = await uploadToIPFS(e.target.files[0]);
		setFormValues({...formValues, avatar: url});
	};
	
	const handleOnChangeInput = (event) => {
		const {name, value} = event.target;
		setFormValues({...formValues, [name]: value});
	}
	
	const handleUpdateProfile = async () => {
		try {
			setLoading(true);
			const response = await webClientService.updateProfile({
				id: account?._id,
				data: formValues
			})
			if (response?.code === 200) {
				enqueueSnackbar(response?.message, {
					variant: 'success'
				});
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			enqueueSnackbar('An error has occurred', {
				variant: 'success'
			});
			console.log(e);
		}
	}
	
	return (
		<div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
			<Helmet>
				<title>Account</title>
			</Helmet>
			
			<div className="container">
				<div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
					{/* HEADING */}
					<div className="max-w-2xl">
						<h2 className="text-3xl sm:text-4xl font-semibold">
							Profile settings
						</h2>
						<span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
					</div>
					<div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
					<div className="flex flex-col md:flex-row">
						<div className="flex-shrink-0 flex items-start">
							<div className="relative rounded-full overflow-hidden flex">
								<Avatar
									sizeClass="w-32 h-32"
									imgUrl={formValues.avatar}
								/>
								<div
									className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
									<svg
										width="30"
										height="30"
										viewBox="0 0 30 30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
											stroke="currentColor"
											strokeWidth={1.5}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									
									<span className="mt-1 text-xs">Change Image</span>
								</div>
								<input
									type="file"
									onChange={handleOnchangeFile}
									className="absolute inset-0 opacity-0 cursor-pointer"
								/>
							</div>
						</div>
						<div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-5 sm:space-y-6 md:sm:space-y-7">
							{/* ---- */}
							<div>
								<Label>Full Name</Label>
								<Input
									className="mt-1.5"
									placeholder="Enter your full name"
									value={formValues.fullName}
									name={"fullName"}
									onChange={handleOnChangeInput}
								/>
							</div>
							
							{/* ---- */}
							<div>
								<Label>Email</Label>
								<div className="mt-1.5 flex">
                  <span
										className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
									<Input
										type="email"
										className="!rounded-l-none"
										name="email"
										placeholder="example@email.com"
										value={formValues.email}
										onChange={handleOnChangeInput}
									/>
								</div>
							</div>
							
							{/* ---- */}
							<div>
								<Label>Bio</Label>
								<Textarea
									rows={5}
									className="mt-1.5"
									name="bio"
									placeholder="Something about yourself in a few word."
									value={formValues.bio}
									onChange={handleOnChangeInput}
								/>
							</div>
							
							{/* ---- */}
							<div className="">
								<Label>Website</Label>
								<div className="mt-1.5 flex">
                  <span
										className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    https://
                  </span>
									<Input
										className="!rounded-l-none"
										placeholder="yourwebsite.com"
										name={"website"}
										value={formValues.website}
										onChange={handleOnChangeInput}
									/>
								</div>
							</div>
							
							{/* ---- */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
								<div>
									<Label>Facebook</Label>
									<div className="mt-1.5 flex">
                    <span
											className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-facebook-f"></i>
                    </span>
										<Input
											className="!rounded-l-none"
											placeholder="Your Facebook"
											sizeClass="h-11 px-4 pl-2 pr-3"
											name={"facebook"}
											value={formValues.facebook}
											onChange={handleOnChangeInput}
										/>
									</div>
								</div>
								<div>
									<Label>Twitter</Label>
									<div className="mt-1.5 flex">
                    <span
											className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-twitter"></i>
                    </span>
										<Input
											className="!rounded-l-none"
											placeholder="Your Twitter"
											sizeClass="h-11 px-4 pl-2 pr-3"
											name={"twitter"}
											value={formValues.twitter}
											onChange={handleOnChangeInput}
										/>
									</div>
								</div>
								<div>
									<Label>Telegram</Label>
									<div className="mt-1.5 flex">
                    <span
											className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-telegram-plane"></i>
                    </span>
										<Input
											className="!rounded-l-none"
											placeholder="Your Telegram"
											sizeClass="h-11 px-4 pl-2 pr-3"
											name={"telegram"}
											value={formValues.telegram}
											onChange={handleOnChangeInput}
										/>
									</div>
								</div>
							</div>
							
							{/* ---- */}
							<div>
								<Label>Wallet Address</Label>
								<div className="mt-1.5 relative text-neutral-700 dark:text-neutral-300">
									<Input
										className="!pr-10 "
										disabled
										defaultValue={address}
									/>
									
									<span
										className="absolute right-2.5 cursor-pointer top-1/2 -translate-y-1/2 "
										onClick={() => {
											navigator.clipboard.writeText(address || "");
											enqueueSnackbar('Copy address successfully', {
												variant: true
											})
										}}
									>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
												d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
                      <path
												d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
                    </svg>
                  </span>
								</div>
							</div>
							
							{/* ---- */}
							<div className="pt-2">
								<ButtonPrimary
									className="w-full"
									loading={loading}
									onClick={handleUpdateProfile}
								>
									Update profile
								</ButtonPrimary>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

AccountPage.getLayout = (page) => (
	<MainLayout>
		{page}
	</MainLayout>
)

export const getServerSideProps = withSessionSsr(async (ctx) => {
	await dbConnect();
	try {
		return {
			props: {
				account: ctx.req.session.account,
			},
		};
	} catch (e) {
		console.log(e);
		return {
			notFound: true
		}
	}
})

