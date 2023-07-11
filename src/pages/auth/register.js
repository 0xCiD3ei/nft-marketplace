import Input from "src/components/shared/Input/Input";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import Link from "next/link";
import AuthLayout from "src/components/layouts/AuthLayout";
import {useState} from "react";
import webClientService from "src/lib/services/webClientService";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const onSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await webClientService.register(state);
    if(response.code === 200) {
      toast.success("Registration success");
      await router.push('/auth/login');
    }else {
      toast.error(response.message)
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
          onClick={onSignUp}
        >
          Continue
        </ButtonPrimary>
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