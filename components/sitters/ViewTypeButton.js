import Image from "next/image";

export default function ViewTypeButton(props) {
  return (
    <button
      className={`border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex active:text-ps-orange-500  text-ps-gray-300 text-base max-lg:w-full`}
    >
      <Image src={props.src} width={20} height={20} alt={props.alt} />
      {props.type}
    </button>
  );
}
