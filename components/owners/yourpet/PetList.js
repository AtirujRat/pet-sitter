import PetCard from "./PetCard";
import Link from "next/link";

export default function YourPet() {
  const pets = [
    { name: "Bubba", type: "Dog" },
    { name: "Daisy", type: "Dog" },
    { name: "I Som", type: "Cat" },
    { name: "Noodle Bird", type: "Bird" },
  ];

  return (
    <section className="w-[75%] min-h-[824px] h-fit shadow-lg rounded-xl bg-ps-white">
      <div className="flex flex-col justify-center p-10 gap-10">
        <div className="flex justify-between items-center">
          <p className="text-h3">Your Pet</p>
          <Link href="/owners/yourpet/create">
            <button className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
              Create Pet
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 justify-stretch">
          {pets.map((pet, index) => (
            <PetCard key={index} name={pet.name} type={pet.type} />
          ))}
        </div>
      </div>
    </section>
  );
}
