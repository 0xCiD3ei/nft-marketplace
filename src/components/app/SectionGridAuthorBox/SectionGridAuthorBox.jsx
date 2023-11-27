import React, {useEffect, useState} from "react";
import CardAuthorBox from "../CardAuthorBox/CardAuthorBox";
import CardAuthorBox2 from "../CardAuthorBox2/CardAuthorBox2";
import CardAuthorBox3 from "../CardAuthorBox3/CardAuthorBox3";
import CardAuthorBox4 from "../CardAuthorBox4/CardAuthorBox4";
import Heading from "../Heading/Heading";
import SortOrderFilter from "./SortOrderFilter";
import {useAddress} from "@thirdweb-dev/react";
import webClientService from "src/lib/services/webClientService";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import {useRouter} from "next/router";

const SectionGridAuthorBox = ({
																className = "",
																boxCard = "box1",
																sectionStyle = "style1",
																gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
																data = [],
															}) => {
	const [tabActive, setTabActive] = React.useState("Popular");
	const [account, setAccount] = useState(null);
	const address = useAddress();
	const router = useRouter();
	
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
	
	const renderCard = (user, index) => {
		switch (boxCard) {
			case "box1":
				return (
					<CardAuthorBox
						index={index < 3 ? index + 1 : undefined}
						key={index}
					/>
				);
			case "box2":
				return <CardAuthorBox2 key={index}/>;
			case "box3":
				return <CardAuthorBox3 key={index}/>;
			case "box4":
				return (
					<CardAuthorBox4
						authorIndex={index < 3 ? index + 1 : undefined}
						user={user}
						account={account}
						key={index}
					/>
				);
			
			default:
				return null;
		}
	};
	
	const renderHeading1 = () => {
		return (
			<div className="mb-12 lg:mb-16  flex justify-between flex-col sm:flex-row">
				<Heading
					rightPopoverText="Creators"
					rightPopoverOptions={[
						{
							name: "Creators",
							href: "#",
						},
						{
							name: "Buyers",
							href: "#",
						},
					]}
					className="text-neutral-900 dark:text-neutral-50"
				>
					Popular
				</Heading>
				<div className="mt-4 sm:mt-0">
					<SortOrderFilter/>
				</div>
			</div>
		);
	};
	
	const renderHeading2 = () => {
		return (
			<div>
				<Heading
					className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
					fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
					isCenter
					desc=""
				>
					Top List Creators.
				</Heading>
			</div>
		);
	};
	
	return (
		<div
			className={`nc-SectionGridAuthorBox relative ${className}`}
			data-nc-id="SectionGridAuthorBox"
		>
			{sectionStyle === "style1" ? renderHeading1() : renderHeading2()}
			<div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
				{data.map((user, index) => renderCard(user, index))}
			</div>
			<div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-5">
				{/*<ButtonSecondary>Show me more </ButtonSecondary>*/}
				<ButtonPrimary onClick={() => {
					router.push('/list-user');
				}}>Show me more</ButtonPrimary>
			</div>
		</div>
	);
};

export default SectionGridAuthorBox;
