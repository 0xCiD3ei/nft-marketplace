import facebookSvg from "src/assets/images/Facebook.svg";
import twitterSvg from "src/assets/images/Twitter.svg";
import googleSvg from "src/assets/images/Google.svg";
import Image from "next/image";
import {Helmet} from "react-helmet";
import {signIn} from "next-auth/react";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
    onClick: () => {console.log("facebook")}
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
    onClick: () => {console.log("twitter")}
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
    onClick: () => signIn("google", {callbackUrl: "/"})
  },
];

export default function AuthLayout({children, title}) {
  return (
    <div className={`nc-PageLogin`}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {title}
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                onClick={item.onClick}
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          <div className={"space-y-6"}>{children}</div>
        </div>
      </div>
    </div>
  )
}