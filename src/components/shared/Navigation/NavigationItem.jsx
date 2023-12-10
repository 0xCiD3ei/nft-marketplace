import React, {Fragment, useState} from "react";
import {Popover, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {withRouter} from "next/router";
import Link from "next/link";
import {useAddress} from "@thirdweb-dev/react";

const NavigationItem = ({menuItem, history}) => {
	const address = useAddress();
	const [menuCurrentHovers, setMenuCurrentHovers] = useState([]);
	
	// CLOSE ALL MENU OPENING WHEN CHANGE HISTORY
	// useEffect(() => {
	//   const unlisten = history.listen(() => {
	//     setMenuCurrentHovers([]);
	//   });
	//   return () => {
	//     unlisten();
	//   };
	// }, [history]);
	
	const onMouseEnterMenu = (id) => {
		setMenuCurrentHovers((state) => [...state, id]);
	};
	
	const onMouseLeaveMenu = (id) => {
		setMenuCurrentHovers((state) => {
			return state.filter((item, index) => {
				return item !== id && index < state.indexOf(id);
			});
		});
	};
	// ===================== MENU MEGAMENU =====================
	
	// ===================== MENU DROPDOW =====================
	const renderDropdownMenu = (menuDropdown) => {
		const isHover = menuCurrentHovers.includes(menuDropdown.id);
		return (
			<Popover
				as="li"
				className="menu-item menu-dropdown relative"
				onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
				onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
			>
				{() => (
					<>
						<Popover.Button as={Fragment}>
							{renderMainItem(menuDropdown)}
						</Popover.Button>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className="sub-menu absolute transform z-10 w-56 pt-3 left-0"
							>
								<ul
									className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
									{menuDropdown.children?.map((i) => {
										if (i.type) {
											return renderDropdownMenuNavlinkHasChild(i);
										} else {
											return (
												<li key={i.id} className="px-2">
													{renderDropdownMenuNavlink(i)}
												</li>
											);
										}
									})}
								</ul>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		);
	};
	
	const renderDropdownMenuNavlinkHasChild = (item) => {
		const isHover = menuCurrentHovers.includes(item.id);
		return (
			<Popover
				as="li"
				key={item.id}
				className="menu-item menu-dropdown relative px-2"
				onMouseEnter={() => onMouseEnterMenu(item.id)}
				onMouseLeave={() => onMouseLeaveMenu(item.id)}
			>
				{() => (
					<>
						<Popover.Button as={Fragment}>
							{renderDropdownMenuNavlink(item)}
						</Popover.Button>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
							>
								<ul
									className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
									{item.children?.map((i) => {
										if (i.type) {
											return renderDropdownMenuNavlinkHasChild(i);
										} else {
											return (
												<li key={i.id} className="px-2">
													{renderDropdownMenuNavlink(i)}
												</li>
											);
										}
									})}
								</ul>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		);
	};
	
	const renderDropdownMenuNavlink = (item) => {
		return (
			<Link
				exact
				strict
				target={item.targetBlank ? "_blank" : undefined}
				rel="noopener noreferrer"
				className="flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
				href={{
					pathname: item.href || undefined,
				}}
				activeClassName="!font-medium !text-neutral-900 dark:!text-neutral-100"
			>
				{item.name}
				{item.type && (
					<ChevronDownIcon
						className="ml-2 h-4 w-4 text-neutral-500"
						aria-hidden="true"
					/>
				)}
			</Link>
		);
	};
	
	// ===================== MENU MAIN MENU =====================
	const renderMainItem = (item) => {
		return (
			<Link
				exact
				strict
				target={item.targetBlank ? "_blank" : undefined}
				rel="noopener noreferrer"
				className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
				href={{
					pathname: item.href === "/profile" ? `/author/${address}` : item.href || undefined,
				}}
				activeClassName="!font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100"
			>
				{item.name}
				{item.type && (
					<ChevronDownIcon
						className="ml-1 -mr-1 h-4 w-4 text-neutral-400"
						aria-hidden="true"
					/>
				)}
			</Link>
		);
	};
	
	switch (menuItem.type) {
		case "dropdown":
			return renderDropdownMenu(menuItem);
		default:
			return <li className="menu-item">{renderMainItem(menuItem)}</li>;
	}
};

const NavigationItemWithRouter = withRouter(NavigationItem);

export default NavigationItemWithRouter;
