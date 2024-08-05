import Image from "next/image";
import { useUser } from "@/context/User";
import { useEffect } from "react";

export default function ConnectionServer({ text, image }) {
  const { connection, setConnection } = useUser();

  function hundleClick() {
    setConnection(!connection);
  }

  useEffect(() => {
    setTimeout(() => {
      hundleClick();
    }, 2500);
  });

  return (
    <section className="w-[90%] lg:w-[400px] h-fit bg-ps-white rounded-2xl ">
      <div className="py-10 px-6 border-b-2 border-b-ps-gray-100 flex justify-center">
        <Image src={image} className="w-32 h-32" />
      </div>

      <div className="flex flex-col px-6 pb-10 gap-6">
        <h4 className="text-b1 lg:text-h3 text-center">{text}</h4>
      </div>
    </section>
  );
}
