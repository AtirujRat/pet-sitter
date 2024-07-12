import { PetTag } from "./PetTag";
import Image from "next/image";

export default function PetCard({ name, type }) {
  return (
    <section className="w-[207px] h-[240px] shadow rounded-3xl flex justify-center items-center transition-transform duration-200 hover:-translate-y-2 cursor-pointer">
      <div className="container-card flex flex-col justify-center items-center gap-3">
        <Image
          src="/assets/pets/pet-dummy.svg"
          alt="image"
=======
          alt={`${type.toLowerCase()}`}
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
          alt="image"
>>>>>>> b87b3ee (feat: create api get pet)
=======
          alt={`${type.toLowerCase()}`}
>>>>>>> 0333687 (feat: edit update pet form)
          width={100}
          height={100}
          className="rounded-t-3xl rounded-full"
        />
        <p className="text-b1 text-center">{name}</p>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <PetTag type={type} />
=======
        <PetTag type={type.toLowerCase()} />
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
        <PetTag type={type} />
>>>>>>> b87b3ee (feat: create api get pet)
=======
        <PetTag type={type.toLowerCase()} />
>>>>>>> 0333687 (feat: edit update pet form)
      </div>
    </section>
  );
}
