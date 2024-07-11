import LoginForm from "@/components/authentication/LoginForm";
import BackgroundAuth from "@/components/authentication/BackgroundAuth";
import SocialLogin from "@/components/authentication/SocialLogin";

export default function LoginOwner() {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BackgroundAuth />
      <div className="w-[30%] flex flex-col items-center justify-center gap-14">
        <div className="text-center text-shadow">
          <h1 className="text-h1 text-ps-black">Welcome back!</h1>
          <h3 className="text-h3 text-ps-gray-400">
            Find your perfect pet sitter with us
          </h3>
        </div>
        <div id="main-form" className="flex flex-col gap-8">
          <LoginForm />
          <SocialLogin title="Register" path="/register/owner" />
        </div>
      </div>
    </section>
  );
}
