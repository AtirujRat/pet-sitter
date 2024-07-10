import LoginForm from "@/components/authentication/LoginForm";
import BackgroundAuth from "@/components/authentication/BackgroundAuth";
import SocialLogin from "@/components/authentication/SocialLogin";

export default function LoginOwner() {
  return (
    <section className="w-full h-screen flex max-sm:text-scale-75 justify-center items-center relative z-10">
      <BackgroudAuth />
      <div className="max-sm:w-[90%] bg-transparent flex flex-col items-center justify-center max-sm:gap-8 gap-14 absolute">
        <div className="bg-transparent flex flex-col text-center gap-2">
          <h1 className="text-h1 max-sm:text-h2 text-shadow bg-transparent">
            Welcome back!
          </h1>
          <h3 className="min-sm:text-h3 text-[1.125rem] font-medium text-ps-gray-500 max-sm:text-ps-gray-400 bg-transparent">
            Find your perfect pet sitter with us
          </h3>
        </div>
        <div className="max-sm:text-b2 max-sm:w-[100%] min-sm:w-[20%] flex flex-col gap-8 max-sm:gap-6">
          <LoginForm />
          <SocialLogin title="Register" path="/register/owner" />
        </div>
      </div>
    </section>
  );
}
