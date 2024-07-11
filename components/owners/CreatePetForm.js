import Image from "next/image";

export default function CreatePetForm() {
  return (
    <section className="w-[75%] h-fit shadow-lg rounded-xl bg-ps-white">
      <div className="flex flex-col justify-center p-10 gap-10">
        <p className="flex text-h3 gap-2">
          <Image
            src="/assets/pets/Vector 257.svg"
            alt=""
            width={10}
            height={10}
            className="rounded-t-3xl rounded-full"
          />
          Your Pet
        </p>
        {/* add image pet */}
        <Image
          src="/assets/pets/pet-dummy.svg"
          alt=""
          width={240}
          height={240}
          className=""
        />
        {/* pet name */}
        <div className="max-sm:hidden flex flex-col">
          <label htmlFor="name" className="text-[16px] font-bold pb-1">
            Pet Name*
          </label>
          <input
            type="text"
            className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
            placeholder="John Wick"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <p className="text-[16px] font-bold">Pet Type*</p>
            <select
              className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
              placeholder="Select your pet type"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>
          {/* Breed of pet */}
          <div className="flex flex-col w-[48%]">
            <label htmlFor="breed" className="text-[16px] font-bold pb-1">
              Breed*
            </label>
            <input
              type="text"
              className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
              placeholder="Breed of your pet"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            {/* sex of pet */}
            <p className="text-[16px] font-bold">Sex*</p>
            <select
              className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
              placeholder="Select sex of your pet"
            >
              <option value="Dog">Male</option>
              <option value="Cat">Female</option>
            </select>
          </div>
          {/* age of pet */}
          <div className="flex flex-col w-[48%]">
            <label htmlFor="age" className="text-[16px] font-bold pb-1">
              Age (Mouth)*
            </label>
            <input
              type="text"
              className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
              placeholder="Age of your pet"
            />
          </div>
        </div>

        <div className="flex justify-between">
          {/* color of pet */}
          <div className="flex flex-col w-[48%]">
            <label htmlFor="color" className="text-[16px] font-bold pb-1">
              Color*
            </label>
            <input
              type="text"
              className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
              placeholder="Describe color of your pet"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="color" className="text-[16px] font-bold pb-1">
              Weight (Kilogram)*
            </label>
            <input
              type="text"
              className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
              placeholder="Weight of your per"
            />
          </div>
        </div>
        {/* about of pet */}
        <div className="flex flex-col w-full">
          <label htmlFor="color" className="text-[16px] font-bold pb-1">
            About
          </label>
          <textarea
            type="text"
            className="border-[#DCDFED] text-[#7B7E8F] rounded-lg h-[140px]"
            placeholder="Describe more about your pet..."
          />
        </div>

        {/* button form */}
        <div className="flex flex-wrap gap-4 justify-between">
          <button className="w-[127px] bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]">
            Cancel
          </button>
          <button className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
            Create Pet
          </button>
        </div>
      </div>
    </section>
  );
}
