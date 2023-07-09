import React from "react";
import Image from "next/image";
import facebook from "src/images/socials/facebook.svg";
import twitter from "src/images/socials/twitter.svg";
import telegram from "src/images/socials/telegram.svg";
import youtube from "src/images/socials/youtube.svg";

const socialsDemo = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
];

const SocialsList = ({
  className = "",
  itemClass = "block w-6 h-6",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <Image src={item.icon} alt="" />
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
