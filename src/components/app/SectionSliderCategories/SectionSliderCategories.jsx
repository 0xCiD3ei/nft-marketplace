import React, {useEffect, useId, useRef} from "react";
import Heading from "../Heading/Heading";
import CardCategory from "../CardCategory/CardCategory";
import Glide from "@glidejs/glide";

const ntfsCatNames = [
	"Arts",
	"Entertainment",
	"Music",
	"News",
	"Science",
	"Sports",
	"Technology",
];

const SectionSliderCategories = ({
																	 heading = "Browse by category",
																	 subHeading = "Explore the NFTs in the most featured categories.",
																	 className = "",
																	 itemClassName = "",
																	 categories = []
																 }) => {
	console.log("categories", categories);
	const sliderRef = useRef(null);
	const id = useId();
	const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
	
	useEffect(() => {
		if (!sliderRef.current) {
			return;
		}
		
		const OPTIONS = {
			perView: 5,
			gap: 32,
			bound: true,
			breakpoints: {
				1280: {
					perView: 4,
				},
				1024: {
					gap: 20,
					perView: 3.4,
				},
				768: {
					gap: 20,
					perView: 3,
				},
				640: {
					gap: 20,
					perView: 2.3,
				},
				500: {
					gap: 20,
					perView: 1.4,
				},
			},
		};
		
		let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
		slider.mount();
		return () => slider.destroy();
	}, [sliderRef, UNIQUE_CLASS]);
	
	return (
		<div className={`nc-SectionSliderCategories ${className}`}>
			<div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
				<Heading desc={subHeading} hasNextPrev>
					{heading}
				</Heading>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{categories.map((item, index) => (
							<li key={index} className={`glide__slide ${itemClassName}`}>
								<CardCategory
									index={item?.id}
									featuredImage={item.image}
									name={item.name}
									total={item.totalItems}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SectionSliderCategories;
