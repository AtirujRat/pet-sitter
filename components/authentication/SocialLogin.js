import Image from "next/image";
import divide from "../../public/assets/authentication/Divider.svg";
import facebook from "../../public/assets/authentication/logo-facebook.svg";
import gmail from "../../public/assets/authentication/logo-gmail.svg";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full flex justify-between gap-2">
        <Image src={divide} alt="divide" className="w-[30%] max-sm:w-[25%]" />
        <p className="text-b1 text-ps-gray-400 ">Or Continue With</p>
        <Image src={divide} alt="divide" className="w-[30%] max-sm:w-[25%]" />
      </div>

      <div className="w-full flex justify-between gap-2">
        <button className="flex flex-1 justify-center items-center gap-2 btn btn-ghost text-b2 border-none rounded-full  bg-ps-gray-200">
          <Image src={facebook} alt="facebook" className="w-6" />
          Facebook
        </button>
        <button className="flex flex-1 justify-center items-center gap-2 btn btn-ghost text-b2 border-none rounded-full  bg-ps-gray-200">
          <Image src={gmail} alt="gmail" className="w-6" />
          Gmail
        </button>
      </div>

      <div className="text-b1 flex justify-center gap-2">
        <p className="text-ps-black">Already have an account?</p>
        <p className="text-ps-orange-500">Login</p>
      </div>
    </>
  );
}
