import RegisterForm from "@/components/authentication/RegisterForm";

export default function RegisterSitter() {
  const api = "/api/authentication/register/sitter";
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="max-sm:w-[90%] flex flex-col items-center justify-center max-sm:gap-8 gap-14">
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-h1 max-sm:text-h2">Join Us</h1>
          <h3 className="min-sm:text-h3 text-[1.125rem] font-medium text-ps-gray-500 max-sm:text-ps-gray-400">
            Become the best Pet Sitter with us
          </h3>
        </div>
        <div className="w-full flex flex-col gap-8">
          <RegisterForm api={api} />
          <div className="flex justify-center gap-2">
            <p className="text-b1">Already have Pet Sitter account?</p>
            <p className="text-b1 text-ps-orange-500">Login</p>
          </div>
        </div>
      </div>
    </section>
  );
}
