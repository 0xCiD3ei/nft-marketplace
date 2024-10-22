import {Tab} from "@headlessui/react";
import {personNames} from "src/assets/contains/fakeData";
import Avatar from "src/components/shared/Avatar/Avatar";
import VerifyIcon from "src/components/app/VerifyIcon";

const TabDetail = ({owner, nft}) => {
	const TABS = ["Bid History", "Owner"];
	
	const renderTabBidHistory = () => {
		return (
			<ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
				{nft?.transaction?.length > 0 ? nft?.transaction?.map((ele, index) => {
					return (
						<li
							key={index}
							className={`relative py-4`}
						>
							<div className="flex items-center">
								{/*<Avatar sizeClass="h-10 w-10" src={''} radius="rounded-full"/>*/}
								<span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="flex items-center text-sm">
                  <span className="">
                  </span>
									
									<span className="font-medium text-neutral-900 dark:text-neutral-200">
                    Address: {ele?.address || ''}
                  </span>
                </span>
								<span className="text-xs mt-1">Place a bid: {ele?.bid || '0'} MATIC</span>
              </span>
							</div>
						</li>
					)
				}) : (
					<p>No bid history</p>
				)}
			</ul>
		);
	};
	
	// const renderTabProvenance = () => {
	//   return (
	//     <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
	//       {transferEvents.map((event, index) => (
	//         <li
	//           key={index}
	//           className={`relative py-4 ${
	//             index % 2 === 1 ? "bg-neutradl-100" : ""
	//           }`}
	//         >
	//           <div className="flex items-center">
	//             <Avatar sizeClass="h-10 w-10" radius="rounded-full" />
	//             <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
	//               <span className="flex items-center text-sm">
	//                 <span className="">
	//                   {
	//                     index === transferEvents.length - 1
	//                       ? "Mint"
	//                       : "Transfer"
	//                   }
	//                 </span>
	//
	//                 <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
	//                   {event?.data?.from}
	//                 </span>
	//                 <span className="ml-1">
	//                   To
	//                 </span>
	//                 <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
	//                   {event?.data?.to}
	//                 </span>
	//               </span>
	//               <span className="text-xs mt-1">Jun 14 - 4:12 PM</span>
	//             </span>
	//           </div>
	//
	//           <span className="absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"></span>
	//         </li>
	//       ))}
	//     </ul>
	//   );
	// };
	
	const renderTabOwner = () => {
		return (
			<div className="flex items-center py-4">
				<Avatar imgUrl={owner?.avatar} sizeClass="h-11 w-11" radius="rounded-full"/>
				<span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
          <span className="text-sm">Owner</span>
          <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
            <span>{owner ? owner?.fullName : personNames[1]}</span>
            <VerifyIcon iconClass="w-4 h-4"/>
          </span>
        </span>
			</div>
		);
	};
	
	const renderTabItem = (item) => {
		switch (item) {
			case "Bid History":
				return renderTabBidHistory();
			
			// case "Provenance":
			//   return renderTabProvenance();
			
			case "Owner":
				return renderTabOwner();
			
			default:
				return null;
		}
	};
	
	return (
		<div className="w-full pdx-2 sm:px-0">
			<Tab.Group>
				<Tab.List
					className="flex justify-start pd-1 space-x-2.5 rounded-full bordedr border-neutral-300 dark:border-neutral-500">
					{TABS.map((tab) => (
						<Tab
							key={tab}
							className={({selected}) =>
								`px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 ${
									selected
										? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
										: "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
								}`
							}
						>
							{tab}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-4">
					{TABS.map((tab, idx) => (
						<Tab.Panel
							key={idx}
							className={
								"rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
							}
						>
							{renderTabItem(tab)}
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default TabDetail;
