import Input from "src/components/shared/Input/Input";
import Link from "next/link";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import AuthLayout from "src/components/layouts/AuthLayout";
import {useCallback, useState} from "react";
import webClientService from "src/lib/services/webClientService";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  const [state,setState] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  
  const onSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const status = await signIn('credentials', {
      redirect: false,
      email: state.email,
      password: state.password,
      callbackUrl: '/'
    })
    if(status.ok) {
      toast.success("Login successfully");
      await router.push(status.url)
    }else {
      toast.error("Login failed");
    }
    setLoading(false);
  }
  
  const onChangeInput = (field, e) => {
    setState({
      ...state,
      [field]: e.target.value
    })
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
            name="email"
            value={state.email}
            onChange={(e) => onChangeInput("email", e)}
          />
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
            <Link href="#" className="text-sm text-green-600">
              Forgot password?
            </Link>
          </span>
          <Input
            type="password"
            className="mt-1"
            name="password"
            value={state.password}
            onChange={(e) => onChangeInput("password", e)}
          />
        </label>
        <ButtonPrimary
          loading={loading}
          onClick={onSignIn}
        >
          Continue
        </ButtonPrimary>
      </form>
      
      {/* ==== */}
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        New user? {` `}
        <Link className="text-green-600" href="/auth/register">
          Create an account
        </Link>
      </span>
    </>
  )
}

LoginPage.getLayout = (page) => (
  <AuthLayout title={'Login'}>
    {page}
  </AuthLayout>
)