import { PetTag } from "./PetTag";
import Image from "next/image";

export default function PetCard(props) {
  return (
    <section
      className={`min-w-fit min-h-fit shadow rounded-3xl flex justify-center items-center transition-transform duration-200 hover:-translate-y-2 cursor-pointer ${props.styles} bg-ps-white`}
    >
      <div className="container-card flex flex-col justify-center items-center gap-3">
        <Image
          src="/assets/pets/pet-dummy.svg"
          alt="pet-image"
          className="rounded-full"
          width={100}
          height={100}
        />
        <p className="text-b1 text-center">{props.name}</p>
        <PetTag type={props.type} />
      </div>
    </section>
  );
}
