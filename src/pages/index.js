import MainLayout from "src/components/layouts/MainLayout";
import Head from "next/head";
import Image from "next/image";
import Vector1 from "src/assets/images/Vector1.png";
import BgGlassmorphism from "src/components/app/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "src/components/app/SectionHero/SectionHero";
import SectionHowItWork from "src/components/app/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "src/components/app/BackgroundSection/BackgroundSection";
import SectionGridAuthorBox from "src/components/app/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionSubscribe from "src/components/app/SectionSubscribe/SectionSubscribe";
import SectionGridFeatureNFT from "src/components/containers/PageHome/SectionGridFeatureNFT";
import SectionSliderCategories from "src/components/app/SectionSliderCategories/SectionSliderCategories";
import SectionBecomeAnAuthor from "src/components/app/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "src/components/containers/PageHome/SectionVideos";
import {useContext, useEffect, useState} from "react";
import {MARKETPLACE_ADDRESS} from "src/constant/addresses";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import {withSessionSsr} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import accountService from "src/lib/services/accountService";
import SectionLargeSlider from "src/components/containers/PageHome/SectionLargeSlider";
import nftService from "src/lib/services/nftService";
import categoryService from "src/lib/services/categoryService";

export default function HomePage({users, nfts, categories}) {
	const [auctions, setAuctions] = useState([]);
	const {marketplace} = useContext(NFTMarketplaceContext);
	useEffect(() => {
		(async () => {
			try {
				const txResult = await marketplace?.englishAuctions?.getAllValid(MARKETPLACE_ADDRESS)
				setAuctions(txResult || []);
			} catch (e) {
				console.log(e)
			}
		})();
	}, [marketplace]);
	
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<div className="nc-PageHome relative overflow-hidden">
				{/* GLASSMOPHIN */}
				<BgGlassmorphism/>
				
				<div className="container relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
					{/* SECTION HERO */}
					<SectionHero
						className="pb-10"
						heading={
							<span>
                Discover 🖼
                <br/> collect, and sell <br/> extraordinary {` `}
								<span className="relative pr-3">
                  <Image
										className="w-full absolute bottom-3 -left-1"
										src={Vector1}
										alt="Vector1"
									/>
                  <span className="relative">NFTs</span>
                </span>
              </span>
						}
					/>
					
					{/* SECTION 2 */}
					<SectionHowItWork/>
				</div>
				
				{/* SECTION LARGE SLIDER */}
				{
					auctions?.length > 0 && (
						<div className="bg-neutral-100/80 dark:bg-black/20 py-20 lg:py-32">
							<div className="container">
								<SectionLargeSlider auctions={auctions}/>
							</div>
						</div>
					)
				}
				
				
				<div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
					{/*<SectionMagazine />*/}
					
					{/* SECTION */}
					<div className="relative py-20 lg:py-28">
						<BackgroundSection/>
						<SectionGridAuthorBox
							sectionStyle="style2"
							data={users}
							boxCard="box4"
						/>
					</div>
					
					{/* SECTION 4 */}
					{/*<SectionSliderCardNftVideo />*/}
					
					{/* SECTION */}
					{/*<div className="relative py-20 lg:py-28">*/}
					{/*  <BackgroundSection />*/}
					{/*  <SectionSliderCollections cardStyle="style2" />*/}
					{/*</div>*/}
					
					{/* SECTION */}
					<SectionSubscribe/>
					
					{/* SECTION */}
					<div className="relative py-20 lg:py-28">
						<BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 "/>
						<SectionGridFeatureNFT nfts={nfts}/>
					</div>
					
					{/* SECTION 1 */}
					<SectionSliderCategories categories={categories}/>
					
					{/* SECTION */}
					<div className="relative py-20 lg:py-24">
						<BackgroundSection/>
						<SectionBecomeAnAuthor/>
					</div>
					
					{/* SECTION */}
					<SectionVideos/>
				</div>
			</div>
		</>
	)
}

HomePage.getLayout = (page) => (
	<MainLayout>
		{page}
	</MainLayout>
)

export const getServerSideProps = withSessionSsr(async (ctx) => {
	await dbConnect();
	try {
		const users = await accountService.getAccounts(1, 8);
		const categories = await categoryService.getCategories();
		const response = await nftService.getAllNfts(1, 6);
		return {
			props: {
				users: JSON.parse(JSON.stringify(users?.data)),
				nfts: JSON.parse(JSON.stringify(response?.data)),
				categories: JSON.parse(JSON.stringify(categories)),
			},
		};
	} catch (e) {
		console.log(e);
		return {
			notFound: true
		}
	}
})
