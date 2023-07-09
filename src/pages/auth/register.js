import facebookSvg from "src/assets/images/Facebook.svg";
import twitterSvg from "src/assets/images/Twitter.svg";
import googleSvg from "src/assets/images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "src/components/shared/Input/Input";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import Link from "next/link";
import Image from "next/image";
import AuthLayout from "src/components/layouts/AuthLayout";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

export default function RegisterPage({className = ""}) {
  return (
    <>
      <form className="grid grid-cols-1 gap-6" action="#" method="post">
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Email address
          </span>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
          </span>
          <Input type="password" className="mt-1" />
        </label>
        <ButtonPrimary type="submit">Continue</ButtonPrimary>
      </form>
      
      {/* ==== */}
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
        <Link className="text-green-600" href="/auth/login">
          Sign in
        </Link>
      </span>
    </>
  );
}

RegisterPage.getLayout = (page) => (
  <AuthLayout title={'Register'}>
    {page}
  </AuthLayout>
)