import ncNanoId from "src/utils/ncNanoId";

const otherPageChildMenus = [
  // {
  //   id: ncNanoId(),
  //   href: "/page-collection",
  //   name: "Collection page",
  // },
  {
    id: ncNanoId(),
    href: "/explore",
    name: "Explore page",
  },
  {
    id: ncNanoId(),
    href: "/author",
    name: "Author Profile",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "Account settings",
  },
];

export const NAVIGATION_DEMO_2 = [
  {
    id: ncNanoId(),
    href: "#",
    name: "Discover",
    type: "dropdown",
    children: otherPageChildMenus,
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Help center",
  },
];
