import facebookSvg from "src/assets/images/Facebook.svg";
import twitterSvg from "src/assets/images/Twitter.svg";
import googleSvg from "src/assets/images/Google.svg";
import Input from "src/components/shared/Input/Input";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import Link from "next/link";
import AuthLayout from "src/components/layouts/AuthLayout";
import {useState} from "react";
import webClientService from "src/lib/services/webClientService";
import {toast} from "react-toastify";

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const onSignUp = async (e) => {
    e.preventDefault();
    const response = await webClientService.register({
      email, password
    })
    if(response.code === 200) {
      toast.success("Registration success")
    }else {
      toast.error(response.message)
    }
  }
  
  const onChangeInput = (type, e) => {
    const value = e.target.value;
    if (type === "email") {
      setEmail(value);
    }
    if (type === "password") {
      setPassword(value);
    }
  }
  
  return (
    <>
      <form className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Email address
          </span>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
            value={email}
            onChange={(e) => onChangeInput("email", e)}
          />
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
          </span>
          <Input
            type="password"
            className="mt-1"
            value={password}
            onChange={(e) => onChangeInput("password", e)}
          />
        </label>
        <ButtonPrimary onClick={onSignUp}>Continue</ButtonPrimary>
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
  <AuthLayout title={'Sign up'}>
    {page}
  </AuthLayout>
)