import React from "react";
import NavigationItem from "./NavigationItem";
import {NAVIGATION_DEMO_2} from "src/assets/data/navigation";
import {useAddress, useSetIsWalletModalOpen} from "@thirdweb-dev/react";

function Navigation() {
	const address = useAddress();
	const setIsWalletModalOpen = useSetIsWalletModalOpen();
	
	// useEffect(() => {
	// 	if (!address) {
	// 		setIsWalletModalOpen(true);
	// 	} else {
	// 		setIsWalletModalOpen(false);
	// 	}
	// }, [address]);
	//
	// console.log('address', !address);
	
	return (
		<ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
			{NAVIGATION_DEMO_2.map((item) => (
				<NavigationItem key={item.id} menuItem={item}/>
			))}
		</ul>
	);
}

export default Navigation;
