import RegisterForm from "@/components/authentication/RegisterForm";
import RegisterSuccess from "@/components/authentication/RegisterSuccess";
import Modal from "@/components/modal/Modal";
import { useUser } from "@/context/User";
import Link from "next/link";
export default function RegisterSitter() {
  const api = "/api/authentication/register/sitter";
  const route = "/login/sitter";
  const { register } = useUser();
  return (
    <>
      <section className="w-full h-screen max-sm:text-scale-75 flex justify-center items-center">
        <div className="w-full max-sm:w-[90%] flex flex-col items-center justify-center max-sm:gap-8 gap-14">
          <div className="flex flex-col text-center gap-2">
            <h1 className="text-h1 max-sm:text-h2">Join Us</h1>
            <h3 className="min-sm:text-h3 text-[1.125rem] font-medium text-ps-gray-500 max-sm:text-ps-gray-400">
              Become the best Pet Sitter with us
            </h3>
          </div>
          <div className="min-w-[25%] max-sm:w-[100%] min-sm:w-[20%] flex flex-col gap-8">
            <RegisterForm api={api} route={route} />
            <div className="flex justify-center gap-2">
              <p className="text-b1">Already have Pet Sitter account?</p>
              <Link href={route}>
                <p className="text-b1 text-ps-orange-500">Login</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {register ? (
        <Modal>
          <RegisterSuccess route={route} />
        </Modal>
      ) : null}
    </>
  );
}
