import { useRouter } from "next/router";
import Image from "next/image";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import BackgroundAuth from "@/components/authentication/BackgroundAuth";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="h-full w-full flex justify-center">
      <div className="max-lg:hidden">
        <BackgroundAuth />
      </div>
      <div className="flex flex-col justify-center items-center mt-32 max-sm:mt-48 gap-5 px-10">
        <Image
          src="/assets/404/image-404.svg"
          alt="image-404"
          width={600}
          height={500}
        />
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col gap-1 w-full">
            <h2 className="text-h2 max-sm:text-h3 text-center">
              Something went wrong.
            </h2>
            <h3 className="text-b1max-sm:text-b2 text-center">
              Sorry, We can not find the page you are looking for.
            </h3>
          </div>
          <ButtonOrange
            text="Back to Home"
            width="w-fit"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}
