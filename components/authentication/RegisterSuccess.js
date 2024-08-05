import { useUser } from "@/context/User";
import Image from "next/image";
import success from "@/public/assets/authentication/alert-success.svg";
import { useRouter } from "next/router";
import error from "@/public/assets/authentication/alert-error.svg";

export default function RegisterSuccess(props) {
  const router = useRouter();
  const { register, setRegister, registerResult } = useUser();
  return (
    <>
      {registerResult === "success" ? (
        <section className="w-[90%] lg:w-[400px] h-fit bg-ps-white rounded-2xl ">
          <div className="py-10 px-6 border-b-2 border-b-ps-gray-100 flex justify-center">
            <Image src={success} alt="success" className="w-32 h-32" />
          </div>

          <div className="flex flex-col px-6 pb-10 gap-6">
            <h4 className="text-b1 lg:text-h3 text-center">Register Success</h4>
            <button
              type="button"
              onClick={() => {
                setRegister(!register);
                router.push(props.route);
              }}
              className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-6 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px]"
            >
              Login
            </button>
          </div>
        </section>
      ) : (
        <section className="w-[90%] lg:w-[400px] h-fit bg-ps-white rounded-2xl ">
          <div className="py-10 px-6 border-b-2 border-b-ps-gray-100 flex justify-center">
            <Image src={error} alt="error" className="w-32 h-32" />
          </div>

          <div className="flex flex-col px-6 pb-10 gap-6">
            <h4 className="text-b1 lg:text-h3 text-center">Error Connection</h4>
            <button
              type="button"
              onClick={() => {
                setRegister(!register);
              }}
              className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-6 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px]"
            >
              Close
            </button>
          </div>
        </section>
      )}
    </>
  );
}
