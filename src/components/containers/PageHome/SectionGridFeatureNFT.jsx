import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import CardNFT2 from "src/components/app/CardNFT";
import {useRouter} from "next/router";

const SectionGridFeatureNFT = ({nfts}) => {
	const router = useRouter();
	// const [NFTs, setNFTs] = useState([]);
	// useEffect(() => {
	//   (async () => {
	//     const response = await webClientService.getAllNFTs();
	//     setNFTs(response.data);
	//   })();
	// }, []);
	return (
		<div className="nc-SectionGridFeatureNFT2 relative">
			{/*<HeaderFilterSection />*/}
			<div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
				{nfts.length > 0 &&
					nfts.map((item, index) =>
						<CardNFT2 key={index} nft={item}/>
					)
				}
			</div>
			{
				nfts.length > 0 && (
					<div className="flex mt-16 justify-center items-center">
						<ButtonPrimary onClick={() => router.push('/explore')}>Show me more</ButtonPrimary>
					</div>
				)
			}
		</div>
	);
};

export default SectionGridFeatureNFT;
