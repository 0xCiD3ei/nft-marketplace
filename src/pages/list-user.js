import MainLayout from "src/components/layouts/MainLayout";
import {Helmet} from "react-helmet";
import Input from "src/components/shared/Input/Input";
import ButtonCircle from "src/components/shared/Button/ButtonCircle";
import React, {useEffect, useState} from "react";
import dbConnect from "src/lib/dbConnect";
import {withSessionSsr} from "src/lib/middlewares/withSession";
import accountService from "src/lib/services/accountService";
import CardAuthorBox4 from "src/components/app/CardAuthorBox4/CardAuthorBox4";
import {useAddress} from "@thirdweb-dev/react";
import webClientService from "src/lib/services/webClientService";
import SectionBecomeAnAuthor from "src/components/app/SectionBecomeAnAuthor/SectionBecomeAnAuthor";

export default function ListUserPage({className = "", accounts}) {
	const [data, setData] = useState(accounts);
	const [searchInput, setSearchInput] = useState('');
	const [account, setAccount] = useState(null);
	const address = useAddress();
	const handleOnChangeInput = (e) => {
		setSearchInput(e.target.value);
	}
	
	
	useEffect(() => {
		(async () => {
			if (address) {
				const response = await webClientService.getAccountByAddress(address);
				setAccount(response.data);
			} else {
				setAccount(null);
			}
		})();
	}, [address]);
	const handleSearch = (e) => {
		e.preventDefault();
		const accountsFilter = accounts.filter((acc) => acc?.fullName?.toLowerCase().includes(searchInput.toLowerCase()));
		setData(accountsFilter);
	}
	
	return (
		<div className={`nc-PageSearch  ${className} h-full`} data-nc-id="searchPage">
			<Helmet>
				<title>Explore</title>
			</Helmet>
			
			<div
				className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
				data-nc-id="HeadBackgroundCommon"
			/>
			
			<div className="container">
				<header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
					<form className="relative w-full">
						<label
							htmlFor="search-input"
							className="text-neutral-500 dark:text-neutral-300"
						>
							<span className="sr-only">Search all icons</span>
							<Input
								value={searchInput}
								name='search'
								onChange={handleOnChangeInput}
								className="shadow-lg border-0 dark:border"
								id="search-input"
								type="search"
								placeholder="Type your keywords"
								sizeClass="pl-14 py-5 pr-5 md:pl-16"
								rounded="rounded-full"
							/>
							<ButtonCircle
								className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
								size=" w-11 h-11"
								onClick={handleSearch}
							>
								<i className="las la-arrow-right text-xl"></i>
							</ButtonCircle>
							<span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
									className="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
                  <path
										d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
                  <path
										d="M22 22L20 20"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
                </svg>
              </span>
						</label>
					</form>
				</header>
			</div>
			
			<div className="container h-3/4 min-h-full py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
				<main>
					{/* LOOP ITEMS */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
						{data?.length > 0 ? (
							data.map((user, index) => <CardAuthorBox4
									authorIndex={index}
									user={user}
									account={account}
									key={index}
								/>
							)
						) : (
							// eslint-disable-next-line react/no-unescaped-entities
							<p>No user</p>
						)}
					</div>
				</main>
				
				{/* SUBCRIBES */}
				<SectionBecomeAnAuthor/>
			</div>
		</div>
	);
}

ListUserPage.getLayout = (page) => (
	<MainLayout>
		{page}
	</MainLayout>
)

export const getServerSideProps = withSessionSsr(async (ctx) => {
	await dbConnect();
	try {
		const response = await accountService.getAccounts(1, 99);
		return {
			props: {
				accounts: JSON.parse(JSON.stringify(response?.data)),
			},
		};
	} catch (e) {
		console.log(e);
		return {
			notFound: true
		}
	}
})