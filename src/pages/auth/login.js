import Input from "src/components/shared/Input/Input";
import Link from "next/link";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import AuthLayout from "src/components/layouts/AuthLayout";


export default function LoginPage({className = ""}) {
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
            <Link href="/forgot-pass" className="text-sm text-green-600">
              Forgot password?
            </Link>
          </span>
          <Input type="password" className="mt-1" />
        </label>
        <ButtonPrimary type="submit">Continue</ButtonPrimary>
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