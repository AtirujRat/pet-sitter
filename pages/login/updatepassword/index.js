import BackgroudAuth from "@/components/authentication/BackgroudAuth";
import UpdatePasswordForm from "@/components/authentication/UpdatePasswordForm";

export default function RecoveryPage() {
  return (
    <section className="w-full h-screen flex max-sm:text-scale-75 justify-center items-center relative z-10">
      <BackgroudAuth />
      <div className="max-sm:w-[90%] bg-transparent flex flex-col items-center justify-center max-sm:gap-8 gap-14 absolute">
        <div className="bg-transparent flex flex-col text-center gap-5">
          <h1 className="text-h1 max-sm:text-h2 text-shadow bg-transparent">
            Update <br />
            your password!
          </h1>
        </div>
        <div className="max-sm:text-b2 max-sm:w-[100%] min-sm:w-[20%] flex flex-col gap-8 max-sm:gap-6">
          <UpdatePasswordForm />
        </div>
      </div>
    </section>
  );
}
