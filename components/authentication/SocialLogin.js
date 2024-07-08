import Image from "next/image";

import divide from "../../public/assets/authentication/Divider.svg";
import facebook from "../../public/assets/authentication/logo-facebook.svg";
import gmail from "../../public/assets/authentication/logo-gmail.svg";
import Link from "next/link";

export default function SocialLogin(props) {
  return (
    <>
      <div id="social-login" className="w-full flex justify-between">
        <Image src={divide} alt="divide" className="w-[30%]" />
        <p className="text-b1 text-ps-gray-400">Or Continue With</p>
        <Image src={divide} alt="divide" className="w-[30%]" />
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

      <div className="flex justify-center gap-2">
        <p className="text-b1 text-ps-black">Already have an account?</p>
        <Link href={props.path}>
          <p className="text-b1 text-ps-orange-500">{props.title}</p>
        </Link>
      </div>
    </>
  );
}
