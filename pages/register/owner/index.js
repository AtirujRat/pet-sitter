import BackgroudAuth from "@/components/authentication/BackgroudAuth";
import RegisterForm from "@/components/authentication/RegisterForm";
import SocialLogin from "@/components/authentication/SocialLogin";

export default function RegisterOwner() {
  const api = "/api/authentication/register/owner";
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BackgroudAuth />
      <div className="w-[30%] flex flex-col items-center justify-center gap-14">
        <div className="text-center">
          <h1 className="text-h1 text-shadow">Join Us!</h1>
          <h3 className="text-h3 text-ps-gray-400">
            Find your perfect pet sitter with us
          </h3>
        </div>

        <div id="main-form" className="flex flex-col gap-8">
          <RegisterForm api={api} />
          <SocialLogin />
        </div>
      </div>
    </section>
  );
}
