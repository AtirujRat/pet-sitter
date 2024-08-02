import LoginForm from "@/components/authentication/LoginForm";

export default function LoginAdmin() {
  const api = "admin";
  return (
    <section className="w-full h-screen flex max-sm:text-scale-75 justify-center items-center relative z-10">
      <div className="w-full max-sm:w-[90%] bg-transparent flex flex-col items-center justify-center max-sm:gap-8 gap-10 absolute">
        <div className="bg-transparent flex flex-col text-center gap-2">
          <h1 className="text-h1 max-sm:text-h2 bg-transparent">Admin</h1>
        </div>
        <div className="max-sm:text-b2 max-sm:w-[100%] min-w-[25%] min-sm:w-[30%] flex flex-col gap-8 max-sm:gap-6">
          <LoginForm api={api} />
        </div>
      </div>
    </section>
  );
}
