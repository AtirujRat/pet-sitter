import Image from "next/image";
import error from "@/public/assets/authentication/alert-error.svg";
import { useUser } from "@/context/User";
import { useRouter } from "next/router";

export default function ConnectionServer({ text, route }) {
  const { connection, setConnection } = useUser();
  const router = useRouter();

  function hundleClick() {
    setConnection(!connection);
    if (route) {
      router.push(route);
    }
  }

  return (
    <section className="w-[90%] lg:w-[400px] h-fit bg-ps-white rounded-2xl ">
      <div className="py-10 px-6 border-b-2 border-b-ps-gray-100 flex justify-center">
        <Image src={error} className="w-32 h-32" />
      </div>

      <div className="flex flex-col px-6 pb-10 gap-6">
        <h4 className="text-b1 lg:text-h3 text-center">{text}</h4>
        <button
          type="button"
          onClick={hundleClick}
          className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-6 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px]"
        >
          Close
        </button>
      </div>
    </section>
  );
}
