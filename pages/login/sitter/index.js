import LoginForm from "@/components/authentication/LoginForm";
import Link from "next/link";
export default function LoginOwner() {
  const api = "/api/authentication/login/sitter";
  const route = "/register/sitter";
  return (
    <section className="w-full h-screen flex max-sm:text-scale-75 justify-center items-center relative z-10">
      <div className="w-full max-sm:w-[90%] bg-transparent flex flex-col items-center justify-center max-sm:gap-8 gap-14 absolute">
        <div className="bg-transparent flex flex-col text-center gap-2">
          <h1 className="text-h1 max-sm:text-h2 bg-transparent">
            Welcome back!
          </h1>
          <h3 className="min-sm:text-h3 text-[1.125rem] font-medium text-ps-gray-500 max-sm:text-ps-gray-400 bg-transparent">
            Find your perfect pet sitter with us
          </h3>
        </div>
        <div className="max-sm:text-b2 max-sm:w-[100%] min-w-[25%] min-sm:w-[30%] flex flex-col gap-8 max-sm:gap-6">
          <LoginForm api={api} />
          <div className="w-full flex justify-center gap-2">
            <p className="text-b1">Don’t have Pet Sitter account?</p>
            <Link href={route}>
              <p className="text-b1 text-ps-orange-500">Register</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
