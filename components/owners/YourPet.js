import PetCard from "./PetCard";

export default function YourPet() {
  const pets = [
    { name: "Bubba", type: "Dog" },
    { name: "Daisy", type: "Dog" },
    { name: "I Som", type: "Cat" },
    { name: "Noodle Bird", type: "Bird" },
  ];

  return (
    <section className="w-[75%] h-[824px] shadow-lg rounded-xl">
      <div className="flex flex-col justify-center p-10 gap-10">
        <div className="flex justify-between items-center">
          <p className="text-h4">Your Pet</p>
          <button className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
            Create Pet
          </button>
        </div>
        <div className="flex flex-wrap gap-4 justify-start">
          {pets.map((pet, index) => (
            <PetCard key={index} name={pet.name} type={pet.type} />
          ))}
        </div>
      </div>
    </section>
  );
}
